package egovframework.com.a2m.egov.service.mongodb;

import javax.persistence.Id;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "user")
public class MongoDocument {
	@Id
	private Long id;
	
	@Field(value = "name")
	private String name;

	public MongoDocument(Long id, String name) {
		super();
		this.id = id;
		this.name = name;
	}

	public MongoDocument() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
