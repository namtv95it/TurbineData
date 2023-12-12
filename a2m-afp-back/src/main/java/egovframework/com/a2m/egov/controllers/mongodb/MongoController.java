package egovframework.com.a2m.egov.controllers.mongodb;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import egovframework.com.a2m.egov.service.mongodb.MongoDocument;
import egovframework.com.a2m.egov.service.mongodb.MongoService;

@RestController
@RequestMapping(value = "/api/mongo")
public class MongoController {
	@Autowired
	MongoService mongoService;
	
	@PostMapping(value="/insert")
	ResponseEntity<?> insert(@RequestBody MongoDocument user) {
		return ResponseEntity.ok(mongoService.insert(user));
	}
}
