package egovframework.a2m.egov.model.request;

import java.io.Serializable;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest implements Serializable {
	
	private static final long serialVersionUID = 1L;

	private String userUid;
	private String userId;
	private String password;
	private Long userInfoId;
	private String userType;
	private String status;
	private String createdBy;
	private Date createdDate;
	private String updatedBy;
	private Date updatedDate;

	private String newPwd;
	private String oldPwd;

	private boolean changePwd;
	
	private String address;
	private String cellPhone;
	private Date dob;
	private String email;
	private String emailVerifyKey;
	private String fullName;
	private Boolean gender;
	private String imgPath;
	private String organization;
	private String position;
	
	private Boolean twoFAEnable;
	private String twoFAKey;
	
	private Date pwdExpr;
	
	private String matchPassword;
	
	private String authProvider;
}
