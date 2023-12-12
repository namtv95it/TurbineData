package egovframework.com.a2m.egov.model;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonInclude;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author KetHX
 * @created 2/22/2023
 */
@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@ApiModel(description = "Model User info")
public class TsstUserInfo implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private Long userInfoId;
	private String address;
	private String cellPhone;
	private Date dob;
	private String email;
	private String emailVerifyKey;
	private String fullName;
	private String gender;
	private String imgPath;
	private String organization;
	
	private String twoFAEnable;
	private String twoFAKey;
	
	private String userId;
	
	
}