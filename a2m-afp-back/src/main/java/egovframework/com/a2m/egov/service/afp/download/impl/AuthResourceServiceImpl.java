package egovframework.com.a2m.egov.service.afp.download.impl;

import egovframework.com.a2m.egov.constants.CommonConstants;
import egovframework.com.a2m.egov.service.afp.download.IAuthResourceService;
import egovframework.com.a2m.egov.util.FileUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import net.lingala.zip4j.ZipFile;


@Service
public class AuthResourceServiceImpl implements IAuthResourceService {
	
	private Logger log = LoggerFactory.getLogger(ResourceServiceImpl.class);

	@Override
	public ByteArrayResource renderAuth(String folderSource, String destinationFolder, String projectName) throws IOException {
		log.info("Rest request to initializr auth");
		String pathDir = folderSource + File.separator + CommonConstants.NAME_FOLDER_ZIP_AUTH;
		
		ZipFile zipFile = new ZipFile(pathDir);
		zipFile.extractAll(destinationFolder);
		
		String pathDest = destinationFolder + File.separator + projectName; 
		String pathDir2 = destinationFolder + File.separator + CommonConstants.NAME_FOLDER_AUTH;
		Files.createDirectory(Paths.get(pathDest));
		FileUtil.copyDirectory(pathDir2, pathDest);
		FileUtil.zipDirectory(pathDest, pathDest + CommonConstants.EXTENSION_ZIP);
		
		File file = new File(pathDest + CommonConstants.EXTENSION_ZIP);
		Path path = Paths.get(file.getAbsolutePath()).toAbsolutePath().normalize();
		ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(path));
		
		FileUtil.deleteDirectory(destinationFolder);
		
		return resource;
	}

}
