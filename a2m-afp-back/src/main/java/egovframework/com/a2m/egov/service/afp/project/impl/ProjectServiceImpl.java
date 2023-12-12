/**
 * 
 */
package egovframework.com.a2m.egov.service.afp.project.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import javax.transaction.Transactional;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import egovframework.com.a2m.egov.constants.CommonConstants;
import egovframework.com.a2m.egov.constants.RoleConstants;
import egovframework.com.a2m.egov.dao.afp.project.ProjectDAO;
import egovframework.com.a2m.egov.model.afp.project.ProjectDto;
import egovframework.com.a2m.egov.model.afp.project.ProjectSearchDto;
import egovframework.com.a2m.egov.model.afp.project.ProjectTypeDto;
import egovframework.com.a2m.egov.model.response.UserResponse;
import egovframework.com.a2m.egov.service.afp.project.IProjectService;
import egovframework.com.a2m.egov.service.common.CommonService;

/**
 * @author tiennd
 *
 * @created Apr 18, 2023
 */

@Service
public class ProjectServiceImpl extends EgovAbstractServiceImpl implements IProjectService {

	@Autowired
	private ProjectDAO dao;

	@Autowired
	private CommonService commonService;

	@Value("${auth.api.url}")
	private String authServer;

	@Override
	public List<ProjectDto> getList(ProjectSearchDto searchDto) throws Exception {
		// TODO Auto-generated method stub
		String userUid = commonService.getUserUid();
		searchDto.setUserUid(userUid);
		List<ProjectDto> listDto = dao.getList(searchDto);
		Set<String> setUserUid = new HashSet<>();
		for (ProjectDto model : listDto) {
			setUserUid.add(model.getCreatedBy());
		}
		List<String> paramsUid = new ArrayList<String>();
		paramsUid.addAll(setUserUid);
		List<Map> list = commonService.getListUserInfoByUserUid(paramsUid);

		Map<String, Map<String, String>> map = new HashMap<>();

		for (int i = 0; i < list.size(); i++) {
			Map user = list.get(i);
			String imgPath = user.get("imgPath") == null ? null : user.get("imgPath").toString();
			Map<String, String> obj = new HashMap<>();
			if (imgPath != null && !imgPath.equals("")) {
				if (!(imgPath.startsWith("http://") || imgPath.startsWith("https://"))) {
					String imgUrl = authServer + "/api/public/getImageByName?useThumb=Y&fileName=" + imgPath;
					obj.put("imgUrl", imgUrl);
				} else {
					obj.put("imgUrl", imgPath);
				}
			}
			obj.put("fullName", user.get("fullName").toString());
			map.put(user.get("userUid").toString(), obj);
		}

		for (ProjectDto model : listDto) {
			if (map.containsKey(model.getCreatedBy())) {
				model.setCreatedByNm(map.get(model.getCreatedBy()).get("fullName"));
				model.setImageUrl(map.get(model.getCreatedBy()).get("imgUrl"));
			} else {
				model.setCreatedByNm("Anonymous");
			}
		}

		return listDto;
	}

	@Override
	@Transactional
	public int save(ProjectDto projectDto) throws Exception {
		// TODO Auto-generated method stub
		String userUid = commonService.getUserUid();
		projectDto.setCreatedBy(userUid);
		projectDto.setUpdatedBy(userUid);
		if (projectDto.getId() != null) {
			String roles = commonService.getUserRoles(userUid);
			if (!roles.contains(RoleConstants.ADMIN_USER.getValue() + ",")) {
				return 0;
			}
			ProjectDto objDto = dao.getById(projectDto.getId());
			if (objDto == null) {
				return 0;
			} else {
				dao.update(projectDto);
				dao.updatePostDetail(projectDto);
			}
		} else {
			projectDto.setPostType(CommonConstants.POST_TYPE_PROJECTS);
			dao.insert(projectDto);
			dao.insertPostDetail(projectDto);
		}
		return 1;
	}

	@Override
	public int delete(Long id) throws Exception {
		// TODO Auto-generated method stub
		String userUid = commonService.getUserUid();
		String roles = commonService.getUserRoles(userUid);
		if (!roles.contains(RoleConstants.ADMIN_USER.getValue() + ",")) {
			return 0;
		}
		ProjectDto projectDto = new ProjectDto();
		projectDto.setId(id);
		projectDto.setUpdatedBy(userUid);
		projectDto.setCrud("D");
		ProjectDto objDto = dao.getById(projectDto.getId());
		if (objDto == null) {
			return 0;
		} else {
			dao.delete(projectDto);
		}
		return 1;
	}

	@Override
	public int bookmark(ProjectDto projectDto) throws Exception {
		// TODO Auto-generated method stub
		String userUid = commonService.getUserUid();
		projectDto.setCreatedBy(userUid);
		ProjectDto objDto = dao.getById(projectDto.getId());
		if (objDto == null) {
			return 0;
		} else {
			if ("N".equals(projectDto.getIsBookmark())) {
				// bookmark
				dao.bookmark(projectDto);
			} else if ("Y".equals(projectDto.getIsBookmark())) {
				// un bookmark
				dao.unBookmark(projectDto);
			} else {
				return 0;
			}
		}
		return 1;
	}

	@Override
	public int getProjectCounter() throws Exception {
		// TODO Auto-generated method stub
		String userUid = commonService.getUserUid();
		ProjectSearchDto searchDto = new ProjectSearchDto();
		searchDto.setUserUid(userUid);
		searchDto.setTypeSearch(ProjectTypeDto.ALL.type());
		List<ProjectDto> listDto = dao.getList(searchDto);
		return listDto.size();
	}

	@Override
	public ProjectDto getProjectById(Long id) throws Exception {
		// TODO Auto-generated method stub
		String userUid = commonService.getUserUid();
		Map<Object, Object> args = new HashMap<>();
		args.put("userUid", userUid);
		args.put("id", id);
		ProjectDto objDto = dao.getProjectById(args);
		if (objDto == null) {
			return null;
		}
		UserResponse userResponse = commonService.getUserInfoByUserUid(objDto.getCreatedBy());
		objDto.setCreatedByNm(userResponse.getFullName());
		String imgPath = userResponse.getImgPath();
		if (imgPath != null && !imgPath.equals("")
				&& !(imgPath.startsWith("http://") || imgPath.startsWith("https://"))) {
			String imgUrl = authServer + "/api/public/getImageByName?useThumb=Y&fileName=" + imgPath;
			objDto.setImageUrl(imgUrl);
		}
		return objDto;
	}

}
