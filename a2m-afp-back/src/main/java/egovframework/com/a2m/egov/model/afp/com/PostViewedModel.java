/**
 * 
 */
package egovframework.com.a2m.egov.model.afp.com;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author ThanhNV
 *
 * 16 thg 5, 2023
 */

@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PostViewedModel {
	private String viewedBy;
	private Long postId;
}
