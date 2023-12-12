package egovframework.com.a2m.egov.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DownloadBackendRequest {
	private List<String> dependencies;
	private String databaseType;
	private String projectName;
}
