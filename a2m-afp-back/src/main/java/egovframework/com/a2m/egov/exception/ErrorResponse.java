package egovframework.com.a2m.egov.exception;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ErrorResponse {
    private String title;
    private List<String> details;
    private Map<String, String> errorList;
    private Instant timestamp;
    private int statusCode;

    ErrorResponse(String title, int statusCode) {
        this.title = title;
        this.statusCode = statusCode;
        this.timestamp = Instant.now();
    }

    ErrorResponse(String title, List<String> details, int statusCode) {
        this.title = title;
        this.details = details;
        this.statusCode = statusCode;
        this.timestamp = Instant.now();
    }
    ErrorResponse(String title, Map<String, String> errorList, int statusCode) {
        this.title = title;
        this.errorList = errorList;
        this.statusCode = statusCode;
        this.timestamp = Instant.now();
    }

}


