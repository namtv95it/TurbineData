package egovframework.a2m.egov.util;

import java.io.File;
import java.io.IOException;

import javax.annotation.PostConstruct;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

/**
 * 
 * @author ThanhNV
 * @since 2023. 3. 28.
 * @version 1
 */

@Component
public class CommonFileUtils {
	
	@Autowired
	private Environment env;

	private static String pathUploadDir;
	private static String pathThumbUploadDir;

	@PostConstruct
	public void init() {
		pathUploadDir = env.getProperty("path.upload.dir");
		pathThumbUploadDir = env.getProperty("path.upload.dir") + File.separator + "thumb";
	}

	public static String getPathDefaultUploaddir() {
		return pathUploadDir;
	}

	public static String getPathThumbUploaddir() {
		return pathThumbUploadDir;
	}

	public static byte[] convertToBytes(File file) {
		try {
			return FileUtils.readFileToByteArray(file);
		} catch (IOException e) {
			e.printStackTrace();
		}

		return null;
	}

	public static byte[] getFileByPath(String path) {
		if (StringUtils.isEmpty(path))
			return new byte[0];

		File file = FileUtils.getFile(path);
		return convertToBytes(file);
	}

	public static File save(String newFleNm, MultipartFile multipartFile) throws Exception {
		File dir = new File(pathUploadDir);
		if (!dir.exists())
			dir.mkdirs();

		File file = new File(pathUploadDir.concat("/" + newFleNm));
		multipartFile.transferTo(file);
		return file;
	}

	public static String getExt(String nameOrPath) {
		int dotIndex = nameOrPath.lastIndexOf(".");
		if (dotIndex < 0)
			return null;
		return nameOrPath.substring(dotIndex);
	}

	public static String getFileName(String path) {
		int seperatorIndex = path.lastIndexOf("/");
		if (seperatorIndex < 0)
			return null;
		return path.substring(++seperatorIndex);
	}

	public static String getDir(String path) {
		int seperatorIndex = path.lastIndexOf("/");
		if (seperatorIndex < 0)
			return null;
		return path.substring(0, seperatorIndex);
	}

	public static String replaceFileName(String newPrefixFileName, String originFileName) {
		return newPrefixFileName + getExt(originFileName);
	}

	public static void deleteFile(String fileName) {
		File file = new File(pathUploadDir + "/" + fileName);
		if (file.exists()) {
			file.delete();
		}
	}

	public static void deleteAvatar(String fileName) {
		File file = new File(pathUploadDir + "/" + fileName);
		File fileThumb = new File(pathThumbUploadDir + "/" + fileName);
		if (file.exists() && fileThumb.exists()) {
			file.delete();
			fileThumb.delete();
		}
	}
}
