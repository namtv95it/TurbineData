package egovframework.com.a2m.egov.model.afp.threads;

/**
 * @author kethx
 *
 * @created Apr 18, 2023
 */
public enum ThreadsType {
	
	ALL("T_01"), GUIDE("T_02"), CODE_CONVENTIONS("T_03"), COMMON_LIBRARIES("T_04"), COMPONENT_TEMPLATES("T_05"), BOOKMARKED("T_06");

	private String type;

	ThreadsType(String type) {
		this.type = type;
	}

	public String type() {
		return type;
	}
}
