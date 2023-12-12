package egovframework.com.a2m.egov.model.afp;

/**
 * @author tiennd
 *
 * @created May 19, 2023
 */
public enum DashboardSearchDto {
	
	ALL(""), PROJECTS("09-01"), DOCUMENTS("09-02"), THREADS("09-03"), ANNOUNCEMENTS("09-04"), MOST_LIKE_THREADS("09-03");

	private String type;

	DashboardSearchDto(String type) {
		this.type = type;
	}

	public String type() {
		return type;
	}
}
