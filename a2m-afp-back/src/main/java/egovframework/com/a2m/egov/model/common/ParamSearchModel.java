package egovframework.com.a2m.egov.model.common;

import lombok.Data;

@Data
public class ParamSearchModel {
	private Integer page;
	private Integer rows;
	private Integer size;
	private String keySearch;
	private String typeSearch;
}
