package egovframework.com.a2m.egov.util;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.Map;

/**
* 
* @author Nguyen Van Hau
* @since 2023.3.31.
* @version 1
*/
public class ApiUrlUtil {

	public static String buildApiUrl(String path, Map<String, Object> params) {
		String url = path;
		int i = 0;
		for (Map.Entry<String, Object> param : params.entrySet()) {
			if (i == 0) {
				url += "?";
			} else {
				url += "&";
			}
			
			url += param.getKey();
			url += "=";
			url += param.getValue().toString();
			
			i++;
		}

		return url;
	}

	public static Map<String, Object> parameters(Object obj) {
		Map<String, Object> map = new HashMap<>();
		for (Field field : obj.getClass().getDeclaredFields()) {
			field.setAccessible(true);
			try {
				map.put(field.getName(), field.get(obj));
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return map;
	}
}
