package egovframework.com.a2m.egov.model.request;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonInclude;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author KetHX
 * @created 2/24/2023
 */
@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@ApiModel(description = "Model Role Menu")
public class TsstRoleMenuRequest implements Serializable {

	private static final long serialVersionUID = 1L;

	private String roleId;
	private String menuId;
	private String readYn;
	private String wrtYn;
	private String modYn;
	private String delYn;
	private String pntYn;
	private String excDnYn;
	private String mngYn;
	private String createdBy;
	private Date createdDate;
	

}
