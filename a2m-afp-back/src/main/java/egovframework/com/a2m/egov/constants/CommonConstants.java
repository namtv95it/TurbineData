package egovframework.com.a2m.egov.constants;

public class CommonConstants {
	
	public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final String PUBLIC_KEY_PREFIX = "PublicKey";
	
	public static final String ACCOUNT_STATUS_LOCKED = "02-01";
	public static final String ACCOUNT_STATUS_DISABLED = "02-02";
	public static final String ACCOUNT_STATUS_ACTIVED = "02-03";
	
	public static final String USE_Y = "Y";
	public static final String USE_N = "N";

	public static final int MAX_MENU_LEV = 3;
	
	public static final int PWD_EXPR = 6;

	public static final String KEY_PROJECT_NAME = "pRoJectNaMe";
	public static final String FOLDER_NAME_FRONTEND = "frontend";
	public static final String NAME_FOLDER_ZIP_FRONT = "a2m_framework_frontend.zip";
	public static final String NAME_FOLDER_ZIP_AUTH = "a2m-auth.zip";
	public static final String NAME_FOLDER_AUTH = "a2m-auth";
	public static final String EXTENSION_ZIP = ".zip";
	public static final String PREFIX_FOLDER_CONFIG = "folder_config_";
	public static final String PREFIX_NPM_CONFIG = "npm_config_";
	public static final String KEY_ADD_NPM = "//_add_npm_lib_";
	public static final String KEY_IMPORT_COMPONENT = "//_add_import_component_";
	public static final String KEY_IMPORT_ROUTER = "//_add_import_router_";
	public static final String PREFIX_IMPORT_COMPONENT_CONFIG = "import_config_";
	public static final String PREFIX_IMPORT_ROUTER_CONFIG = "router_config_";
	public static final String PACKAGE_UPDATE_TYPE = "^";

	public static final String EXTENSION_TXT = ".txt";
	public static final String EXTENSION_JSON = ".json";

	public static final String GLOBALS_PROPERTIES_FILE_PATH = "/src/main/resources/egovframework/egovProps/globals.properties";
	public static final String DATABASE_TYPE_KEY = "#{dbType}";
	public static final String SRC_CORE = "/core";
	public static final String POM_FILE_PATH = "/pom.xml";
	public static final String SRC_DEPENDENCIES = "/dependencies";
	public static final String CONFIG_APPLICATION_KEY = "#{config-dependencies}";
	public static final String ADDITIONAL_DEPENDENCIES_KEY = "#{additional_dependencies}";
	public static final String APPLICATION_FILE_PATH = "/src/main/resources/application.properties";
	public static final String SRC_CONFIG = "/config";
	public static final String SRC_PACKAGE = "/src/main/java/egovframework/com/a2m/egov";
	public static final String SERVICE_PACKAGE = "/service";
	public static final String CONFIG_PACKAGE = "/config";
	public static final String DAO_PACKAGE = "/dao";
	public static final String CONTROLLER_PACKAGE = "/controllers";
	public static final String SRC_MAPPER_FILE_MYBATIS = "/src/main/resources/egovframework/mapper/let/a2m/gov";

	public static final String OPTION_TYPE_DEPEND_RADIO = "RADIO_BUTTON";
	public static final String OPTION_TYPE_DEPEND_CHECK = "CHECKBOX";
	
	public static final String POST_TYPE_PROJECTS = "09-01";
	public static final String POST_TYPE_DOCUMENTS = "09-02";
	public static final String POST_TYPE_THREADS = "09-03";
	public static final String POST_TYPE_ANNOUNCEMENTS = "09-04";

	public static final String POST_TYPE_REQUEST_NEW_LIB = "09-05";
	
	public static final int WIDTH_IMG_THUMB = 96;

	public static final String REQUEST_STATUS_DEFAULT = "11-01";

	public static final String REQUEST_STATUS_REQUESTED = "11-01";

	public static final String REQUEST_STATUS_APPROVED = "11-02";

	public static final String REQUEST_STATUS_REJECTED = "11-03";

	public static final String ROLE_ADMIN = "R000";


}
