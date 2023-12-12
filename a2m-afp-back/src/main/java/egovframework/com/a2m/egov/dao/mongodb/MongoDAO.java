package egovframework.com.a2m.egov.dao.mongodb;

import org.springframework.data.mongodb.repository.MongoRepository;

import egovframework.com.a2m.egov.service.mongodb.MongoDocument;

public interface MongoDAO extends MongoRepository<MongoDocument, Long> {

}
