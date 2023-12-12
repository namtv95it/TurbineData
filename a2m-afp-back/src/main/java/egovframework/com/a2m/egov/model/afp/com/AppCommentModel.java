/**
 * 
 */
package egovframework.com.a2m.egov.model.afp.com;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author ThanhNV
 *
 * 19 thg 5, 2023
 */

@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AppCommentModel {
	List<CommentModel> listComment = new ArrayList<>();
	PostModel postModel = new PostModel();
	Long totalComment;
}
