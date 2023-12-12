package egovframework.a2m.egov.exception;

import org.springframework.security.core.AuthenticationException;

/**
* 
* @author Nguyen Van Hau
* @since 2023. 2. 27.
* @version 1
*/

public class OAuth2AuthenticationProcessingException extends AuthenticationException {
	
	private static final long serialVersionUID = 1L;

	public OAuth2AuthenticationProcessingException(String msg, Throwable t) {
        super(msg, t);
    }

    public OAuth2AuthenticationProcessingException(String msg) {
        super(msg);
    }
}
