package egovframework.com.a2m.egov.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.io.Serializable;
import java.util.Date;

/**
 * @author Nguyen Trung Anh
 * @created 2/22/2023
 */

@ApiModel(description = "Model menu")
public class TsstMenu implements Serializable{
    @ApiModelProperty(notes = "Menu's ID", value = "MNU_01")
    private String menuId;
    @ApiModelProperty(notes = "User's ID has created", value = "20221213150337001")
    private String createdBy;
    @ApiModelProperty(notes = "Time of Menu has been created", value = "2023-03-09 17:04:23")
    private Date createdDate;
    @ApiModelProperty(notes = "Description of menu", value = "This is description")
    private String description;
    @ApiModelProperty(notes = "Level of Menu", value = "1")
    private int lev;
    @ApiModelProperty(notes = "Name of Menu default is Korean", value = "전기사용자 정보")
    private String menuNm;
    @ApiModelProperty(notes = "Name of Menu English", value = "System management")
    private String menuNmEn;
    @ApiModelProperty(notes = "Name of Menu default is Vietnamese", value = "Quản lý hệ thống")
    private String menuNmVi;
    @ApiModelProperty(notes = "Type of Menu")
    private String menuType;
    @ApiModelProperty(notes = "Order no of Menu to sort menu in front end", value = "1")
    private int ordNo;
    @ApiModelProperty(notes = "Id of parent Menu", value = "MNU_01")
    private String upMenuId;
    @ApiModelProperty(notes = "Time of Menu has been updated", value = "2023-03-09 17:04:23")
    private Date updatedDate;
    @ApiModelProperty(notes = "User's ID has updated", value = "20221213150337001")
    private String updatedBy;
    @ApiModelProperty(notes = "Url to redirect in web", value = "sys/sys0101")
    private String url;
    @ApiModelProperty(notes = "Status of menu to known menu is active or inactive", value = "Y")
    private String useYn;

    public TsstMenu(String menuId, String createdBy, Date createdDate, String description, int lev, String menuNm, String menuNmEn, String menuNmVi, String menuType, int ordNo, String upMenuId, Date updatedDate, String updatedBy,  String url, String useYn) {
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
    }

    public TsstMenu() {
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
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
}
