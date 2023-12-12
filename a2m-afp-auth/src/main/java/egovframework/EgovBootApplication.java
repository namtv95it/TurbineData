package egovframework;

import egovframework.a2m.egov.sec.jwt.JwtRsaUtils;
import egovframework.a2m.egov.util.RSAUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.Banner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.web.client.RestTemplate;

import egovframework.com.config.EgovWebApplicationInitializer;

import java.io.FileOutputStream;
import java.util.Map;

@ServletComponentScan
@SpringBootApplication
@Import({EgovWebApplicationInitializer.class})
public class EgovBootApplication {

	private static final Logger logger = LoggerFactory.getLogger(JwtRsaUtils.class);

	public static void main(String[] args) throws Exception {
		System.out.println("##### EgovBootApplication Start #####");
		SpringApplication springApplication = new SpringApplication(EgovBootApplication.class);
		springApplication.setBannerMode(Banner.Mode.OFF);
		//springApplication.setLogStartupInfo(false);
		springApplication.run(args);

		System.out.println("##### EgovBootApplication End #####");
	}
	
	
	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}
}
