package egovframework.com.a2m.egov.config.schedule;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@Configuration
@EnableScheduling
public class Scheduling {
	
	Logger log = LoggerFactory.getLogger(Scheduling.class);
	
	@Scheduled(cron = "0 0 0 ? * *") // at 24 o'clock every day
    public void scheduleSample() {
		log.info("schedule sample running...");
    }
	
}
