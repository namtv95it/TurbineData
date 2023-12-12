package egovframework.com.a2m.egov.service.sam.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import egovframework.com.a2m.egov.dao.sam.Sam0103DAO;
import egovframework.com.a2m.egov.model.response.UserResponse;
import egovframework.com.a2m.egov.model.sam.Sam0103CommentModel;
import egovframework.com.a2m.egov.model.sam.Sam0103Model;
import egovframework.com.a2m.egov.service.common.CommonService;
import egovframework.com.a2m.egov.service.sam.ISam0103Service;

/**
 * @author tiennd
 *
 * @created Feb 28, 2023
 */
@Service
public class Sam0103ServiceImpl extends EgovAbstractServiceImpl implements ISam0103Service {

	@Autowired
	private Sam0103DAO sam0103dao;

	@Autowired
	private CommonService commonService;

	@Override
	public int save(Sam0103CommentModel model) throws Exception {
		// TODO Auto-generated method stub
		if (model.getId() != null) {
			Sam0103CommentModel optional = sam0103dao.getById(model.getId());
			if (optional == null) {
				return 0;
			} else {
				sam0103dao.update(model);
			}
		} else {
			sam0103dao.insert(model);
		}
		return 1;
	}

	@Override
	public List<Sam0103CommentModel> getCommentByPostId(Long id) throws Exception {
		// TODO Auto-generated method stub
		List<Sam0103CommentModel> comments = sam0103dao.selectComment(id);
//		List<Sam0103CommentModel> comments = sam0103dao.getListCommentByPostId(id);
		for (int i = 0; i < comments.size(); i++) {
			Sam0103CommentModel commentModel = comments.get(i);
			UserResponse userResponse = commonService.getUserInfoByUserUid(commentModel.getCreatedBy());
			commentModel.setCreatedBy(userResponse.getFullName());

//			comments.get(i).setListCommentChild(new ArrayList<>());
			getComment(commentModel, commentModel.getListCommentChild());
		}
		return comments;
	}

	public void getComment(Sam0103CommentModel comment, List<Sam0103CommentModel> childs) throws Exception {
//		List<Sam0103CommentModel> childList = sam0103dao.getListCommentChild(comment.getId());
//		for (int i = 0; i < childList.size(); i++) {
//			Sam0103CommentModel child = childList.get(i);
//			
//			UserResponse userResponse = commonService.getUserInfoByUserUid(child.getCreatedBy());
//			child.setCreatedBy(userResponse.getFullName());
//			
//			child.setListCommentChild(new ArrayList<>());
//			getComment(child, child.getListCommentChild());
//			childs.add(child);
//		}

		for (int i = 0; i < childs.size(); i++) {
			Sam0103CommentModel child = childs.get(i);
			UserResponse userResponse = commonService.getUserInfoByUserUid(child.getCreatedBy());
			child.setCreatedBy(userResponse.getFullName());
			getComment(child, child.getListCommentChild());
		}
	}

	@Override
	public int save(Sam0103Model sam0103Model) throws Exception {
		// TODO Auto-generated method stub
		if (sam0103Model.getId() != null) {
			Sam0103Model optional = sam0103dao.getQuestionById(sam0103Model.getId());
			if (optional == null) {
				return 0;
			} else {
				sam0103dao.update(sam0103Model);
			}
		} else {
			sam0103dao.insert(sam0103Model);
		}
		return 1;
	}

	@Override
	public Map<Object, Object> getList(Integer page, Integer limit, String category, String topic, String title,
			String date) throws Exception {

		// TODO Auto-generated method stub
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date dateFm = null;
		try {
			dateFm = sdf.parse(date);
		} catch (ParseException e1) {
			// TODO Auto-generated catch block
		}

		Map<Object, Object> params = new HashMap();
		params.put("title", "".equals(title) ? null : title);
		params.put("category", ("".equals(category) || "null".equals(category)) ? null : category);
		params.put("topic", ("".equals(topic) || "null".equals(topic)) ? null : topic);
		params.put("date", dateFm);
		params.put("offset", page <= 0 ? 0 : (page - 1) * (limit <= 0 ? 10 : limit));
		params.put("limit", limit <= 0 ? 10 : limit);

		List<Sam0103Model> list = sam0103dao.getList(params);

		for (Sam0103Model model : list) {
			UserResponse userResponse = commonService.getUserInfoByUserUid(model.getCreatedBy());
			model.setCreatedByNm(userResponse.getFullName());
		}

		Long count = sam0103dao.count(params);

		Map result = new HashMap();
		result.put("totalElement", count);
		result.put("value", list);
		return result;
	}

	@Override
	public Map<Object, Object> getList(Integer limit, String url) throws Exception {
		// TODO Auto-generated method stub
		Map<Object, Object> params = new HashMap();
		params.put("url", url);
		params.put("limit", limit <= 0 ? 10 : limit);

		List<Sam0103Model> list = sam0103dao.getListByUrl(params);

		for (Sam0103Model model : list) {
			UserResponse userResponse = commonService.getUserInfoByUserUid(model.getCreatedBy());
			model.setCreatedByNm(userResponse.getFullName());
		}

		Map result = new HashMap();
		result.put("value", list);
		return result;
	}

	@Override
	public Sam0103Model getQAById(Long id) throws Exception {
		// TODO Auto-generated method stub
		Sam0103Model optional = sam0103dao.getQuestionById(id);
		return optional;
	}

}
