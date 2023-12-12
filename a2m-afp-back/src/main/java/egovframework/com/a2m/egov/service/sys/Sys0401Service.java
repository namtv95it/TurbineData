package egovframework.com.a2m.egov.service.sys;

import egovframework.com.a2m.egov.model.TccoSTD;

import java.util.List;
import java.util.Map;

/**
 * @author Nguyen Trung Anh
 * @created 2/23/2023
 */
public interface Sys0401Service {

    List<TccoSTD> searchCommCd(Map<Object,Object> param) throws Exception;

    int insertCommCd(TccoSTD tccoSTD) throws Exception;

    int updateCommCd(TccoSTD tccoSTD) throws Exception;

    int deleteCommCd(String commCd) throws Exception;

    TccoSTD getCommCdById(String commCd) throws Exception;
}
