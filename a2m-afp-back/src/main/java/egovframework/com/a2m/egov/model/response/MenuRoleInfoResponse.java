package egovframework.com.a2m.egov.model.response;

import java.util.Date;

/**
 * @author Nguyen Van Hau
 * @since 2023.03.06
 */
public class MenuRoleInfoResponse {
	private String menuId;
    private String createdBy;
    private Date createdDate;
    private String description;
    private int lev;
    private String menuNm;
    private String menuNmEn;
    private String menuNmVi;
    private String menuType;
    private int ordNo;
    private String upMenuId;
    private Date updatedDate;
    
    private String updatedBy;
    private String url;
    private String useYn;
    
    private String readYn;
	private String wrtYn;
	private String modYn;
	private String delYn;
	private String pntYn;
	private String excDnYn;
	private String mngYn;
	public MenuRoleInfoResponse() {
		super();
		// TODO Auto-generated constructor stub
	}
	public MenuRoleInfoResponse(String menuId, String createdBy, Date createdDate, String description, int lev,
			String menuNm, String menuNmEn, String menuNmVi, String menuType, int ordNo, String upMenuId,
			Date updatedDate, String updatedBy, String url, String useYn, String readYn, String wrtYn, String modYn,
			String delYn, String pntYn, String excDnYn, String mngYn) {
		super();
		this.menuId = menuId;
		this.createdBy = createdBy;
		this.createdDate = createdDate;
		this.description = description;
		this.lev = lev;
		this.menuNm = menuNm;
		this.menuNmEn = menuNmEn;
		this.menuNmVi = menuNmVi;
		this.menuType = menuType;
		this.ordNo = ordNo;
		this.upMenuId = upMenuId;
		this.updatedDate = updatedDate;
		this.updatedBy = updatedBy;
		this.url = url;
		this.useYn = useYn;
		this.readYn = readYn;
		this.wrtYn = wrtYn;
		this.modYn = modYn;
		this.delYn = delYn;
		this.pntYn = pntYn;
		this.excDnYn = excDnYn;
		this.mngYn = mngYn;
	}
	public String getMenuId() {
		return menuId;
	}
	public void setMenuId(String menuId) {
		this.menuId = menuId;
	}
	public String getCreatedBy() {
		return createdBy;
	}
	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}
	public Date getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public int getLev() {
		return lev;
	}
	public void setLev(int lev) {
		this.lev = lev;
	}
	public String getMenuNm() {
		return menuNm;
	}
	public void setMenuNm(String menuNm) {
		this.menuNm = menuNm;
	}
	public String getMenuNmEn() {
		return menuNmEn;
	}
	public void setMenuNmEn(String menuNmEn) {
		this.menuNmEn = menuNmEn;
	}
	public String getMenuNmVi() {
		return menuNmVi;
	}
	public void setMenuNmVi(String menuNmVi) {
		this.menuNmVi = menuNmVi;
	}
	public String getMenuType() {
		return menuType;
	}
	public void setMenuType(String menuType) {
		this.menuType = menuType;
	}
	public int getOrdNo() {
		return ordNo;
	}
	public void setOrdNo(int ordNo) {
		this.ordNo = ordNo;
	}
	public String getUpMenuId() {
		return upMenuId;
	}
	public void setUpMenuId(String upMenuId) {
		this.upMenuId = upMenuId;
	}
	public Date getUpdatedDate() {
		return updatedDate;
	}
	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}
	public String getUpdatedBy() {
		return updatedBy;
	}
	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public String getUseYn() {
		return useYn;
	}
	public void setUseYn(String useYn) {
		this.useYn = useYn;
	}
	public String getReadYn() {
		return readYn;
	}
	public void setReadYn(String readYn) {
		this.readYn = readYn;
	}
	public String getWrtYn() {
		return wrtYn;
	}
	public void setWrtYn(String wrtYn) {
		this.wrtYn = wrtYn;
	}
	public String getModYn() {
		return modYn;
	}
	public void setModYn(String modYn) {
		this.modYn = modYn;
	}
	public String getDelYn() {
		return delYn;
	}
	public void setDelYn(String delYn) {
		this.delYn = delYn;
	}
	public String getPntYn() {
		return pntYn;
	}
	public void setPntYn(String pntYn) {
		this.pntYn = pntYn;
	}
	public String getExcDnYn() {
		return excDnYn;
	}
	public void setExcDnYn(String excDnYn) {
		this.excDnYn = excDnYn;
	}
	public String getMngYn() {
		return mngYn;
	}
	public void setMngYn(String mngYn) {
		this.mngYn = mngYn;
	}
	
}
