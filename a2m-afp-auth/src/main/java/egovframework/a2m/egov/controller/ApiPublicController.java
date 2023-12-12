package egovframework.a2m.egov.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author tiennd
 *
 * @created May 20, 2023
 */

@RestController
@RequestMapping(value = "api/public")
public class ApiPublicController {

	private static Path resourcePath;
	private static Path resourcePathThumb;

	@Value("${path.upload.dir}")
	private String pathUploadDir;

	@PostConstruct
	public void init() {
		resourcePath = Paths.get(pathUploadDir).toAbsolutePath().normalize();
		resourcePathThumb = Paths.get(pathUploadDir + File.separator + "thumb").toAbsolutePath().normalize();
		try {
			Files.createDirectories(resourcePath);
			Files.createDirectories(resourcePathThumb);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	@GetMapping("getImageByName")
	public void getImageByName(@RequestParam String fileName, @RequestParam(required = false) String useThumb,
			HttpServletResponse httpServletResponse) {
		Path targetLocation = null;
		try {
			targetLocation = (useThumb == null || "N".equals(useThumb)) ? resourcePath.resolve(fileName)
					: resourcePathThumb.resolve(fileName);
			httpServletResponse.setContentType(Files.probeContentType(targetLocation));
			Files.copy(targetLocation, httpServletResponse.getOutputStream());
		} catch (IOException e) {

		}
	}
}
