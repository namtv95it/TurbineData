package egovframework.com.a2m.egov.model.request;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


/**
 * @author KetHX
 * @created 2/23/2023
 */
@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@ApiModel(description = "Model role user")
public class TsstUserRoleRequest  implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private String roleId;
	
	private String userUid;
	
	private boolean touch;
	
	private boolean checked;
	
	private String sysUrl;

	
}