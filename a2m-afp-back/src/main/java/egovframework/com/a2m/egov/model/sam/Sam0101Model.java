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
 * @created Feb 28, 2023
 */

@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Sam0101Model implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	private String category;
	private String topic;
	private String title;
	private String email;
	private String phone;
	private Date date;
	private String content;
	private Boolean checkbox;
	private Boolean switchInput;
	private String status;
	private String createdBy;
	private String createdByNm;
	private String updatedBy;
	private Date createdDate;
	private Date updatedDate;
	private Date fromDate;
	private Date toDate;
}
