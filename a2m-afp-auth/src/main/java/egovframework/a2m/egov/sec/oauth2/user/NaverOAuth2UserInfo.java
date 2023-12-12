package egovframework.a2m.egov.sec.oauth2.user;

import java.util.HashMap;
import java.util.Map;

public class NaverOAuth2UserInfo extends OAuth2UserInfo{
	
	Map<String, Object> response = new HashMap<>();

	public NaverOAuth2UserInfo(Map<String, Object> attributes) {
		super(attributes);
		response = (Map<String, Object>) attributes.get("response");
	}

	@Override
	public String getId() {
		return (String) this.response.get("id");
	}

	@Override
	public String getName() {
		return (String) this.response.get("nickname");
	}

	@Override
	public String getEmail() {
		return (String) this.response.get("email");
	}

	@Override
	public String getImageUrl() {
		// TODO Auto-generated method stub
		return null;
	}

}
