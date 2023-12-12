package egovframework.com.a2m.egov.controllers.common;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import egovframework.com.a2m.egov.model.TccoFile;
import egovframework.com.a2m.egov.model.response.AjaxResult;
import egovframework.com.a2m.egov.service.common.TccoFileService;
import springfox.documentation.annotations.ApiIgnore;

/**
 * @author KetHX
 */
@RestController
@RequestMapping("common/file-service")
@ApiIgnore
public class FileServiceController {
	
	   @Autowired
	    private TccoFileService tccoFileService;
	
		@PostMapping("/saveFiles")
	    @ResponseBody
	    public Object saveFiles(@RequestBody List<Map<Object, Object>> filesData) throws Exception {
	        AjaxResult ajaxResult = new AjaxResult();
	        try {
	            if (filesData == null || filesData.isEmpty()) {
	                ajaxResult.setStatus(false);
	                ajaxResult.setMessage("You send nothing to save!");
	                return ajaxResult.toMap();
	            }

	            List<Map<Object, Object>> insertedData = new ArrayList<>();
	            for (Map<Object, Object> data : filesData) {
	                if (data == null || data.isEmpty()) {
	                    continue;
	                }

	                // make file sequence
	                data.put("ATCH_FLE_SEQ", UUID.randomUUID().toString());

	                if (tccoFileService.insert(data)) {
	                    insertedData.add(data);
	                }
	            }

	            ajaxResult.setStatus(true);
	            ajaxResult.setMessage(insertedData.size() + " files inserted");
	            List<String> sequences = insertedData.stream()
	                    .map(data -> data.get("ATCH_FLE_SEQ") == null ? "" : data.get("ATCH_FLE_SEQ").toString())
	                    .collect(Collectors.toList());
	            sequences.remove("");
	            List<TccoFile> files = tccoFileService.findBySequences(sequences);
	            ajaxResult.setResponseData(files == null ? null : files.stream().map(file -> file.toMap()));
	        } catch (Exception e) {
	            e.printStackTrace();
	            ajaxResult.setStatus(false);
	            ajaxResult.setMessage(e.getLocalizedMessage());
	        }

	        return ajaxResult.toMap();
	    }
}
