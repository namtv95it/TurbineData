package egovframework.a2m.egov.model;

import java.io.Serializable;
import java.time.Instant;
import java.util.List;

public class TsstUser implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private String userUid;
	private String userId;
	private String pwd;
	private Instant createdDate;
	private String createdBy;
	private Instant pwdExpr;
	private String updatedBy;
	private Instant updatedDate;
	private String status;
	private List<TsstRole> roles;
	
	public TsstUser() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public TsstUser(String userUid, String userId, String pwd, Instant createdDate, String createdBy, Instant pwdExpr,
			String updatedBy, Instant updatedDate, String status, List<TsstRole> roles) {
		super();
		this.userUid = userUid;
		this.userId = userId;
		this.pwd = pwd;
		this.createdDate = createdDate;
		this.createdBy = createdBy;
		this.pwdExpr = pwdExpr;
		this.updatedBy = updatedBy;
		this.updatedDate = updatedDate;
		this.status = status;
		this.roles = roles;
	}
	public String getUserUid() {
		return userUid;
	}
	public void setUserUid(String userUid) {
		this.userUid = userUid;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getPwd() {
		return pwd;
	}
	public void setPwd(String pwd) {
		this.pwd = pwd;
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
	public Instant getPwdExpr() {
		return pwdExpr;
	}
	public void setPwdExpr(Instant pwdExpr) {
		this.pwdExpr = pwdExpr;
	}
	public String getUpdatedBy() {
		return updatedBy;
	}
	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}
	public Instant getUpdatedDate() {
		return updatedDate;
	}
	public void setUpdatedDate(Instant updatedDate) {
		this.updatedDate = updatedDate;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public List<TsstRole> getRoles() {
		return roles;
	}
	public void setRoles(List<TsstRole> roles) {
		this.roles = roles;
	}
	
}
