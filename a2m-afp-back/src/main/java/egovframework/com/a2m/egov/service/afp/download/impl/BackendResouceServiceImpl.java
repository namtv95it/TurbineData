package egovframework.com.a2m.egov.service.afp.download.impl;

import egovframework.com.a2m.egov.constants.CommonConstants;
import egovframework.com.a2m.egov.model.request.DownloadBackendRequest;
import egovframework.com.a2m.egov.service.afp.download.IBackendResourceService;
import egovframework.com.a2m.egov.util.FileUtil;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class BackendResouceServiceImpl implements IBackendResourceService {

	private Logger log = LoggerFactory.getLogger(ResourceServiceImpl.class);

	@Value("${file.path.resource}")
	private String folderSource;

	@Value("${file.path.render}")
	private String folderRender;

	@Override
	public ByteArrayResource renderBackend(String sourceDirPath, String destinationDirPath,
			DownloadBackendRequest downloadBackendRequest) throws Exception {
		log.info("Rest request to initializr backend");

		String destinationDirPathTemp = destinationDirPath + File.separator + downloadBackendRequest.getProjectName();

		initializrBackend(sourceDirPath, destinationDirPathTemp);
		
		String globalsPropertiesPath = destinationDirPathTemp + File.separator + CommonConstants.GLOBALS_PROPERTIES_FILE_PATH;
		String globalsProperties = FileUtil.readFileToString(globalsPropertiesPath);
		globalsProperties = globalsProperties.replace(CommonConstants.DATABASE_TYPE_KEY, downloadBackendRequest.getDatabaseType());
		FileUtil.writeFile(globalsPropertiesPath, globalsProperties);

		additionalDependenciesToPom(sourceDirPath, destinationDirPathTemp, downloadBackendRequest.getDependencies());
		
		initializeMapperFileForMybatis(sourceDirPath, destinationDirPathTemp, downloadBackendRequest.getDatabaseType());

		addConfigToApplicationProperties(sourceDirPath, destinationDirPathTemp,
				downloadBackendRequest.getDependencies());

		frameCodeForLibraries(sourceDirPath, destinationDirPathTemp, downloadBackendRequest.getDependencies());
		
		String zipFileName = destinationDirPathTemp + CommonConstants.EXTENSION_ZIP;

		FileUtil.zipDirectory(destinationDirPathTemp, zipFileName);

		File file = new File(zipFileName);
		Path path = Paths.get(file.getAbsolutePath()).toAbsolutePath().normalize();
		ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(path));

		FileUtil.deleteDirectory(destinationDirPath);

		log.info("Initializr backend done");
		return resource;
	}

	private void initializrBackend(String sourceDirPath, String destinationDirPath) throws IOException {
		FileUtil.copyDirectory(sourceDirPath + CommonConstants.SRC_CORE, destinationDirPath);
	}

	private void additionalDependenciesToPom(String sourceDirPath, String destinationDirPath, List<String> dependencies)
			throws IOException {

		String pathOfPomFile = destinationDirPath + CommonConstants.POM_FILE_PATH;
		String pom = FileUtil.readFileToString(pathOfPomFile);

		StringBuilder additionalDependencies = new StringBuilder();
		for (String dependency : dependencies) {
			String dependencyFileName = dependency + CommonConstants.EXTENSION_TXT;
			String path = addSeparator(sourceDirPath + CommonConstants.SRC_DEPENDENCIES) + dependencyFileName;
			additionalDependencies.append(FileUtil.readFileToString(path)).append(StringUtils.LF);
		}

		pom = pom.replace(CommonConstants.ADDITIONAL_DEPENDENCIES_KEY, additionalDependencies);
		FileUtil.writeFile(pathOfPomFile, pom);
	}

	private void addConfigToApplicationProperties(String sourceDirPath, String destinationDirPath,
			List<String> dependencies) throws IOException {

		String pathOfApplicationFile = destinationDirPath + CommonConstants.APPLICATION_FILE_PATH;

		String config = FileUtil.readFileToString(pathOfApplicationFile);

		StringBuilder additionalDependencies = new StringBuilder();
		for (String dependency : dependencies) {
			StringBuilder pathBuilder = new StringBuilder(sourceDirPath);

			pathBuilder.append(CommonConstants.SRC_CONFIG).append(File.separator).append(dependency)
					.append(CommonConstants.EXTENSION_TXT);

			additionalDependencies.append(FileUtil.readFileToString(pathBuilder.toString())).append(StringUtils.LF);
		}

		config = config.replace(CommonConstants.CONFIG_APPLICATION_KEY, additionalDependencies);

		FileUtil.writeFile(pathOfApplicationFile, config);
	}

	private void frameCodeForLibraries(String sourceDirPath, String destinationDirPath, List<String> dependencies)
			throws IOException {
		
		sourceDirPath = sourceDirPath + CommonConstants.SRC_PACKAGE;
		String srcDaoPackagePath = sourceDirPath + CommonConstants.DAO_PACKAGE;
		String srcServicePackagePath = sourceDirPath + CommonConstants.SERVICE_PACKAGE;
		String srcConfigPackagePath = sourceDirPath + CommonConstants.CONFIG_PACKAGE;
		String srcControllerPackagePath = sourceDirPath + CommonConstants.CONTROLLER_PACKAGE;
		
		destinationDirPath = destinationDirPath + CommonConstants.SRC_PACKAGE; 
		String desDaoPackagePath = destinationDirPath + CommonConstants.DAO_PACKAGE;
		String desServicePackagePath = destinationDirPath + CommonConstants.SERVICE_PACKAGE;
		String desConfigPackagePath = destinationDirPath + CommonConstants.CONFIG_PACKAGE;
		String desControllerPackagePath = destinationDirPath + CommonConstants.CONTROLLER_PACKAGE;

		for (String dependency : dependencies) {
			
			FileUtil.copyDirectory(addSeparator(srcDaoPackagePath) + dependency,
					addSeparator(desDaoPackagePath) + dependency);

			FileUtil.copyDirectory(addSeparator(srcConfigPackagePath) + dependency,
					addSeparator(desConfigPackagePath) + dependency);

			FileUtil.copyDirectory(addSeparator(srcServicePackagePath) + dependency,
					addSeparator(desServicePackagePath) + dependency);

			FileUtil.copyDirectory(addSeparator(srcControllerPackagePath) + dependency,
					addSeparator(desControllerPackagePath) + dependency);

		}
	}
	
	private void initializeMapperFileForMybatis(String sourceDirPath, String destinationDirPath, String databaseType) throws IOException {
		String srcPath = addSeparator(sourceDirPath + CommonConstants.SRC_MAPPER_FILE_MYBATIS) + databaseType;
		String desPath = addSeparator(destinationDirPath + CommonConstants.SRC_MAPPER_FILE_MYBATIS) + databaseType;
		FileUtil.copyDirectory(srcPath, desPath);
	}

	private String addSeparator(String path) {
		StringBuilder strBuilder = new StringBuilder(path);
		strBuilder.append(File.separator);
		return strBuilder.toString();
	}

}
