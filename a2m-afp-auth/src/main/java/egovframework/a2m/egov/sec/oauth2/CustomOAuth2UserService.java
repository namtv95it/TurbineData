package egovframework.a2m.egov.sec.oauth2;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import egovframework.a2m.egov.constants.RoleConstants;
import egovframework.a2m.egov.exception.OAuth2AuthenticationProcessingException;
import egovframework.a2m.egov.model.request.SignUpRequest;
import egovframework.a2m.egov.model.response.UserResponse;
import egovframework.a2m.egov.sec.UserPrincipal;
import egovframework.a2m.egov.sec.oauth2.user.OAuth2UserInfo;
import egovframework.a2m.egov.sec.oauth2.user.OAuth2UserInfoFactory;
import egovframework.a2m.egov.service.UserService;
import egovframework.a2m.egov.util.CommonUtil;

/**
* 
* @author Nguyen Van Hau
* @since 2023. 2. 27.
* @version 1
*/

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService{
	
	@Autowired
	private UserService userService;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);

        try {
            return processOAuth2User(oAuth2UserRequest, oAuth2User);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) throws SQLException {
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(oAuth2UserRequest.getClientRegistration().getRegistrationId(), oAuth2User.getAttributes());
        if(StringUtils.isEmpty(oAuth2UserInfo.getEmail())) {
            throw new OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider");
        }
        
        UserResponse user = userService.getUserInfoByEmail(oAuth2UserInfo.getEmail());
        
        if(user != null) {
//            if(!user.getProvider().equals(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()))) {
//                throw new OAuth2AuthenticationProcessingException("Looks like you're signed up with " +
//                        user.getProvider() + " account. Please use your " + user.getProvider() +
//                        " account to login.");
//            }
//            user = updateExistingUser(user, oAuth2UserInfo);
        } else {
            user = registerNewUser(oAuth2UserRequest, oAuth2UserInfo);
        }

        return UserPrincipal.create(user, oAuth2User.getAttributes());
    }

    private UserResponse registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) throws SQLException {
    	SignUpRequest signUpRequest = new SignUpRequest();

    	List<String> roles = new ArrayList<>();
    	roles.add(RoleConstants.DEFAULT_ROLE_3RD_PARTY.getValue());
    	
    	signUpRequest.setFullName(oAuth2UserInfo.getName());
    	signUpRequest.setEmail(oAuth2UserInfo.getEmail());
    	signUpRequest.setImgPath(oAuth2UserInfo.getImageUrl());
    	signUpRequest.setPwd(CommonUtil.generatePassword(8));
    	signUpRequest.setRoles(roles);
    	signUpRequest.setUserId(oAuth2UserInfo.getId());
    	signUpRequest.setAuthProvider(oAuth2UserRequest.getClientRegistration().getRegistrationId().toUpperCase());
        userService.saveUserFor3rd(signUpRequest);
        
        UserResponse userRes = userService.getUserInfoByUserId(oAuth2UserInfo.getId());
        return userRes;
    }

//    private UserResponse updateExistingUser(User existingUser, OAuth2UserInfo oAuth2UserInfo) {
//        existingUser.setName(oAuth2UserInfo.getName());
//        existingUser.setImageUrl(oAuth2UserInfo.getImageUrl());
//        return userRepository.save(existingUser);
//    }
}
