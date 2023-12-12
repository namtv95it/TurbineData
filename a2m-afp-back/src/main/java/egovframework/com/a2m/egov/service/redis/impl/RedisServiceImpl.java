package egovframework.com.a2m.egov.service.redis.impl;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import egovframework.com.a2m.egov.service.redis.RedisService;

@Service("redisService")
public class RedisServiceImpl implements RedisService {
	@Autowired
	private RedisTemplate<String, Object> redisTemplate;

	@Override
	public void insert(Map<String, Object> arg) {
		redisTemplate.opsForHash().put("user",arg.get("id"),arg.get("name"));
		System.out.println(redisTemplate.opsForHash().get("user", arg));
	}

}
