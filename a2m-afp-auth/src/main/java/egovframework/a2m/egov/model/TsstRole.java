package egovframework.a2m.egov.model;

import java.time.Instant;

public class TsstRole {
	private String roleId;
	private String roleNm;
	private String description;
	private Instant createdDate;
	private String createdBy;
	private Instant updatedDate;
	private String updatedBy;
	private String useYn;
	
	public TsstRole() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public TsstRole(String roleId, String roleNm, String description, Instant createdDate, String createdBy,
			Instant updatedDate, String updatedBy, String useYn) {
		super();
		this.roleId = roleId;
		this.roleNm = roleNm;
		this.description = description;
		this.createdDate = createdDate;
		this.createdBy = createdBy;
		this.updatedDate = updatedDate;
		this.updatedBy = updatedBy;
		this.useYn = useYn;
	}
	public String getRoleId() {
		return roleId;
	}
	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}
	public String getRoleNm() {
		return roleNm;
	}
	public void setRoleNm(String roleNm) {
		this.roleNm = roleNm;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Instant getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(Instant createdDate) {
		this.createdDate = createdDate;
	}
	public String getCreatedBy() {
		return createdBy;
	}
	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}
	public Instant getUpdatedDate() {
		return updatedDate;
	}
	public void setUpdatedDate(Instant updatedDate) {
		this.updatedDate = updatedDate;
	}
	public String getUpdatedBy() {
		return updatedBy;
	}
	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}
	public String getUseYn() {
		return useYn;
	}
	public void setUseYn(String useYn) {
		this.useYn = useYn;
	}
	
}
