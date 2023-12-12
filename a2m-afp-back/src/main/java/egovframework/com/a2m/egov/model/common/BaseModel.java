package egovframework.com.a2m.egov.model.common;

import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BaseModel {
	private Instant createdDate;
	private String createdBy;
	private Instant updatedDate;
	private String updatedBy;
	private String crudType;
}
