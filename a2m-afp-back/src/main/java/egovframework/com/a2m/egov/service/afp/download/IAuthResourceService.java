package egovframework.com.a2m.egov.service.afp.download;

import org.springframework.core.io.ByteArrayResource;

import java.io.IOException;

public interface IAuthResourceService {
	public ByteArrayResource renderAuth(String folderSource, String destinationFolder, String projectName) throws IOException;
}
