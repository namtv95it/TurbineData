/**
 * 
 */
package egovframework.com.a2m.egov.model.afp.ann;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonInclude;

import egovframework.com.a2m.egov.model.common.BaseModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author ThanhNV
 *
 * @created Apr 19, 2023
 */

@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AnnounModel extends BaseModel implements Serializable {
	private static final long serialVersionUID = 253L;
	private Long id;
	private String title;
	private String description;
	private String isBookmark;
	private String isLike;
	
	private String createdByNm;
	private String updatedByNm;
	
	private Long viewNumber;
	private Long likeNumber;
	private Long commentNumber;
	private String imageUrl;
}
