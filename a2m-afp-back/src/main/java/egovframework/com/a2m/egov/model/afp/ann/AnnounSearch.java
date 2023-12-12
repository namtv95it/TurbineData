/**
 * 
 */
package egovframework.com.a2m.egov.model.afp.ann;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;

import egovframework.com.a2m.egov.model.common.ParamSearchModel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * @author ThanhNV
 *
 * 19 thg 4, 2023
 */

@Getter
@Setter
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AnnounSearch extends ParamSearchModel implements Serializable {
	private static final long serialVersionUID = 254L;
	private String userUid;

	public AnnounSearch(String keySearch){
		this.setKeySearch(keySearch);
	}
}
