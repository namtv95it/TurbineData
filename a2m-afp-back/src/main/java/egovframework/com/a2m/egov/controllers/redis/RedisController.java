package egovframework.com.a2m.egov.controllers.redis;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import egovframework.com.a2m.egov.service.redis.RedisService;

@RestController
@RequestMapping(value = "/api/redis")
public class RedisController {
	@Resource(name = "redisService")
	private RedisService redisService;

	@PostMapping(value = "insert")
	void insert(@RequestBody Map<String, Object> arg) {
		redisService.insert(arg);
	}
}
