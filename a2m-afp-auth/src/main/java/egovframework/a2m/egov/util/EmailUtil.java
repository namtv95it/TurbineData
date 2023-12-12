package egovframework.a2m.egov.util;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.Properties;

import javax.annotation.PostConstruct;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;

/**
* 
* @author Nguyen Van Hau
* @since 2023.3.20.
* @version 1
*/

@Component
public class EmailUtil {
	
	@Autowired
	private Environment env;
	
	private static String host;
	private static int port;
	private static String username;
	private static String password;
	
	@PostConstruct
	public void init() {
		host = env.getProperty("spring.mail.host");
		port = Integer.parseInt(env.getProperty("spring.mail.port"));
		username = env.getProperty("spring.mail.username");
		password = env.getProperty("spring.mail.password");
	}
	
	public static void sendMail(String title, String content, String toEmail) throws AddressException, MessagingException {
		Properties props = new Properties();
		props.put("mail.smtp.auth", "true");
//		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.host", host);
		props.put("mail.smtp.port", port);

		Session session = Session.getInstance(props, new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(username, password);
			}
		});
		
		Message msg = new MimeMessage(session);

		msg.setFrom(new InternetAddress(username, false));
		msg.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail));
		msg.setSubject(title);
		msg.setContent(content, "text/html");
		msg.setSentDate(new Date());
		Transport.send(msg);
	}
	
	public static String getEmailTemplateResetPassword() throws IOException {
		ClassPathResource classPathResource = new ClassPathResource("templates-mail/rest-password.html");
        byte[] binaryData = FileCopyUtils.copyToByteArray(classPathResource.getInputStream());
        String data = new String(binaryData, StandardCharsets.UTF_8);
		return data;
	}
	
	public static String getEmailTemplateVerifyCode() throws IOException {
        ClassPathResource classPathResource = new ClassPathResource("templates-mail/email-verify.html");
        byte[] binaryData = FileCopyUtils.copyToByteArray(classPathResource.getInputStream());
        String data = new String(binaryData, StandardCharsets.UTF_8);
		return data;
	}
	
}
