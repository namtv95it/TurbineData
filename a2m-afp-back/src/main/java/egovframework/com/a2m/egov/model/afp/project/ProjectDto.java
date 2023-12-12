/**
 *
 */
package egovframework.com.a2m.egov.model.afp.project;

import java.io.Serializable;
import java.util.Date;
import javax.validation.constraints.NotEmpty;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author tiennd
 *
 * @created Apr 18, 2023
 */

@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProjectDto implements Serializable {
	private static final long serialVersionUID = 253L;
	private Long id;
	@NotEmpty
	private String title;
	@NotEmpty
	private String description;
	@NotEmpty
	private String projectType;
	private String uri;
	private Long viewNumber;
	private String isBookmark;
	private String crud;
	private String postType;
	private String createdBy;
	private String createdByNm;
	private String updatedBy;
	private String updatedByNm;
	private String imageUrl;
	private Date createdDate;
	private Date updatedDate;
}
