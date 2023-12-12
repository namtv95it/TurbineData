/**
 * 
 */
package egovframework.com.a2m.egov.controllers.ckeditor;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import egovframework.com.a2m.egov.constants.CommonConstants;
import egovframework.com.a2m.egov.model.response.AjaxResult;
import egovframework.com.a2m.egov.util.ResizeImage;

/**
 * @author tiennd
 *
 * @created Apr 17, 2023
 */

@RestController
@RequestMapping("ckeditor")
public class CKEditorController {

	private static Path resourcePath;
	private static Path resourcePathThumb;

	@Value("${path.default.uploaddir}")
	private String path;

	@Value("${path.file.url}")
	private String url;

	@PostConstruct
	public void init() {
		resourcePath = Paths.get(path).toAbsolutePath().normalize();
		resourcePathThumb = Paths.get(path + File.separator + "thumb").toAbsolutePath().normalize();
		try {
			Files.createDirectories(resourcePath);
			Files.createDirectories(resourcePathThumb);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@PostMapping("upload")
	public ResponseEntity<AjaxResult> upload(MultipartHttpServletRequest multiRequest,
			@RequestParam(required = false) Integer width, @RequestParam(required = false) Integer height,
			@RequestParam(required = false) String useThumb) {
		AjaxResult ajaxResult = new AjaxResult();
		Map<String, MultipartFile> files = multiRequest.getFileMap();
		List<MultipartFile> list = new ArrayList<MultipartFile>(files.values());
		try {
			// send one file at a time
			if (list.size() > 0) {
				MultipartFile item = list.get(0);
				if (item.getSize() > 0) {
					String fileName = UUID.randomUUID().toString() + "_"
							+ StringUtils.cleanPath(item.getOriginalFilename().replaceAll(" ", "_"));
					Path targetLocation = resourcePath.resolve(fileName);
					Files.copy(item.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

					new Thread(() -> {
						Path target = resourcePathThumb.resolve(fileName);
						try {
							ResizeImage.handle(targetLocation, target, CommonConstants.WIDTH_IMG_THUMB, height);
						} catch (FileNotFoundException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						} catch (IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					}).start();

					ajaxResult.setMessage(url + fileName + "&useThumb="
							+ (useThumb == null ? "N" : (width == null ? "N" : useThumb)));
				}
			}
			ajaxResult.setStatus(true);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			ajaxResult.setMessage("Save fail !!!");
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}

	@GetMapping("image/getImage")
	public void getImage(@RequestParam String fileName, @RequestParam(required = false) String useThumb,
			@RequestParam(required = false) String type, HttpServletResponse httpServletResponse) {
		Path targetLocation = null;
		try {
			targetLocation = (useThumb == null || "N".equals(useThumb)) ? resourcePath.resolve(fileName)
					: resourcePathThumb.resolve(fileName);
			if (type == null) {
				httpServletResponse.setContentType(Files.probeContentType(targetLocation));
				Files.copy(targetLocation, httpServletResponse.getOutputStream());
			} else if ("DELETE".equals(type)) {
				Files.delete(targetLocation);
			}
		} catch (IOException e) {

		}
	}
}
