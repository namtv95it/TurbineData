package egovframework.com.a2m.egov.controllers.nero;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Properties;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

/**
 * @author tiennd
 *
 * @created May 26, 2023
 */

@Configuration
public class NeroConfiguration {

	@Bean
	public void init() {
		ClassPathResource classPathResource = new ClassPathResource("largefileupload.properties");

		try {
			InputStream input = classPathResource.getInputStream();
			Properties prop = new Properties();
			if (input == null) {
				return;
			}
			prop.load(input);
			String pathUploadDir = prop.getProperty("path.default.uploaddir");
			Path resourcePath = Paths.get(pathUploadDir).toAbsolutePath().normalize();
			Files.createDirectories(resourcePath);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
