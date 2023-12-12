package egovframework.com.a2m.egov.service.sys.impl;

import egovframework.com.a2m.egov.dao.sys.Sys0401DAO;
import egovframework.com.a2m.egov.model.TccoSTD;
import egovframework.com.a2m.egov.service.common.CommonService;
import egovframework.com.a2m.egov.service.sys.Sys0401Service;
import org.apache.commons.lang3.StringUtils;
import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.DecimalFormat;
import java.util.List;
import java.util.Map;

/**
 * @author Nguyen Trung Anh
 * @created 2/23/2023
 */
@Service
public class Sys0401ServiceImpl extends EgovAbstractServiceImpl implements Sys0401Service {

    private DecimalFormat myFormatter = new DecimalFormat("00");
    @Resource
    Sys0401DAO sys0401DAO;

    @Autowired
    CommonService commonService;


    @Override
    public List<TccoSTD> searchCommCd(Map<Object, Object> param) throws Exception {

        return sys0401DAO.searchCommCd(param);
    }

    @Override
    public int insertCommCd(TccoSTD tccoSTD) throws Exception {
        String commCd = getCommCd(tccoSTD);
        tccoSTD.setCommCd(commCd);
        tccoSTD.setCreatedBy(commonService.getUserUid());

        /** if this new comm code don't have parent code, its lev = 1 else its lev = lev of parent code + 1 */
        if(!StringUtils.isNotEmpty(tccoSTD.getUpCommCd())){
            tccoSTD.setLev(1);
            tccoSTD.setUpCommCd(null);
        }else{
            TccoSTD parentCode = sys0401DAO.getCommCdByID(tccoSTD.getUpCommCd());
            tccoSTD.setLev(parentCode.getLev() + 1);
        }

        return sys0401DAO.addCommCd(tccoSTD);
    }

    //	this func to get position of number in maxchildrenId
    int getPosToGenChild(String upCommCode){
        int pos = 0;
        for (int i = 0; i < upCommCode.length(); i++) {
            if(upCommCode.charAt(i) == '-'){
                    pos = i +1;
            }
        }
        return pos;
    }

    @Override
    public int updateCommCd(TccoSTD tccoSTD) throws Exception {
        return sys0401DAO.updateCommCd(tccoSTD);
    }

    @Override
    public int deleteCommCd(String commCd) throws Exception {
        return sys0401DAO.deleteCommCd(commCd);
    }

    @Override
    public TccoSTD getCommCdById(String commCd) throws Exception {
        return sys0401DAO.getCommCdByID(commCd);
    }


    private String getCommCd(TccoSTD tccoSTD) throws Exception {
        String upCommCd = tccoSTD.getUpCommCd();
        String commCd = "";
        if(StringUtils.isNotEmpty(upCommCd)){
            int numOfChild = sys0401DAO.getNumChildrenOfCommCd(upCommCd);
            if(numOfChild == 0){
                commCd = upCommCd + "-01";
            }else{
                String maxChild = sys0401DAO.getMaxCommCd(upCommCd);
                int numberEndID = Integer.parseInt(maxChild.substring(getPosToGenChild(maxChild), maxChild.length())) + 1;
                commCd = upCommCd + "-" + myFormatter.format(numberEndID);
            }
        }else{
            String maxCommCd = sys0401DAO.getMaxCommCd(null);
            if(StringUtils.isNotEmpty(maxCommCd)){
                commCd = myFormatter.format(Integer.parseInt(maxCommCd.substring(1, 2)) + 1);
            }else {
                commCd = "01";
            }
        }
        return commCd;
    }
}
