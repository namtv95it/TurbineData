package egovframework.com.a2m.egov.model.afp.com;

import egovframework.com.a2m.egov.model.common.BaseModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DocumentPostInfo extends BaseModel{
	
	private Long id;
	private String title;
	private String description;
	private Long afpMenuId;
	private Long viewNumber;
	private String commCdPostTypeId;
	private String tsstMenuId;
	private String url;
	
}
