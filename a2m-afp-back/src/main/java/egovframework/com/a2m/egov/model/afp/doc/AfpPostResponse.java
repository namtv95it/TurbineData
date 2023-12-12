package egovframework.com.a2m.egov.model.afp.doc;

import egovframework.com.a2m.egov.model.common.BaseModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AfpPostResponse extends BaseModel{
	private Long id;
	private String description;
	private String title;
	private Long afpMenuId;
	private String commCdPostTypeId;
	private int viewNumber;
	private boolean bookmarked;
}
