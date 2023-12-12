/**
 * 
 */
package egovframework.com.a2m.egov.model.afp.project;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
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
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProjectSearchDto implements Serializable {
	private static final long serialVersionUID = 254L;
	private String userUid;
	private String keySearch;
	private String typeSearch;
}
