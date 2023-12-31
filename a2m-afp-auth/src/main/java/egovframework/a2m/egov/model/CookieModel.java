package egovframework.a2m.egov.model;

public class CookieModel {
	private String name;
	private String value;
	private String domain;
	private String path;
	private int maxAge;
	private boolean secure; 
    private boolean httpOnly;
	
	public CookieModel() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public CookieModel(String name, String value, String domain, String path, int maxAge, boolean secure,
			boolean httpOnly) {
		super();
		this.name = name;
		this.value = value;
		this.domain = domain;
		this.path = path;
		this.maxAge = maxAge;
		this.secure = secure;
		this.httpOnly = httpOnly;
	}

	public boolean isSecure() {
		return secure;
	}
	public void setSecure(boolean secure) {
		this.secure = secure;
	}
	public boolean isHttpOnly() {
		return httpOnly;
	}
	public void setHttpOnly(boolean httpOnly) {
		this.httpOnly = httpOnly;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public String getDomain() {
		return domain;
	}
	public void setDomain(String domain) {
		this.domain = domain;
	}
	public int getMaxAge() {
		return maxAge;
	}
	public void setMaxAge(int maxAge) {
		this.maxAge = maxAge;
	}
	
}
