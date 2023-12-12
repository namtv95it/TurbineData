package egovframework.a2m.egov.model.request;

import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VerifyOtpRequest {
	@NotNull
	private String username;
	@NotNull
	private String password;
	@NotNull
	private String otpCode;
	private String redirectUri;
}
