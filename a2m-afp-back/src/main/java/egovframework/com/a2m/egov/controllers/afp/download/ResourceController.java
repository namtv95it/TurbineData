package egovframework.com.a2m.egov.controllers.afp.download;

import egovframework.com.a2m.egov.constants.CommonConstants;
import egovframework.com.a2m.egov.model.request.DownloadBackendRequest;
import egovframework.com.a2m.egov.service.afp.download.IAuthResourceService;
import egovframework.com.a2m.egov.service.afp.download.IBackendResourceService;
import egovframework.com.a2m.egov.service.afp.download.IResourceService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * @author tiennd
 */

@RestController
@RequestMapping("api/resource")
public class ResourceController {

	private Logger log = LoggerFactory.getLogger(ResourceController.class);

	@Value("${file.path.resource}")
	private String folderSource;

	@Value("${file.path.render}")
	private String folderRender;

	@Autowired
	private IResourceService resourceService;

	@Autowired
	private IBackendResourceService backendResourceService;

	@Autowired
	private IAuthResourceService authResourceService;

	@PostMapping("/framework-front.exclude")
	public ResponseEntity<Resource> download(@RequestBody Map<Object, Object> model, HttpServletRequest request)
			throws Exception {

		Path fromFile = Paths.get(folderSource + File.separator + CommonConstants.FOLDER_NAME_FRONTEND + File.separator + CommonConstants.NAME_FOLDER_ZIP_FRONT);

		String fileName = System.currentTimeMillis() + "_" + CommonConstants.NAME_FOLDER_ZIP_FRONT;
		Path targetLocation = null;
		Path resourcePath = Paths.get(folderRender + File.separator + CommonConstants.FOLDER_NAME_FRONTEND).toAbsolutePath().normalize();
		Files.createDirectories(resourcePath);
		targetLocation = resourcePath.resolve(fileName);
		Files.copy(fromFile, targetLocation, StandardCopyOption.REPLACE_EXISTING);

		String projectName = "";
		if (model.containsKey(CommonConstants.KEY_PROJECT_NAME)) {
			projectName = model.get(CommonConstants.KEY_PROJECT_NAME).toString();
		}
		if ("".equals(projectName)) {
			throw new RuntimeException("project name is not empty");
		}
		model.remove(CommonConstants.KEY_PROJECT_NAME);

		resourceService.render(targetLocation,
				folderRender + File.separator + CommonConstants.FOLDER_NAME_FRONTEND + File.separator + fileName.substring(0, fileName.length() - 4) + File.separator
						+ projectName,
				model, folderRender + File.separator + CommonConstants.FOLDER_NAME_FRONTEND + File.separator + fileName.substring(0, fileName.length() - 4));

		Path finalResouce = Paths.get(folderRender + File.separator + CommonConstants.FOLDER_NAME_FRONTEND + File.separator + fileName);

		HttpHeaders headers = new HttpHeaders();
		headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + projectName + CommonConstants.EXTENSION_ZIP);
		ByteArrayResource resource = new ByteArrayResource(Files.readAllBytes(finalResouce));
		Long size = Files.size(finalResouce);
		Files.delete(finalResouce);

		return ResponseEntity.ok().headers(headers).contentLength(size).contentType(MediaType.APPLICATION_OCTET_STREAM)
				.body(resource);
	}

	@PostMapping(value = "framework-backend.exclude")
	public ResponseEntity<?> downloadFrameworkBackend(@RequestBody Map<String, Object> params,
			HttpServletRequest request) throws Exception {

		log.info("Rest request to download framework backend");

		DownloadBackendRequest downloadBackendRequest = new DownloadBackendRequest();
		List<String> denpendencies = new ArrayList<>();
		for (Map.Entry<String, Object> entry : params.entrySet()) {
			if (entry.getValue().toString().equals("true")) {
				denpendencies.add(entry.getKey());
			}

			if (!entry.getValue().toString().equals("true") && !entry.getValue().toString().equals("false")) {
				denpendencies.add(entry.getValue().toString());
			}

			if (entry.getKey().equals("sql")) {
				downloadBackendRequest.setDatabaseType(entry.getValue().toString());
			}
		}

		downloadBackendRequest.setProjectName(params.get(CommonConstants.KEY_PROJECT_NAME).toString());
		downloadBackendRequest.setDependencies(denpendencies);

		String sourceDirPath = folderSource + File.separator + "backend";
		String destinationDirPath = folderRender + File.separator + "backend" + File.separator
				+ System.currentTimeMillis();

		Files.createDirectory(Paths.get(destinationDirPath));

		ByteArrayResource resource = backendResourceService.renderBackend(sourceDirPath, destinationDirPath,
				downloadBackendRequest);

		HttpHeaders headers = new HttpHeaders();
		headers.add(HttpHeaders.CONTENT_DISPOSITION,
				"attachment; filename=" + downloadBackendRequest.getProjectName() + CommonConstants.EXTENSION_ZIP);

		return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_OCTET_STREAM).body(resource);
	}

	@PostMapping(value = "framework-auth.exclude")
	public ResponseEntity<?> downloadFrameworkAuth(@RequestBody Map<String, Object> params, HttpServletRequest request)
			throws Exception {

		log.info("Rest request to download framework auth");

		String projectName = params.get(CommonConstants.KEY_PROJECT_NAME).toString();

		String sourceDirPath = folderSource + File.separator + "auth";
		String destinationDirPath = folderRender + File.separator + "auth" + File.separator
				+ System.currentTimeMillis();

		Files.createDirectory(Paths.get(destinationDirPath));

		ByteArrayResource resource = authResourceService.renderAuth(sourceDirPath, destinationDirPath, projectName);

		HttpHeaders headers = new HttpHeaders();
		headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + projectName + CommonConstants.EXTENSION_ZIP);

		return ResponseEntity.ok().headers(headers).contentType(MediaType.APPLICATION_OCTET_STREAM).body(resource);
	}
}
