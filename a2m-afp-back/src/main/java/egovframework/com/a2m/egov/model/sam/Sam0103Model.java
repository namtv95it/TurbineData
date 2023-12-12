/**
 * 
 */
package egovframework.com.a2m.egov.model.sam;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author tiennd
 *
 * @created Mar 2, 2023
 */

@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Sam0103Model implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	private String category;
	private String topic;
	private String title;
	private String content;
	private String createdBy;
	private String createdByNm;
	private String updatedBy;
	private Date createdDate;
	private Date updatedDate;
	private Long numberComment;
}
