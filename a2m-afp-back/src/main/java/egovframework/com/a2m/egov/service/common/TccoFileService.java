package egovframework.com.a2m.egov.service.common;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import egovframework.com.a2m.egov.dao.common.TccoFileDAO;
import egovframework.com.a2m.egov.model.TccoFile;

/**
 * @author KetHX
 */
@Service
public class TccoFileService {
	@Autowired
    private TccoFileDAO tccoFileDao;
	
	/**
     * Find list of file by given file sequences.
     *
     * @param fileSequences
     * @return null if find nothing, else return a list of TccoFile instance.
     * @throws Exception
     */
    public List<TccoFile> findBySequences(List<String> fileSequences) throws Exception {
        if (fileSequences == null || fileSequences.isEmpty()) {
            return null;
        }
        List<Map<Object, Object>> result = tccoFileDao.findBySequences(fileSequences);
        if (result == null) {
            return null;
        }

        // TODO: check and remove files does not exist on disk
        return result.stream().map(data -> {
            TccoFile file = new TccoFile().fromMap(data);
            return file;
        }).collect(Collectors.toList());
    }
	  /**
     * Insert a new row into TCCO_FILE table by given data.
     *
     * @param data is a map keep data for column names in DB.
     * @return true if insert success, else return false.
     * @throws Exception
     */
    public boolean insert(Map<Object, Object> data) throws Exception {
        if (data == null || data.isEmpty()) {
            return false;
        }
        int affected = tccoFileDao.insert(data);

        return affected > 0;
    }
}
