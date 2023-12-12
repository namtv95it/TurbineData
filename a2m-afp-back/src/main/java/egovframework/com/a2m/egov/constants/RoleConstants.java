package egovframework.com.a2m.egov.constants;

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
