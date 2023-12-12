package egovframework.a2m.egov.constants;

/**
* 
* @author Nguyen Van Hau
* @since 2023. 2. 21.
* @version 1
*/

public enum RoleConstants {
	
	ADMIN_USER("R000"),
	NORMAL_USER("R001"),
	DEFAULT_ROLE_3RD_PARTY("R3RD");
	
	private String value;
	
	RoleConstants(String id){
		this.value = id;
	}
	
	public String getValue() {
		return value;
	}
}
