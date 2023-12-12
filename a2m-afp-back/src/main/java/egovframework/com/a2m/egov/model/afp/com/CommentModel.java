/**
 * 
 */
package egovframework.com.a2m.egov.model.afp.com;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;

import egovframework.com.a2m.egov.model.common.BaseModel;
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
public class CommentModel extends BaseModel implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private String content;
	private Long commentParentId;
	private Long postId;
	
	private String createdByNm;
	private String imageUrl;
	
	private String isLike;
	private String isBookmark;
	private Long likeNumber;
}
