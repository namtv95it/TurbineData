package egovframework.com.a2m.egov.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.util.Date;

/**
 * @author Nguyen Trung Anh
 * @created 2/23/2023
 */
@ApiModel(description = "Commcode model")
public class TccoSTD {
    @ApiModelProperty(notes = "Comm code ID", value = "01-01-02")
    private String commCd;
    @ApiModelProperty(notes = "Comm code's name Korean", value = "활성화")
    private String commNm;
    @ApiModelProperty(notes = "Comm code's name English", value = "Activated")
    private String commNmEn;
    @ApiModelProperty(notes = "Comm code's value (not required)", value = "KRD053032102")
    private String valueConfig;
    @ApiModelProperty(notes = "User UID created", value = "20221214090920002")
    private String createdBy;
    @ApiModelProperty(notes = "Time created", value = "2022-12-19 11:16:13.161000")
    private Date createdDate;
    @ApiModelProperty(notes = "Description of comm code", value = "This is comm code")
    private String description;
    @ApiModelProperty(notes = "Level of comm code", value = "2")
    private int lev;
    @ApiModelProperty(notes = "Parent's ID of comm code", value = "01")
    private String upCommCd;
    @ApiModelProperty(notes = "User UID updated", value = "20221214090920002")
    private String updatedBy;
    @ApiModelProperty(notes = "Time updated", value = "2022-12-19 11:16:13.161000")
    private Date updatedDate;
    @ApiModelProperty(notes = "Status of comm code", value = "Y")
    private String useYn;

    public TccoSTD() {
    }

    public TccoSTD(String commCd, String commNm, String commNmEn, String valueConfig, String createdBy, Date createdDate, String description, int lev, String upCommCd, String updatedBy, Date updatedDate, String useYn) {
        this.commCd = commCd;
        this.commNm = commNm;
        this.commNmEn = commNmEn;
        this.valueConfig = valueConfig;
        this.createdBy = createdBy;
        this.createdDate = createdDate;
        this.description = description;
        this.lev = lev;
        this.upCommCd = upCommCd;
        this.updatedBy = updatedBy;
        this.updatedDate = updatedDate;
        this.useYn = useYn;
    }

    public String getCommCd() {
        return commCd;
    }

    public void setCommCd(String commCd) {
        this.commCd = commCd;
    }

    public String getCommNm() {
        return commNm;
    }

    public void setCommNm(String commNm) {
        this.commNm = commNm;
    }

    public String getCommNmEn() {
        return commNmEn;
    }

    public void setCommNmEn(String commNmEn) {
        this.commNmEn = commNmEn;
    }

    public String getvalueConfig() {
        return valueConfig;
    }

    public void setvalueConfig(String valueConfig) {
        this.valueConfig = valueConfig;
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

    public String getUpCommCd() {
        return upCommCd;
    }

    public void setUpCommCd(String upCommCd) {
        this.upCommCd = upCommCd;
    }

    public String getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(String updatedBy) {
        this.updatedBy = updatedBy;
    }

    public Date getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(Date updatedDate) {
        this.updatedDate = updatedDate;
    }

    public String getUseYn() {
        return useYn;
    }

    public void setUseYn(String useYn) {
        this.useYn = useYn;
    }
}
