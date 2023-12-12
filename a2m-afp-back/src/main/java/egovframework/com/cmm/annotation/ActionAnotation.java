/**
 * 
 */
package egovframework.com.cmm.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * @author tiennd
 *
 * @created Mar 6, 2023
 */

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface ActionAnotation {
	public enum Action {
		CREATE, READ, UPDATE, DELETE, EXCEL
	};

	public Action action() default Action.READ;
}
