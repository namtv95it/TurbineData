package egovframework.com.a2m.egov.util;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import javax.annotation.PostConstruct;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

/**
* 
* @author Nguyen Van Hau
* @since 2023.3.31.
* @version 1
*/

@Component
public class FileBase64Util {
	
	@Autowired
	private Environment env;
	
	private static String editorUploadDir;
//	private static String editorUrlPrefix;
	
	@PostConstruct
	public void init() {
		editorUploadDir = env.getProperty("editor.upload.dir");
//		editorUrlPrefix = env.getProperty("editor.url.prefix");
	}
	
	public static void saveBase64ToFile(String fileName, String base64Content) throws IOException {
		byte[] decodedBytes = org.apache.commons.codec.binary.Base64.decodeBase64(base64Content);
		String  pathDir = editorUploadDir + File.separator + fileName;
		FileUtils.writeByteArrayToFile(new File(pathDir), decodedBytes);
	}
	
	public static String getFileName(String base64String) {
		UUID uuid = UUID.randomUUID();
		return uuid.toString() + getExt(base64String);
	}
	
	public static String getExt(String base64String) {
		String[] strs = base64String.split(",");
		String extension = "";
		switch (strs[0]) {
	    	case "data:image/jpeg;base64":
	    		extension = ".jpeg";
	    		break;
	    	case "data:image/png;base64":
	    		extension = ".png";
	    		break;
	    	default:
	    		extension = "jpg";
	    		break;
		}
		return extension;
	}
}
