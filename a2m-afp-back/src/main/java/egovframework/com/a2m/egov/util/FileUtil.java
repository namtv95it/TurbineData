package egovframework.com.a2m.egov.util;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.stream.Stream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;

public class FileUtil {

	public static void copyDirectory(String sourceDirectoryLocation, String destinationDirectoryLocation)
			throws IOException {
		File sourceDirectory = new File(sourceDirectoryLocation);
		if (sourceDirectory.exists()) {
			File destinationDirectory = new File(destinationDirectoryLocation);
			FileUtils.copyDirectory(sourceDirectory, destinationDirectory);
		}
	}
	
	public static void zipDirectory(String sourceFolder, String zipFilePath) throws IOException {
		Path zipFile = Files.createFile(Paths.get(zipFilePath));
		Path pathDir = Paths.get(sourceFolder);
		try (ZipOutputStream zipOutputStream = new ZipOutputStream(Files.newOutputStream(zipFile));
				Stream<Path> paths = Files.walk(pathDir)) {
			paths.filter(path -> !Files.isDirectory(path)).forEach(path -> {
				ZipEntry zipEntry = new ZipEntry(pathDir.relativize(path).toString());
				try {
					zipOutputStream.putNextEntry(zipEntry);
					Files.copy(path, zipOutputStream);
					zipOutputStream.closeEntry();
				} catch (IOException e) {
					e.printStackTrace();
				}
			});
		}
	}
	
	public static void unZip(String pathFileZip, String pathUnZip) throws IOException {
		Path source = Paths.get(pathFileZip);
        Path target = Paths.get(pathFileZip + File.separator);
        try (ZipInputStream zis = new ZipInputStream(new FileInputStream(source.toFile()))) {
            ZipEntry zipEntry = zis.getNextEntry();
            while (zipEntry != null) {

                boolean isDirectory = false;
                if (zipEntry.getName().endsWith(File.separator)) {
                    isDirectory = true;
                }

                Path newPath = zipSlipProtect(zipEntry, target);

                if (isDirectory) {
                    Files.createDirectories(newPath);
                } else {
                    if (newPath.getParent() != null) {
                        if (Files.notExists(newPath.getParent())) {
                            Files.createDirectories(newPath.getParent());
                        }
                    }
                    Files.copy(zis, newPath, StandardCopyOption.REPLACE_EXISTING);
                }

                zipEntry = zis.getNextEntry();

            }
            zis.closeEntry();
            zis.close();
        }
	}
	
	public static Path zipSlipProtect(ZipEntry zipEntry, Path targetDir)
	        throws IOException {

	        Path targetDirResolved = targetDir.resolve(zipEntry.getName());

	        // make sure normalized file still has targetDir as its prefix
	        // else throws exception
	        Path normalizePath = targetDirResolved.normalize();
	        if (!normalizePath.startsWith(targetDir)) {
	            throw new IOException("Bad zip entry: " + zipEntry.getName());
	        }

	        return normalizePath;
	    }
	
	public static void deleteDirectory(String path) throws IOException {
		FileUtils.deleteDirectory(new File(path));
	}

	public static String readFileToString(String path) throws IOException {
		File file = new File(path);
		if (file.exists()) {
			return FileUtils.readFileToString(new File(path), String.valueOf(StandardCharsets.UTF_8));
		}
		return StringUtils.EMPTY;
	}

	public static void writeFile(String path, String data) throws IOException {
		FileUtils.write(new File(path), data, String.valueOf(StandardCharsets.UTF_8));
	}

	public static void deleteFile(String path) throws IOException {
		Files.deleteIfExists(Paths.get(path));
	}
}
