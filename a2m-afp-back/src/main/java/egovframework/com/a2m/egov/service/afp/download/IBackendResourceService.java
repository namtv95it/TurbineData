package egovframework.com.a2m.egov.service.afp.download;

import egovframework.com.a2m.egov.model.request.DownloadBackendRequest;
import org.springframework.core.io.ByteArrayResource;

public interface IBackendResourceService {
	
	ByteArrayResource renderBackend(String folderSource, String destinationFolder, DownloadBackendRequest downloadBackendRequest) throws Exception;
	
}	
