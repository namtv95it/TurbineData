package egovframework.com.a2m.egov.model;

/**
 * @author Nguyen Trung Anh
 * @created 3/24/2023
 */
public class FrameTag {
    private long tagId;
    private String name;

    private int numberColor;

    public int getNumberColor() {
        return numberColor;
    }

    public void setNumberColor(int numberColor) {
        this.numberColor = numberColor;
    }

    public long getTagId() {
        return tagId;
    }

    public void setTagId(long tagId) {
        this.tagId = tagId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
