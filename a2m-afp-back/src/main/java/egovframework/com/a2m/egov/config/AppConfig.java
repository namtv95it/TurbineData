package egovframework.com.a2m.egov.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class AppConfig implements WebMvcConfigurer{
	
	@Value("${editor.upload.dir}")
	private String editorUploadDir;
	
	@Value("${editor.url.prefix}")
	private String editorUrlPrefix;
	
	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}
	
	@Override
    public void addResourceHandlers(ResourceHandlerRegistry  registry){ 
		registry.addResourceHandler(editorUrlPrefix + "/**")
        .addResourceLocations("file:" + editorUploadDir + "/");
	}
}
