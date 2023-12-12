package egovframework.com.a2m.egov.service.mongodb.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import egovframework.com.a2m.egov.dao.mongodb.MongoDAO;
import egovframework.com.a2m.egov.service.mongodb.MongoDocument;
import egovframework.com.a2m.egov.service.mongodb.MongoService;

@Service
public class MongoServiceImpl implements MongoService {
	@Autowired
	MongoDAO mongoRepo;

	@Override
	public MongoDocument insert(MongoDocument user) {
		return mongoRepo.save(user);
	}

}
