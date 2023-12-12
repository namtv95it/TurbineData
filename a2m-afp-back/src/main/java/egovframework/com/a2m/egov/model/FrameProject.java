package egovframework.com.a2m.egov.model;

import java.util.Date;
import java.util.List;

/**
 * @author Nguyen Trung Anh
 * @created 3/24/2023
 */
public class FrameProject {
    private String projectId;
    private String projectName;
    private String projectNameKr;
    private String description;
    private String organization;
    private Date updatedDate;
    private String version;
    private String categoryName;
    private List<FrameTag> frameTags;

    private boolean enable;

    private String manuals;

    public boolean isEnable() {
        return enable;
    }

    public void setEnable(boolean enable) {
        this.enable = enable;
    }

    public String getManuals() {
        return manuals;
    }

    public void setManuals(String manuals) {
        this.manuals = manuals;
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public String getProjectName() {
        return projectName;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public String getProjectNameKr() {
        return projectNameKr;
    }

    public void setProjectNameKr(String projectNameKr) {
        this.projectNameKr = projectNameKr;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getOrganization() {
        return organization;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    public Date getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(Date updatedDate) {
        this.updatedDate = updatedDate;
    }

    public String getVersion() {
        return version;
    }

    public void setVersion(String version) {
        this.version = version;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public List<FrameTag> getFrameTags() {
        return frameTags;
    }

    public void setFrameTags(List<FrameTag> frameTags) {
        this.frameTags = frameTags;
    }
}
