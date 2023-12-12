package egovframework.com.a2m.egov.model.afp.threads;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;

import egovframework.com.a2m.egov.model.common.BaseModel;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author kethx
 *
 * @created Apr 18, 2023
 */
@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@ApiModel(description = "Threads Model")
public class ThreadsModel extends BaseModel implements Serializable {
	
	private static final long serialVersionUID = 253L;
	
	@ApiModelProperty(notes = "Threads's ID")
	private Long id;
	
	@ApiModelProperty(notes = "Title threads")
    private String title;
    
	@ApiModelProperty(notes = "")
    private String menuId;
    
	@ApiModelProperty(notes = "Type's post")
    private String postType;
    
	@ApiModelProperty(notes = "")
    private Long viewNumber;
    
    @ApiModelProperty(notes = "Description")
    private String description;
    
    @ApiModelProperty(notes = "Name User's ID has created")
    private String createdByNm;
    
    @ApiModelProperty(notes = "Name User's ID has update")
	private String updatedByNm;

    @ApiModelProperty(notes = "")
    private String commentId;

    @ApiModelProperty(notes = "")
    private String tsstMenuId;

    private String imageUrl;

    private Long likeNumber;

    private String isBookmark;

    private String isLike;

    private Long postId;
}
