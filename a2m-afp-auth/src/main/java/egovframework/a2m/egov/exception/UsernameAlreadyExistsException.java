package egovframework.a2m.egov.exception;

/**
* 
* @author Nguyen Van Hau
* @since 2023. 2. 21.
* @version 1
*/

public class UsernameAlreadyExistsException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public UsernameAlreadyExistsException(String message) {
        super(message);
    }
}