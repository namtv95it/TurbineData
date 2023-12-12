/**
 * 
 */
package egovframework.com.a2m.egov.model.afp.project;

/**
 * @author tiennd
 *
 * @created Apr 18, 2023
 */
public enum ProjectTypeDto {
	
	ALL("P_01"), MYPROJECT("P_02"), GENERAL("P_03"), LIBRARY("P_04"), BOOKMARKED("P_05");

	private String type;

	ProjectTypeDto(String type) {
		this.type = type;
	}

	public String type() {
		return type;
	}
}
