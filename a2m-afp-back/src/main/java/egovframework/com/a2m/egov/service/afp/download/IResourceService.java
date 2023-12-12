package egovframework.com.a2m.egov.service.afp.download;

import java.nio.file.Path;
import java.util.Map;

/**
 * @author tiennd
 */
public interface IResourceService {
    void render(Path fileZip, String folderUnzip, Map<Object, Object> request, String folderZip) throws Exception;
}
