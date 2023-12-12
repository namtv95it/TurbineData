package egovframework.com.a2m.egov.model;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author KetHX
 * @created 2/24/2023
 */
@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@ApiModel(description = "Model Role")
public class TsstUserRole implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private String roleId;

	private String userUid;
	
	private String sysUrl;
	
}
