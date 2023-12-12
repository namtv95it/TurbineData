package egovframework.com.a2m.egov.controllers.nero;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.IOUtils;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import kr.a2mvn.largefileupload.controller.FumController;
import kr.a2mvn.largefileupload.exception.FumException;
import kr.a2mvn.largefileupload.model.FumFile;
import springfox.documentation.annotations.ApiIgnore;

/**
 * @author KetHx
 */

@RequestMapping("/nero/action")
@RestController
@ApiIgnore
public class NeroActionsController {
	
	/**
	 * clearUpload.jsp
	 */
	@RequestMapping("/clearUpload.ajax")
	@ResponseBody
	public String clearUpload(HttpServletRequest request, HttpServletResponse response) {
		FumController controller = FumController.getInstance();
		String resp = "";
		try {
			resp = controller.clearUpload(request);
		} catch (FumException ex) {
			resp = controller.handleCustomException(ex, request, response);
		} catch (Exception e) {
			e.printStackTrace();
			resp = e.getMessage();
		}
		response.setHeader("Pragma", "no-cache");
		response.setHeader("Cache-Control", "no-cache");
		response.setDateHeader("Expires", 0);

		return resp;
	}

	/**
	 * deleteFiles.jsp
	 */
	@RequestMapping("/deleteFiles.ajax")
	@ResponseBody
	public String deleteFiles(HttpServletRequest request, HttpServletResponse response) {
		FumController controller = FumController.getInstance();
		String resp = "";
		try {
			resp = controller.deleteFiles(request, response);
		} catch (FumException ex) {
			resp = controller.handleCustomException(ex, request, response);
		} catch (Exception e) {
			e.printStackTrace();
			resp = e.getMessage();
		}

		return resp;
	}

	/**
	 * deleteTempFile.jsp
	 */
	@RequestMapping("/deleteTempFile.ajax")
	@ResponseBody
	public String deleteTempFile(HttpServletRequest request, HttpServletResponse response) {
		FumController controller = FumController.getInstance();
		String resp = "";
		try {
			resp = controller.deleteTempFile(request, response);
		} catch (FumException ex) {
			resp = controller.handleCustomException(ex, request, response);
		} catch (Exception e) {
			e.printStackTrace();
			resp = e.getMessage();
		}

		return resp;
	}

	/**
	 * downloadFile.jsp
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/downloadFile.ajax")
	public void downloadFile(HttpServletRequest request, HttpServletResponse response, HttpSession session)
			throws IOException {
		FumController controller = FumController.getInstance();
		try {

			Map<String, Object> fileInfo = controller.downloadFile(request, response);
			File file = (File) fileInfo.get("file");
			FumFile info = (FumFile) fileInfo.get("info");
			String fileNameDownload = (String) fileInfo.get("fileNameDownload");
			response.setContentType("application/force-download");
			response.setHeader("Content-Disposition",
					"attachment; filename=\"" + URLEncoder.encode(fileNameDownload, "UTF-8") + "\"");
			response.setHeader("Set-Cookie", "fileDownload=true; path=/");
			response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
			
			FileInputStream inStream = new FileInputStream(file);
			IOUtils.copy(inStream, response.getOutputStream());
			info.setDownloadSize(file.length());
			session.setAttribute(info.getUniqueIdentifier(), info);
			inStream.close();

			return;
		} catch (FumException ex) {
			response.setHeader("Set-Cookie", "fileDownload=false; path=/");
			response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
			String res = controller.handleCustomException(ex, request, response);
			response.getWriter().print(res);
		} catch (Exception e) {
			response.setHeader("Set-Cookie", "fileDownload=false; path=/");
			response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
			e.printStackTrace();
			String res = e.getMessage();
			response.getWriter().print(res);
		}
	}

	/**
	 * folderCheck.jsp
	 */
	@RequestMapping("/folderCheck.ajax")
	@ResponseBody
	public String folderCheck(HttpServletRequest request, HttpServletResponse response) {
		FumController controller = FumController.getInstance();
		String resp = "";
		try {
			resp = controller.folderCheck(request, response);
		} catch (FumException ex) {
			resp = controller.handleCustomException(ex, request, response);
		} catch (Exception e) {
			e.printStackTrace();
			resp = e.getMessage();
		}
		response.setHeader("Pragma", "no-cache");
		response.setHeader("Cache-Control", "no-cache");
		response.setDateHeader("Expires", 0);

		return resp;
	}

	/**
	 * preUpload.jsp
	 */
	@RequestMapping("/preUpload.ajax")
	@ResponseBody
	public String preUpload(HttpServletRequest request, HttpServletResponse response) {
		FumController controller = FumController.getInstance();
		String resp = "";
		try {
			resp = controller.preUpload(request);
		} catch (FumException ex) {
			resp = controller.handleCustomException(ex, request, response);
		} catch (Exception e) {
			e.printStackTrace();
			resp = e.getMessage();
		}
		response.setHeader("Pragma", "no-cache");
		response.setHeader("Cache-Control", "no-cache");
		response.setDateHeader("Expires", 0);

		return resp;
	}

	/**
	 * progressDownloadFile.jsp
	 */
	@RequestMapping("/progressDownloadFile.ajax")
	@ResponseBody
	public String progressDownloadFile(HttpServletRequest request, HttpServletResponse response) {
		FumController controller = FumController.getInstance();
		String resp = "";
		try {
			resp = controller.progressDownloadFile(request, response);
		} catch (FumException ex) {
			resp = controller.handleCustomException(ex, request, response);
		} catch (Exception e) {
			e.printStackTrace();
			resp = e.getMessage();
		}

		return resp;
	}

	/**
	 * upload.jsp
	 */
	@RequestMapping(value = "/upload.ajax", produces = "application/json;charset=UTF-8")
	@ResponseBody
	public String upload(HttpServletRequest request, HttpServletResponse response) {
		FumController controller = FumController.getInstance();
		String resp = "";
		try {
			resp = controller.upload(request, response);
		} catch (FumException ex) {
			resp = controller.handleCustomException(ex, request, response);
		} catch (Exception e) {
			e.printStackTrace();
			resp = e.getMessage();
		}
		response.setHeader("Pragma", "no-cache");
		response.setHeader("Cache-Control", "no-cache");
		response.setDateHeader("Expires", 0);

		return resp;
	}

	/**
	 * zipFiles.jsp
	 */
	@RequestMapping("/zipFiles.ajax")
	@ResponseBody
	public String zipFiles(HttpServletRequest request, HttpServletResponse response) {
		FumController controller = FumController.getInstance();
		String resp = "";
		try {
			resp = controller.zipFiles(request, response);
		} catch (FumException ex) {
			resp = controller.handleCustomException(ex, request, response);
		} catch (Exception e) {
			e.printStackTrace();
			resp = e.getMessage();
		}
		response.setHeader("Pragma", "no-cache");
		response.setHeader("Cache-Control", "no-cache");
		response.setDateHeader("Expires", 0);

		return resp;
	}

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/downloadZipFile.ajax", method = RequestMethod.GET)
	public void downloadZip(Model model, HttpServletRequest request, HttpServletResponse response) {
		FumController ctr = FumController.getInstance();
		try {
			ServletOutputStream os = response.getOutputStream();
			Map<String, Object> map = ctr.downloadFile(request, response);
			File file = (File) map.get("file");
			FumFile info = (FumFile) map.get("info");
			SimpleDateFormat sdformat = new SimpleDateFormat("YYYYMMdd");
			String fileNameDownload = "기업지원플랫폼_" + sdformat.format(new Date()) + ".zip";
			response.setContentType("application/force-download");
			response.setHeader("Content-Disposition",
					"attachment; filename=\"" + URLEncoder.encode(fileNameDownload, "UTF-8") + "\"");
			response.setHeader("Set-Cookie", "fileDownload=true; path=/");
			response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
			// get your file as InputStream
			InputStream fileIn = new FileInputStream(file);
			byte[] outputByte = new byte[1024];
			// copy binary contect to output stream

			int numRead;
			while ((numRead = fileIn.read(outputByte, 0, outputByte.length)) != -1) {
				os.write(outputByte, 0, numRead);
			}
			// release file
			fileIn.close();

			info.setDownloadSize(file.length());

			os.flush();
			os.close();
		} catch (Exception e) {
			ctr = null;
		}
	}

}
