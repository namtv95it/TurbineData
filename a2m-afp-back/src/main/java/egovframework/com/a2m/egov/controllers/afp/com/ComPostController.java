/**
 * 
 */
package egovframework.com.a2m.egov.controllers.afp.com;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import egovframework.com.a2m.egov.model.afp.bookmark.BookmarkModel;
import egovframework.com.a2m.egov.model.afp.com.AppCommentModel;
import egovframework.com.a2m.egov.model.afp.com.AppCommentRequest;
import egovframework.com.a2m.egov.model.afp.com.CommentModel;
import egovframework.com.a2m.egov.model.afp.com.DocumentPostInfo;
import egovframework.com.a2m.egov.model.afp.com.LikeModel;
import egovframework.com.a2m.egov.model.response.AjaxResult;
import egovframework.com.a2m.egov.service.afp.com.IComPostService;
import egovframework.com.a2m.egov.service.common.CommonService;

/**
 * @author ThanhNV
 *
 * 24 thg 4, 2023
 */

@RestController
@RequestMapping("api/common-post")
public class ComPostController {

	@Autowired
	private IComPostService service;

	@Autowired
	private CommonService commonService;
	
	@GetMapping("search-bookmark.exclude")
	public AjaxResult searchBookmark(@RequestParam String keySearch, @RequestParam String postType) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			List<BookmarkModel> list = service.searchBookmark(keySearch, postType);
			ajaxResult.setResponseData(list);
			ajaxResult.setStatus(true);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			ajaxResult.setMessage("Search announcement fail !!!");
			ajaxResult.setStatus(false);
		}
		return ajaxResult;
	}

	
	@PostMapping("bookmark.exclude")
	public ResponseEntity<AjaxResult> bookmark(@RequestBody BookmarkModel bookmarkModel) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			int result = service.bookmark(bookmarkModel);
			if (result == 0) {
				ajaxResult.setStatus(false);
				ajaxResult.setMessage("Save failed");
			} else {
				ajaxResult.setMessage("Save successful");
				ajaxResult.setStatus(true);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			ajaxResult.setMessage("Save fail !!!");
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}
	
	@PostMapping("like.exclude")
	public ResponseEntity<AjaxResult> like(@RequestBody LikeModel model) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			int result = service.like(model);
			if (result == 0) {
				ajaxResult.setStatus(false);
				ajaxResult.setMessage("Save failed");
			} else {
				ajaxResult.setMessage("Save successful");
				ajaxResult.setStatus(true);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			ajaxResult.setMessage("Save fail !!!");
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}
	
	@PostMapping("comment.exclude")
	public ResponseEntity<AjaxResult> comment(@RequestBody CommentModel model) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			CommentModel result = service.comment(model);
			if (result == null) {
				ajaxResult.setStatus(false);
				ajaxResult.setMessage("Save failed");
			} else {
				ajaxResult.setResponseData(result);
				ajaxResult.setMessage("Save successful");
				ajaxResult.setStatus(true);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			ajaxResult.setMessage("Save fail !!!");
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}
	
	@DeleteMapping("{id}/deleteComment.exclude")
	public ResponseEntity<AjaxResult> deleteComment(@PathVariable Long id) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			int result = service.deleteComment(id);
			if (result == 0) {
				ajaxResult.setStatus(false);
				ajaxResult.setMessage("Delete failed");
			} else {
				ajaxResult.setMessage("Delete successful");
				ajaxResult.setStatus(true);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			ajaxResult.setMessage("Delete fail !!!");
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}
	
	@GetMapping("searchComment.exclude")
	public AjaxResult getListComment(@RequestParam Long postId) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			List<CommentModel> list = service.getListComment( new AppCommentRequest(postId)   );

			ajaxResult.setResponseData(list);
			ajaxResult.setStatus(true);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			ajaxResult.setMessage("Search announcement fail !!!");
			ajaxResult.setStatus(false);
		}
		return ajaxResult; 
	}
	
	@GetMapping("getAppCommentData.exclude")
	public AjaxResult getAppCommentData(AppCommentRequest request) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			AppCommentModel data = service.getAppCommentData( request );
			
			ajaxResult.setResponseData(data);
			ajaxResult.setStatus(true);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
			ajaxResult.setMessage("Search announcement fail !!!");
			ajaxResult.setStatus(false);
		}
		return ajaxResult; 
	}
	
	@PostMapping("{postId}/viewed.exclude")
	public ResponseEntity<AjaxResult> viewed(@PathVariable Long postId) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			int result = service.viewed(postId);
			if (result == 0) {
				ajaxResult.setStatus(false);
				ajaxResult.setMessage("Save failed");
			} else {
				ajaxResult.setMessage("Save successful");
				ajaxResult.setStatus(true);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			ajaxResult.setMessage("Save fail !!!");
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}
	
	@GetMapping("{postId}/increasePostView.exclude")
	public ResponseEntity<AjaxResult> increasePostView(@PathVariable Long postId) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			int result = service.increasePostView(postId);
			if (result == 0) {
				ajaxResult.setStatus(false);
				ajaxResult.setMessage("Save failed");
			} else {
				ajaxResult.setMessage("Save successful");
				ajaxResult.setStatus(true);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			ajaxResult.setMessage("Save fail !!!");
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}
	
	@GetMapping(value = "getDocumentPostInfo")
	public ResponseEntity<?> getDocumentPostInfo(@RequestParam Long postId) {
		AjaxResult ajaxResult = new AjaxResult();
		try {
			DocumentPostInfo result = service.getDocumentPostInfo(postId);
			ajaxResult.setStatus(true);
			ajaxResult.setResponseData(result);
		} catch (Exception e) {
			e.printStackTrace();
			ajaxResult.setStatus(false);
		}
		return ResponseEntity.ok(ajaxResult);
	}
}
