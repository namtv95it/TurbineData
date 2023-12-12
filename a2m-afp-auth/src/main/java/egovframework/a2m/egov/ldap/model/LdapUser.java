//package egovframework.a2m.egov.ldap.model;
//
//import javax.naming.Name;
//
//import org.springframework.ldap.odm.annotations.Attribute;
//import org.springframework.ldap.odm.annotations.Entry;
//import org.springframework.ldap.odm.annotations.Id;
//
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//@Getter
//@Setter
//@AllArgsConstructor
//@NoArgsConstructor
//
//@Entry(
//	base = "ou=Users",
//	objectClasses = {"person", "inetOrgPerson", "top", "organizationalPerson"}
//)
//public class LdapUser {
//	@Id
//    private Name id;
//    
//	private @Attribute(name = "uid") String userId;
//    private @Attribute(name = "cn") String lastName;
//    private @Attribute(name = "sn") String firstName;
//    private @Attribute(name = "userPassword") byte[] userPassword;
//    private @Attribute(name = "mail") String email;
//}
