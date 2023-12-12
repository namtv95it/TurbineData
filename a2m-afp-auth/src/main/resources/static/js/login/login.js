$(document).ready(function() {
	initEvent();
});

function initEvent() {
	$("button#POPUP_OTP_BTN").click(function() {
		$("#myModal").modal('show');
	});
	$('button#LOGIN_BTN').css('cursor', 'pointer').click(login);

	$('input#USERNAME').keyup(function(event) {
		if (event.which === 13) {
			login();
		}
	});
	$('input#PASSWORD').keyup(function(event) {
		if (event.which === 13) {
			login();
		}
	});

	$('a#FORGOT_PASSWORD_BTN').css('cursor', 'pointer').click(handleForgotPassword);

	$('button#FACEBOOK_LOGIN_BTN').click(function() {
		redirectUrl = $('input#REDIRECT_URI').val();
		window.location.href = BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + redirectUrl;
	});

	$('button#GOOGLE_LOGIN_BTN').click(function() {
		redirectUrl = $('input#REDIRECT_URI').val();
		window.location.href = BASE_URL + '/oauth2/authorize/google?redirect_uri=' + redirectUrl;
	});

	$('button#KAKAO_LOGIN_BTN').click(function() {
		redirectUrl = $('input#REDIRECT_URI').val();
		window.location.href = BASE_URL + '/oauth2/authorize/kakao?redirect_uri=' + redirectUrl;
	});

	$('button#NAVER_LOGIN_BTN').click(function() {
		redirectUrl = $('input#REDIRECT_URI').val();
		window.location.href = BASE_URL + '/oauth2/authorize/naver?redirect_uri=' + redirectUrl;
	})


}

function login() {

	Spinner.show();
	if (validation()) {
		ShowToast.error("The username or password is null.");
		Spinner.hide();
		return;
	}
	setTimeout(() => {
		var request = initParam();
		var data = sys.mariaDB.ajax(BASE_URL + '/api/auth/login', JSON.stringify(request), 'POST');
		Spinner.hide();
		if (data.status == "OTP_2FA") {
			open2FAPopup();
		} else if (data.status == "OK") {
			let res = data.result;
			handleRedirect(res.accessToken)
		} else {
			ShowToast.error(data.messages);
		}
	}, 1000);
}

function validation() {
	var request = initParam();
	if (isEmpty(request.username) || isEmpty(request.password)) {
		return true;
	}
	return false;
}

function isEmpty(str) {
	if (str != null && str != undefined && str.trim().length != 0) {
		return false;
	}
	return true;
}

function initParam() {
	var loginRequest = {};
	loginRequest.username = $('input#USERNAME').val();
	loginRequest.password = $('input#PASSWORD').val();
	loginRequest.redirectUri = $('input#REDIRECT_URI').val();
	return loginRequest;
}

function handleVerifyOtp() {
	Spinner.show();
	setTimeout(() => {
		var request = {};
		request.otpCode = $("#OTP_CODE").val();
		request.username = $('input#USERNAME').val();
		request.password = $('input#PASSWORD').val();
		var data = sys.mariaDB.ajax(BASE_URL + '/api/auth/verify-otp', JSON.stringify(request), 'POST');
		Spinner.hide();
		if (data.status == 'OK') {
			$("#OTP_MODAL").modal('hide');
			ShowToast.success("Two factor authentication successfull.");
			redirectUrl(data.result);
		} else {
			ShowToast.error("Verification code is incorrect");
		}
	}, 1000);

}

function open2FAPopup() {
	makeOtpPopup();
	$("#OTP_MODAL").modal('show');
}

function makeOtpPopup() {
	$("#OTP_POPUP").html("");
	var sample = elements.popup.two_factor_authen(null);
	$("#OTP_POPUP").append(sample);
	$('button#VERIFY_OTP_BTN').css('cursor', 'pointer').click(handleVerifyOtp);
}


function handleForgotPassword() {
	makeForgotPasswordPopup();
	$("#FORGOT_PASSWORD_MODAL").modal('show');
}

function makeForgotPasswordPopup() {
	$("#FORGOT_PASSWORD_POPUP").html("");
	var sample = elements.popup.forgot_password(null);

	$("#FORGOT_PASSWORD_POPUP").append(sample);
	$('button#RESET_PASSWORD_BTN').css('cursor', 'pointer').click(handleResetPassword);
}

function handleResetPassword() {
	var request = {};
	request.email = $("#EMAIL").val();
	if (isEmpty(request.email)) {
		ShowToast.error("Email cannot be empty.");
		return;
	}
	$("#FORGOT_PASSWORD_MODAL").modal('hide');
	var params = sys.convertParam(request);
	var data = sys.mariaDB.ajax('/api/auth/mail/resendVerifyCode', params, 'get', true);
	makeVerifyEmail(request.email);
}

function makeVerifyEmail(email) {
	$("#OTP_POPUP").html("");
	var sample = elements.popup.email_verify_opt({ email: email });
	$("#OTP_POPUP").append(sample);
	$('button#EMAIL_VERIFY_OTP_BTN').css('cursor', 'pointer').click(function() {
		Spinner.show();
		setTimeout(() => {
			var request = {};
			request.verificationCode = $("#EMAIL_OTP_CODE").val();
			request.email = email;
			var params = sys.convertParam(request);
			var data = sys.mariaDB.ajax('/api/auth/mail/forgotPassVerifyOtpEmail', params);
			Spinner.hide();
			if (data.status == "TRUE") {

				ShowToast.success("Change password successfully, new password will be sent to your email");
				setTimeout(function() {
					$("#EMAIL_OTP_MODAL").modal('hide');
					window.location.href = "/login";
				}, 2000);

			} else {
				ShowToast.error("The verification code is not correct");

			}
		}, 1000);

	});
	$('a#RESEND_BTN').css('cursor', 'pointer').click(function() {
		var request = {};
		request.email = email;
		var params = sys.convertParam(request);
		var data = sys.mariaDB.ajax('/api/auth/mail/resendVerifyCode', params);
		if (data.status == "TRUE") {
			ShowToast.success("Send success");
		} else {
			ShowToast.error("Send failed");
		}
	});

	$("#EMAIL_OTP_MODAL").modal('show');

}

function handleRedirect(accessToken) {
	let redirectUri = $("#REDIRECT_URI").val();
	window.location.href = redirectUri + '?access_token=' + accessToken;
}