package egovframework.com.cmm.interceptor;

import java.lang.reflect.Method;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import egovframework.com.a2m.egov.config.sec.UserDetailsImpl;
import egovframework.com.a2m.egov.constants.CommonConstants;
import egovframework.com.a2m.egov.exception.MenuAccessDeniedException;
import egovframework.com.a2m.egov.model.response.MenuRoleInfoResponse;
import egovframework.com.cmm.annotation.MenuPermission;
import egovframework.com.cmm.annotation.MenuPermissionType;

/**
 * Authentication Status Check Interceptor
 * 
 * @author Nguyen Van Hau
 * @since 2023.03.06
 * @version 1.0
 * @see
 */

public class CustomAuthenticInterceptor extends HandlerInterceptorAdapter {
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {

		if (handler instanceof HandlerMethod) {
			HandlerMethod handlerMethod = (HandlerMethod) handler;
			Method method = handlerMethod.getMethod();
			if (method != null) {
				Class<?> clazz = method.getDeclaringClass();
				RequestMapping rma = clazz.getAnnotation(RequestMapping.class);
				String[] apiUrls = rma.value();
				String menuUrl = null;
				if (apiUrls != null && apiUrls.length > 0) {
					menuUrl = apiUrls[0].replace("api", StringUtils.EMPTY);
				}

				MenuPermission mnAnnotation = method.getAnnotation(MenuPermission.class);
				MenuPermissionType[] requiredPermissions = null;
				boolean matchAny = false;
				if (mnAnnotation != null) {
					requiredPermissions = mnAnnotation.permissions();
					matchAny = mnAnnotation.matchAny();
				}
				
				Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
				UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
				List<MenuRoleInfoResponse> menus = userDetails.getUser().getMenus();

				if (!checkMenuPermissionMatchAll(menus, menuUrl, requiredPermissions)) {
					throw new MenuAccessDeniedException("You don't have permission to this menu.");
				} 
			}

		}
		return true;
	}

	private boolean checkMenuPermissionMatchAll(List<MenuRoleInfoResponse> menus, String menuUrl,
			MenuPermissionType[] permissionTypes) {
		boolean isPermittedURL = false;
		for (MenuRoleInfoResponse menu : menus) {
			if (menu.getUrl() != null && menu.getUrl().equals(menuUrl)
					&& menu.getUseYn().equals(CommonConstants.USE_Y)) {
				
				if (permissionTypes != null) {
					isPermittedURL = checkMenuPermissionType(menu, permissionTypes);
				}else {
					isPermittedURL = true;
				}
				break;
			}
		}
		return isPermittedURL;
	}

	private boolean checkMenuPermissionType(MenuRoleInfoResponse menu, MenuPermissionType[] permissionTypes) {
		boolean isPermitted = false;

		for (MenuPermissionType permission : permissionTypes) {
			if (permission.toString().equals(MenuPermissionType.READ.toString())
					&& menu.getReadYn().equals(CommonConstants.USE_Y)) {
				isPermitted = true;
			}
			if (permission.toString().equals(MenuPermissionType.WRITE.toString())
					&& menu.getWrtYn().equals(CommonConstants.USE_Y)) {
				isPermitted = true;
			}
			if (permission.toString().equals(MenuPermissionType.MODIFY.toString())
					&& menu.getModYn().equals(CommonConstants.USE_Y)) {
				isPermitted = true;
			}
			if (permission.toString().equals(MenuPermissionType.DELETE.toString())
					&& menu.getDelYn().equals(CommonConstants.USE_Y)) {
				isPermitted = true;
			}
			if (permission.toString().equals(MenuPermissionType.PRINT.toString())
					&& menu.getPntYn().equals(CommonConstants.USE_Y)) {
				isPermitted = true;
			}
			if (permission.toString().equals(MenuPermissionType.MANAGE.toString())
					&& menu.getMngYn().equals(CommonConstants.USE_Y)) {
				isPermitted = true;
			}
			if (permission.toString().equals(MenuPermissionType.EXCEL.toString())
					&& menu.getExcDnYn().equals(CommonConstants.USE_Y)) {
				isPermitted = true;
			}
		}

		return isPermitted;
	}
}
