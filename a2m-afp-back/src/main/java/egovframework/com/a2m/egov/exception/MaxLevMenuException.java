package egovframework.com.a2m.egov.exception;

/**
 * @author Nguyen Trung Anh
 * @created 3/6/2023
 */
public class MaxLevMenuException extends RuntimeException{
    private static final long serialVersionUID = 1L;
    public MaxLevMenuException(String message){
        super(message);
    }
}
