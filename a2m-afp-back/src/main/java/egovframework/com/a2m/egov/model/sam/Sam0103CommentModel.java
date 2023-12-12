package egovframework.com.a2m.egov.model.sam;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * @author tiennd
 *
 * @created Feb 28, 2023
 */

@JsonInclude(JsonInclude.Include.NON_NULL)
public class Sam0103CommentModel implements Serializable {
	
	private static final long serialVersionUID = 1097038500L;
	private Long id;
	private Long postId;
	private String content;
	private Date createdDate;
	private String createdBy;
	private Sam0103CommentModel commentParent;
	private List<Sam0103CommentModel> listCommentChild;
	
	public Sam0103CommentModel() {
		super();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getPostId() {
		return postId;
	}

	public void setPostId(Long postId) {
		this.postId = postId;
	}

	public Sam0103CommentModel getCommentParent() {
		return commentParent;
	}

	public void setCommentParent(Sam0103CommentModel comment) {
		this.commentParent = comment;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public List<Sam0103CommentModel> getListCommentChild() {
		return listCommentChild;
	}

	public void setListCommentChild(List<Sam0103CommentModel> listCommentChild) {
		this.listCommentChild = listCommentChild;
	}
}
