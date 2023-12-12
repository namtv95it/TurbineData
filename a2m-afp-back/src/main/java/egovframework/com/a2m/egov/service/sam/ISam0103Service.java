package egovframework.com.a2m.egov.service.sam;

import java.util.List;
import java.util.Map;

import egovframework.com.a2m.egov.model.sam.Sam0103CommentModel;
import egovframework.com.a2m.egov.model.sam.Sam0103Model;

/**
 * @author tiennd
 *
 * @created Feb 28, 2023
 */

public interface ISam0103Service {

	int save(Sam0103CommentModel model) throws Exception;

	List<Sam0103CommentModel> getCommentByPostId(Long id) throws Exception;

	int save(Sam0103Model sam0103Model) throws Exception;

	Map<Object, Object> getList(Integer page, Integer limit, String category, String topic, String title, String date)
			throws Exception;

	Map<Object, Object> getList(Integer limit, String url) throws Exception;

	Sam0103Model getQAById(Long id) throws Exception;
}
