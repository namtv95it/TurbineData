package egovframework.com.a2m.egov.model.request;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonInclude;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
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
@ApiModel(description = "Model role request")
public class TsstRoleRequest  implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@ApiModelProperty(notes = "Role Id")
	private String roleId;
	
	@ApiModelProperty(notes = "Role Name")
	private String roleNm;
	
	@ApiModelProperty(notes = "Role Description")
	private String description;
	
	@ApiModelProperty(notes = "Time of Role has been created")
	private Date createdDate;
	
	@ApiModelProperty(notes = "User's ID has created")
	private String createdBy;
	
	@ApiModelProperty(notes = "Time of Role has been update")
	private Date updatedDate;
	
	@ApiModelProperty(notes = "User's ID has Update")
	private String updatedBy;
	
	@ApiModelProperty(notes = "Status of role to known role is active or inactive")
	private String useYn;
	
	private String state;
	
	
}
