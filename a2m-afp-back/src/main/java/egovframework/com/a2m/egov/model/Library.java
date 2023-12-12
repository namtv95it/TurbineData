package egovframework.com.a2m.egov.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;

/**
 * @author Nguyen Trung Anh
 * @created 5/8/2023
 */
@NoArgsConstructor
@Getter
@Setter
public class Library {
    private Long id;

    private String name;

    private String libName;

    private String npmLibName;

    private String optionType;

    private Boolean enable;

    private Integer orderNumber;
}
