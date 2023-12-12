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
 * 24 thg 4, 2023
 */

@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LikeModel extends BaseModel implements Serializable{
	private static final long serialVersionUID = 1L;
	
	private Long id;
	private Long commentId;
	private Long postId;	
	private String isLike;
}
