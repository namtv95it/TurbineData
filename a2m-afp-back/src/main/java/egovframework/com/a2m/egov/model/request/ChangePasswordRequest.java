package egovframework.com.a2m.egov.model.request;

import java.util.Date;

import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChangePasswordRequest {
	@NotNull
	private String userUid;
	@NotNull
	private String oldPwd;
	@NotNull
	private String newPwd;
	@NotNull
	private String confirmNewPwd;
	@NotNull
	private String hashPwd;
	private Date updatedDate;
	private String updatedBy;
	private Date pwdExpr;
}	
