package egovframework.a2m.egov.model.response;

import java.io.Serializable;
import java.time.Instant;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private String userUid;
	private String userId;
	@JsonIgnore
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
	@JsonIgnore
	private String twoFAKey;
	@JsonIgnore
	private String emailVerifyKey;
	
	private List<String> roles;
	
	private String authProvider;
	
	private String organization;

	private String position;
}
