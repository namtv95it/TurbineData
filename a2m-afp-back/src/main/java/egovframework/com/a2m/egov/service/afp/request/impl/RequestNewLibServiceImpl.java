package egovframework.com.a2m.egov.service.afp.request.impl;

import egovframework.com.a2m.egov.constants.CommonConstants;
import egovframework.com.a2m.egov.dao.afp.request.RequestNewLibDAO;
import egovframework.com.a2m.egov.model.afp.project.ProjectDto;
import egovframework.com.a2m.egov.model.response.UserResponse;
import egovframework.com.a2m.egov.service.afp.request.RequestNewLibService;
import egovframework.com.a2m.egov.service.common.CommonService;
import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.*;

@Service
public class RequestNewLibServiceImpl extends EgovAbstractServiceImpl implements RequestNewLibService {

    @Resource
    RequestNewLibDAO requestNewLibDAO;

    @Autowired
    private CommonService commonService;

    @Value("${auth.api.url}")
    private String authServer;
    @Override
    public List<Map<Object, Object>> lstRequest(String keySearch) throws Exception {
        Map<Object, Object> param = new HashMap<>();
        param.put("keySearch", keySearch);
        param.put("postTypeRequest", CommonConstants.POST_TYPE_REQUEST_NEW_LIB);
        param.put("isDeleted", false);
        List<Map<Object, Object>> lstRequest = requestNewLibDAO.getRequest(param);
        List<Map<Object, Object>> lstTemp = new ArrayList<>();
        String userUid = commonService.getUserUid();
        String role = commonService.getUserRoles(userUid);
        for (int i = 0; i < lstRequest.size(); i++) {
            if(role.contains(CommonConstants.ROLE_ADMIN)){
                lstTemp.add(lstRequest.get(i));
            }else{
                if(((lstRequest.get(i).get("status").toString().equals(CommonConstants.REQUEST_STATUS_REQUESTED) || lstRequest.get(i).get("status").toString().equals(CommonConstants.REQUEST_STATUS_REJECTED)) && userUid.equals(lstRequest.get(i).get("createdBy").toString())) || lstRequest.get(i).get("status").toString().equals(CommonConstants.REQUEST_STATUS_APPROVED)){
                    lstTemp.add(lstRequest.get(i));
                }
            }
        }
        Set<String> setUserUid = new HashSet<>();
        for (Map<Object, Object> request : lstTemp) {
            setUserUid.add(request.get("createdBy").toString());
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

        for (Map<Object, Object> request : lstTemp) {
            if (map.containsKey(request.get("createdBy").toString())) {
                request.put("authorName", map.get(request.get("createdBy").toString()).get("fullName"));
                request.put("authorImgUrl", map.get(request.get("createdBy").toString()).get("imgUrl"));
            } else {
                request.put("authorName","Anonymous");
            }
        }
        return lstTemp;
    }

    @Override
    public Map<Object, Object> getRequestById(String requestId) throws Exception {
        Map<Object, Object> param = new HashMap<>();
        param.put("requestId", requestId);
        param.put("isDeleted", false);
        Map<Object,Object> request = requestNewLibDAO.getRequestById(param);
        UserResponse author = commonService.getUserInfoByUserUid(request.get("createdBy").toString());
        request.put("authorName", author.getFullName() != null ? author.getFullName() : "Anonymous");
        request.put("authorImg", authServer + "/api/public/getImageByName?useThumb=Y&fileName=" + author.getImgPath());
        return request;
    }

    @Override
    @Transactional
    public int insertRequest(Map<Object, Object> param) throws Exception {
        param.put("createdBy", commonService.getUserUid());
        param.put("defaultViewNumber", 0);
        param.put("postTypeRequest", CommonConstants.POST_TYPE_REQUEST_NEW_LIB);
        param.put("isDeleted", false);
        requestNewLibDAO.insertRequest(param);
        param.put("status", CommonConstants.REQUEST_STATUS_DEFAULT);
        return requestNewLibDAO.insertRequestStatus(param);
    }

    @Override
    public int updateRequest(Map<Object, Object> param) throws Exception {
        param.put("updatedBy", commonService.getUserUid());
        return requestNewLibDAO.updateRequest(param);
    }

    @Override
    public int deleteRequest(String requestId) throws Exception {
        Map<Object,Object> param = new HashMap<>();
        param.put("requestId", requestId);
        param.put("isDeleted", true);
        return requestNewLibDAO.deletePost(param);
    }

    @Override
    public int updateRequestStatus(Map<Object, Object> param) throws Exception {
        return requestNewLibDAO.updateRequestStatus(param);
    }
}
