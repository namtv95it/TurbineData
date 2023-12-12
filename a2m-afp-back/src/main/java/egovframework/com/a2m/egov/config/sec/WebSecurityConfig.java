package egovframework.com.a2m.egov.config.sec;

import egovframework.com.a2m.egov.config.sec.jwt.AuthTokenRsaFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import egovframework.com.a2m.egov.config.sec.jwt.AuthEntryPointJwt;


/**
 * 
 * @author Nguyen Van Hau
 * @since 2023. 2. 27.
 * @version 1
 */

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig {
	private static final Logger logger = LoggerFactory.getLogger(WebSecurityConfig.class);
	
	private final String[] WHITE_LIST = new String[] {
            "/api/public/**", 
            "/api/doc/**", 
            "/ws/**",
            "/nero/**",
            "/common/file-service/**",
            "/notificationWs",
            "/editor/viewImage/**",
            "/ckeditor/**"
    };

	@Autowired
	private AuthEntryPointJwt authenEntryPoint;

	@Autowired
	private AuthTokenRsaFilter authTokenRsaFilter;

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		logger.debug("SecurityConfig initialized.");
		http.csrf().disable()
//			.cors().and()
				.authorizeRequests()
				.antMatchers(WHITE_LIST).permitAll()
				.anyRequest().authenticated().and().exceptionHandling()
				.authenticationEntryPoint(authenEntryPoint).and().sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS);

		http.addFilterBefore(authTokenRsaFilter, UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
			throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
