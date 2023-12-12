package egovframework.a2m.egov.model.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AjaxResult {
	private String message;
	private boolean status;
	private Object responseData;
}
