package egovframework.com.a2m.egov.model;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonInclude;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
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
@ApiModel(description = "Model User")
public class UserModel implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@ApiModelProperty(notes = "User's UID")
	private String userUid;
	
	@ApiModelProperty(notes = "User's ID")
	private String userId;
	
	@ApiModelProperty(notes = "Password")
	private String password;
	
	@ApiModelProperty(notes = "User's INFOID")
	private Long userInfoId;
	
	@ApiModelProperty(notes = "Type of User")
	private String userType;
	
	@ApiModelProperty(notes = "Status of User is active or deactive or lock")
	private String status;
	
	@ApiModelProperty(notes = "User's ID has created")
	private String createdBy;
	
    @ApiModelProperty(notes = "Time of User has been created")
	private Date createdDate;
    
    @ApiModelProperty(notes = "User's ID has update")
	private String updatedBy;
    
    @ApiModelProperty(notes = "Time of User has been created")
	private Date updatedDate;

	private String newPwd;
	private String oldPwd;

	private String newPwdUpdate;
	private String oldPwdUpdate;

	private boolean changePwd;
	
	private String matchPassword;
	
	@ApiModelProperty(notes = "Address User")
	private String address;
	
	@ApiModelProperty(notes = "Cellphone User")
	private String cellPhone;
	
	@ApiModelProperty(notes = "Date of birth User")
	private Date dob;
	
	@ApiModelProperty(notes = "Email User")
	private String email;
	
	private String emailVerifyKey;
	
	@ApiModelProperty(notes = "Full Name User")
	private String fullName;
	
	@ApiModelProperty(notes = "Gender User is male or female")
	private Boolean gender;
	
	@ApiModelProperty(notes = "Url Image User")
	private String imgPath;
	
	@ApiModelProperty(notes = "Organization User")
	private String organization;

	@ApiModelProperty(notes = "Position User")
	private String position;
	
	private Boolean twoFAEnable;
	private String twoFAKey;
	
	private Date pwdExpr;
	private String authProvider;
	
}