package egovframework.com.a2m.egov.model.afp.doc;

import javax.validation.constraints.NotNull;

import egovframework.com.a2m.egov.model.common.BaseModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AfpMenuRequest extends BaseModel{
	private Long id;
	@NotNull
	private String name;
	@NotNull
	private String nameKr;
	private Integer lev;
	private Integer orderNo;
	private String url;
	private String tsstMenuId;
	private Long menuParentId;
}
