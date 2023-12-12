package egovframework.a2m.egov.model.request;

import java.io.Serializable;
import java.time.Instant;
import java.util.Date;
import java.util.List;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SignUpRequest implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private String userUid;
	@NotNull
	private String userId;
	@NotNull
	private String pwd;
	private String hashPwd;
	private String confirmPassword;
	private Instant createdDate;
	private String createdBy;
	private Date pwdExpr;
	private String updatedBy;
	private Instant updatedDate;
	private String status;
	private Long userInfoId;
	@NotNull
//	@Email
	private String email;
	private String cellPhone;
	private Instant dob;
	@NotNull
	private String fullName;
	private String address;
	private boolean gender;
	private String imgPath;
	private boolean twoFAEnable;
	private String twoFAKey;
	private List<String> roles;
	private String authProvider;
	private String sysUrl;
	private String emailVerifyKey;
	private String organization;
	
}
