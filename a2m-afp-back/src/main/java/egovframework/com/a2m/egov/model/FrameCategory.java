package egovframework.com.a2m.egov.model;

import java.util.List;

/**
 * @author Nguyen Trung Anh
 * @created 3/24/2023
 */
public class FrameCategory {
    private String id;
    private boolean enabled;
    private String name;
    private List<FrameProject> projects;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public boolean isEnable() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<FrameProject> getProjects() {
        return projects;
    }

    public void setProjects(List<FrameProject> projects) {
        this.projects = projects;
    }
}
