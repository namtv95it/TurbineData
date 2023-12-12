package egovframework.com.a2m.egov.constants;

public enum StateConstants {
	
	UPDATE("U"), DELETE("D"), CREATE("C");

	private String value;

	StateConstants(String id) {
		this.value = id;
	}

	public String getValue() {
		return value;
	}
}
