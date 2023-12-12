package egovframework.com.a2m.egov.model.response;

import java.io.Serializable;
import java.time.Instant;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

import egovframework.com.a2m.egov.model.TsstRole;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
/**
 * 
 * @author Nguyen Van Hau
 * @since 2023.03.06
 */
@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@ApiModel(description = "Model user response")
public class UserResponse implements Serializable{
	
	private static final long serialVersionUID = 1L;

	private String userUid;
	private String userId;
	private String pwd;
	private Instant createdDate;
	private String createdBy;
	private Instant pwdExpr;
	private String updatedBy;
	private Instant updatedDate;
	private String status;
	private Long userInfoId;
	private String email;
	private String cellPhone;
	private Instant dob;
	private String fullName;
	private String address;
	private boolean gender;
	private String imgPath;
	private boolean twoFAEnable;
	private String twoFAKey;
	private String organization;
	private String position;
	
	private String imgPathBase64;
	
	private List<TsstRole> roles;
	private String rolesStr;
	private List<MenuRoleInfoResponse> menus;
}
