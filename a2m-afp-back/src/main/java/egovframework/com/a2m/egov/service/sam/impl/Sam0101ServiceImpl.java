/**
 * 
 */
package egovframework.com.a2m.egov.service.sam.impl;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import egovframework.com.a2m.egov.dao.sam.Sam0101DAO;
import egovframework.com.a2m.egov.model.TccoSTD;
import egovframework.com.a2m.egov.model.response.UserResponse;
import egovframework.com.a2m.egov.model.sam.Sam0101Model;
import egovframework.com.a2m.egov.service.common.CommonService;
import egovframework.com.a2m.egov.service.sam.ISam0101Service;

/**
 * @author tiennd
 *
 * @created Feb 28, 2023
 */

@Service
public class Sam0101ServiceImpl extends EgovAbstractServiceImpl implements ISam0101Service {

	@Autowired
	private Sam0101DAO sam0101dao;
	
	@Autowired
	private CommonService commonService;

	@Override
	public int save(Sam0101Model sam0101Model) throws Exception {
		// TODO Auto-generated method stub
		if (sam0101Model.getId() != null) {
			Sam0101Model optional = sam0101dao.getById(sam0101Model.getId());
			if (optional == null) {
				return 0;
			} else {
				sam0101dao.update(sam0101Model);
			}
		} else {
			sam0101dao.insert(sam0101Model);
		}
		return 1;
	}

	@Override
	public Map<Object, Object> getList(Integer page, Integer limit, String category, String topic, String title,
			String date, String columnName, String sortType) throws Exception {

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

		params.put("sortType", "".equals(sortType) ? null : sortType);
		params.put("columnName", ("".equals(columnName) || "null".equals(columnName)) ? null : columnName);

		List<Sam0101Model> list = sam0101dao.getList(params);
		
		for(Sam0101Model model: list) {
			UserResponse userResponse = commonService.getUserInfoByUserUid(model.getCreatedBy());
			model.setCreatedByNm(userResponse.getFullName());
		}
		
		Long count = sam0101dao.count(params);

		Map result = new HashMap();
		result.put("totalElement", count);
		result.put("value", list);
		return result;
	}

	@Override
	public int delete(Long id) throws Exception {
		// TODO Auto-generated method stub
		Sam0101Model optional = sam0101dao.getById(id);
		if (optional == null) {
			return 0;
		} else {
			sam0101dao.deleteById(id);
		}
		return 1;
	}

	@Override
	public List<TccoSTD> getTccoStd(String upCommCd) throws Exception {
		// TODO Auto-generated method stub
		return sam0101dao.getTccoStd(upCommCd);
	}

	@Override
	public TccoSTD getTccoStdByValueConfig(String valueConfig) throws Exception {
		// TODO Auto-generated method stub
		return sam0101dao.getTccoStdByValueConfig(valueConfig);
	}

}
