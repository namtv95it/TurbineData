package egovframework.com.a2m.egov.model.afp;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author tiennd
 *
 * @created May 19, 2023
 */

@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DashboardDto implements Serializable {
	private static final long serialVersionUID = 255L;
	private String id;
	private String title;
	private String description;
	private String postType;
	private Integer numberLike;
	private Date createdDate;
	private String content;
	private String commentId;
	private String menuId;
	private String tsstMenuId;
}

