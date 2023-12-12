package egovframework.com.a2m.egov.exception;

public class MenuAccessDeniedException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public MenuAccessDeniedException(String message) {
		super(message);
	}
}
