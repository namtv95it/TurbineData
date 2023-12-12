package egovframework.com.a2m.egov.service.afp.download.impl;

import egovframework.com.a2m.egov.constants.CommonConstants;
import egovframework.com.a2m.egov.dao.afp.download.DownloadDAO;
import egovframework.com.a2m.egov.model.Library;
import egovframework.com.a2m.egov.service.afp.download.IResourceService;
import org.apache.commons.io.FileUtils;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.*;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.Enumeration;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;
import java.util.zip.ZipOutputStream;

/**
 * @author tiennd
 */

@Service
public class ResourceServiceImpl implements IResourceService {

    @Value("${file.path.config}")
    private String folderConfig;

    @Autowired
    private DownloadDAO downloadDAO;

    @Override
    public void render(Path fileZip, String folderUnzip, Map<Object, Object> request, String folderZip) throws Exception {
        try (ZipFile zipFile = new ZipFile(fileZip.toFile())) {
            Enumeration<? extends ZipEntry> entries = zipFile.entries();
            while (entries.hasMoreElements()) {
                ZipEntry entry = entries.nextElement();
                File entryDestination = new File(folderUnzip, entry.getName());
                if (entry.isDirectory()) {
                    entryDestination.mkdirs();
                } else {
                    entryDestination.getParentFile().mkdirs();
                    try (InputStream in = zipFile.getInputStream(entry);
                         OutputStream out = new FileOutputStream(entryDestination)) {
                        IOUtils.copy(in, out);
                    }
                }
            }
        }

        StringBuilder dependency = new StringBuilder(",");
        StringBuilder componentImport = new StringBuilder();
        StringBuilder routerImport = new StringBuilder();

        String pathFolderConfig = folderConfig + File.separator + CommonConstants.FOLDER_NAME_FRONTEND;

        for (Object key : request.keySet()) {
            if ("false".equals(request.get(key).toString())) {
                Path config = Paths.get(pathFolderConfig + File.separator + CommonConstants.PREFIX_FOLDER_CONFIG + key.toString() + CommonConstants.EXTENSION_TXT);
                if (Files.exists(config)) {
                    String content = Files.readString(config);
                    String[] pathFolder = content.trim().split(",");
                    for (String path : pathFolder) {
                        Path deletePath = Paths.get(folderUnzip + path);
                        if (Files.isDirectory(deletePath)) {
                            deleteFolder(deletePath);
                        } else {
                            Files.deleteIfExists(deletePath);
                        }
                    }
                }
            } else if ("true".equals(request.get(key).toString())) {
                Path config = Paths.get(pathFolderConfig + File.separator + CommonConstants.PREFIX_NPM_CONFIG + key.toString() + CommonConstants.EXTENSION_TXT);
                if (Files.exists(config)) {
                    String content = Files.readString(config);
                    dependency.append(content).append("\n");
                }

                Path importComponent = Paths.get(pathFolderConfig + File.separator + CommonConstants.PREFIX_IMPORT_COMPONENT_CONFIG + key.toString() + CommonConstants.EXTENSION_TXT);
                if (Files.exists(importComponent)) {
                    String content = Files.readString(importComponent);
                    componentImport.append(content).append("\n");
                }
                Path importRouter = Paths.get(pathFolderConfig + File.separator + CommonConstants.PREFIX_IMPORT_ROUTER_CONFIG + key.toString() + CommonConstants.EXTENSION_TXT);
                if (Files.exists(importRouter)) {
                    String content = Files.readString(importRouter);
                    routerImport.append(content).append("\n");
                }
            } else {
                Library libraryEntity = downloadDAO.getLibraryByLibName(key.toString());
                if (libraryEntity != null) {
                    String npm = '"' + libraryEntity.getNpmLibName() + '"' + ":" + '"' + CommonConstants.PACKAGE_UPDATE_TYPE + request.get(key) + '"' + ",\n";
                    dependency.append(npm);
                }
            }
        }

        Files.delete(fileZip);

        Path packageJson = Paths.get(folderUnzip + "/package.json");
        String stringJSON = Files.readString(packageJson);
        String newContent = stringJSON.replace(CommonConstants.KEY_ADD_NPM, dependency.substring(0, dependency.length() - 2));
        Files.write(packageJson, newContent.getBytes(StandardCharsets.UTF_8));

        Path appRoot = Paths.get(folderUnzip + "/src/app/routers/samRouter.tsx");
        String stringAppRoot = Files.readString(appRoot);
        String newAppRoot = stringAppRoot.replace(CommonConstants.KEY_IMPORT_COMPONENT, componentImport).replace(CommonConstants.KEY_IMPORT_ROUTER, routerImport);
        Files.write(appRoot, newAppRoot.getBytes(StandardCharsets.UTF_8));

        zipFolder(folderZip);
    }

    public void zipFolder(String folderZip) throws Exception {
        String zipFileName = folderZip + CommonConstants.EXTENSION_ZIP;
        Path source = Paths.get(folderZip);
        try (ZipOutputStream zos = new ZipOutputStream(
                new FileOutputStream(zipFileName))) {
            Files.walkFileTree(source, new SimpleFileVisitor<>() {
                @Override
                public FileVisitResult visitFile(Path file, BasicFileAttributes attributes) {
                    if (attributes.isSymbolicLink()) {
                        return FileVisitResult.CONTINUE;
                    }
                    try (FileInputStream fis = new FileInputStream(file.toFile())) {
                        Path targetFile = source.relativize(file);
                        zos.putNextEntry(new ZipEntry(targetFile.toString()));
                        byte[] buffer = new byte[1024];
                        int len;
                        while ((len = fis.read(buffer)) > 0) {
                            zos.write(buffer, 0, len);
                        }
                        zos.closeEntry();
                    } catch (IOException e) {
                        e.printStackTrace();
                    }
                    return FileVisitResult.CONTINUE;
                }

                @Override
                public FileVisitResult visitFileFailed(Path file, IOException exc) {
                    return FileVisitResult.CONTINUE;
                }
            });
        }
        deleteFolder(source);
    }

    public void deleteFolder(Path source) throws Exception {
        FileUtils.deleteDirectory(new File(source.toUri()));
    }

}
