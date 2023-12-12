package egovframework.com.a2m.egov.model.request;

import java.io.Serializable;
import java.util.Date;

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
@ApiModel(description = "Model user request")
public class TsstUserRequest implements Serializable {
	private static final long serialVersionUID = 1L;

	private String userUid;
	private String userId;
	private String password;
	private String userInfoId;
	private String userType;
	private String status;
	private String createdBy;
	private Date createdDate;
	private String updatedBy;
	private Date updatedDate;

	private String newPwd;
	private String oldPwd;

	private String newPwdUpdate;
	private String oldPwdUpdate;

	private boolean changePwd;
	
	
}
