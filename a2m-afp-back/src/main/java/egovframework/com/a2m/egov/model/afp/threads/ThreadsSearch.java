package egovframework.com.a2m.egov.model.afp.threads;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;

import egovframework.com.a2m.egov.model.common.ParamSearchModel;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author kethx
 *
 * @created Apr 18, 2023
 */
@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@ApiModel(description = "Threads Search")
public class ThreadsSearch extends ParamSearchModel implements Serializable{
	
	private static final long serialVersionUID = 254L;
	private String userUid;

	public ThreadsSearch(String userUid, String keySearch, String typeSearch){
		this.setUserUid(userUid);
		this.setKeySearch(keySearch);
		this.setTypeSearch(typeSearch);
	}
	
}
