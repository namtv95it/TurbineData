package egovframework.a2m.egov.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
* 
* @author Nguyen Van Hau
* @since 2023. 2. 21.
* @version 1
*/

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BadRequestException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public BadRequestException(String message) {
        super(message);
    }
}
