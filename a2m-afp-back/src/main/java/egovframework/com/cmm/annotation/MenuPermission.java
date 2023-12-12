package egovframework.com.cmm.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * @author Nguyen Van Hau
 * @since 2023.03.07
 */

@Target(value = { ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
public @interface MenuPermission {
	
	public MenuPermissionType[] permissions() default {};
	
	public boolean matchAny() default false;
}
