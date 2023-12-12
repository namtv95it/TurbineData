package egovframework.com.a2m.egov.model.afp.doc;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AfpMenuResponse {
	
	private String id;
	private String name;
	private String nameKr;
	private Integer lev;
	private Integer orderNo;
	private String url;
	private String tsstMenuId;
	private String menuParentId;
	private boolean deleted;
	private List<AfpMenuResponse> children;
}
