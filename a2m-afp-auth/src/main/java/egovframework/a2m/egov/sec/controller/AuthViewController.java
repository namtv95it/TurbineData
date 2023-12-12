package egovframework.a2m.egov.sec.controller;

import java.io.IOException;
import java.util.Optional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import egovframework.a2m.egov.sec.jwt.JwtRsaUtils;
import egovframework.a2m.egov.service.common.CommonService;
import egovframework.a2m.egov.util.RSAUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import egovframework.a2m.egov.constants.CommonConstants;
import egovframework.a2m.egov.constants.SecurityConstants;
import egovframework.a2m.egov.util.CookieUtil;

/**
* 
* @author Nguyen Van Hau
* @since 2023. 2. 22.
* @version 1
*/

@Controller
public class AuthViewController {
	
	@Autowired
	private JwtRsaUtils jwtRsaUtil;

	@Autowired
	CommonService commonService;
	
	@RequestMapping(value = "login")
	public String loginUsrView(@RequestParam("redirect_uri")String redirectUri, HttpServletRequest request, Model model, HttpServletResponse response) throws IOException {
		String preAction = request.getParameter("pre_action");
		if(preAction != null && CommonConstants.LOGOUT_PRE_ACTION.equals(preAction)) {
			CookieUtil.deleteCookie(request, response, SecurityConstants.ACCESS_TOKEN_KEY);
		}
		
		String accessToken = getValueFormCookie(request, SecurityConstants.ACCESS_TOKEN_KEY);
        String publicKey = RSAUtil.getPublicKey();
		if (jwtRsaUtil.validateJwtToken(accessToken, publicKey)) {
			String url = redirectUri + "?" + SecurityConstants.ACCESS_TOKEN_KEY + "=" + accessToken;
			return "redirect:" + url;
		} else {
			model.addAttribute(SecurityConstants.REDIRECT_URI_KEY, redirectUri);
	        CookieUtil.addCookie(response, SecurityConstants.REDIRECT_URI_KEY, redirectUri);
	        return "html/login";
		}
	}

	@RequestMapping(value = "sign-up")
	public String signUp(@RequestParam("redirect_uri")String redirectUri, HttpServletRequest request, Model model) {
		model.addAttribute(SecurityConstants.REDIRECT_URI_KEY, redirectUri);
		return "html/sign-up";
	}
	
	private String getValueFormCookie(HttpServletRequest request, String name) {
		Optional<Cookie> cookie = CookieUtil.getCookie(request, name);
		if (cookie.isEmpty()) {
			return StringUtils.EMPTY;
		}
		return cookie.get().getValue();
	}
}
