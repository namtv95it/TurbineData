/**
 * 
 */
package egovframework.com.a2m.egov.model.afp.com;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

import egovframework.com.a2m.egov.model.common.ParamSearchModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author ThanhNV
 *
 * 22 thg 5, 2023
 */

@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AppCommentRequest extends ParamSearchModel{

	private Long postId; 
	private Long commentParentId;
	private Long offset;
	private String userUid;
	private Long differrence;
	private Boolean isGetAll;
	
	public AppCommentRequest(Long postId) {
		this.postId = postId;
	}
}
