/**
 * 
 */
package egovframework.com.a2m.egov.model;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author tiennd
 *
 * @created Feb 27, 2023
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TsstMenuMap implements Serializable {
	private static final long serialVersionUID = 1657586811061188900L;
	private String menuId;
	private String description;
	private int lev;
	private String menuNm;
	private String menuNmEn;
	private String menuNmVi;
	private String menuType;
	private int ordNo;
	private String url;
	private String useYn;
	private String tsstParrentMenuId;
	private List<TsstMenuMap> tsstMenuDtos;
	private String createdBy;
	private Date createdDate;
	private Date updatedDate;
	private String updatedBy;
}
