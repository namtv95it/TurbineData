package egovframework.com.a2m.egov.model;

import java.io.Serializable;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonInclude;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import personal.aug.convert.MapAndObjectConversion;
import personal.aug.convert.annotations.MapKey;

/**
 * @author KetHX
 */
@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
@ApiModel(description = "Model File")
public class TccoFile extends MapAndObjectConversion implements Serializable {

	private static final long serialVersionUID = 1L;

	@MapKey("ATCH_FLE_SEQ")
	private String atchFleSeq;

	@MapKey("FLE_KEY")
	private String fleKey;

	@MapKey("FLE_TP")
	private String fleTp;

	@MapKey("FLE_PATH")
	private String flePath;

	@MapKey("FLE_NM")
	private String fleNm;

	@MapKey("NEW_FLE_NM")
	private String newFleNm;

	@MapKey("FLE_SZ")
	private String fleSz;

	@MapKey("CREATED_BY")
	private String createdBy;

	@MapKey("CREATED_DATE")
	private Date createdDate;

	@MapKey("UPDATED_BY")
	private String updatedBy;

	@MapKey("UPDATED_DATE")
	private Date updatedDate;

	private String createdDateStr;

	private String updatedDateStr;

}
