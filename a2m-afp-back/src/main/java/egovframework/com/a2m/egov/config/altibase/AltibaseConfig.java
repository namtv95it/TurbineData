//package egovframework.com.a2m.egov.config.altibase;
//
//import javax.sql.DataSource;
//
//import org.apache.ibatis.session.SqlSessionFactory;
//import org.mybatis.spring.SqlSessionFactoryBean;
//import org.mybatis.spring.SqlSessionTemplate;
//import org.mybatis.spring.annotation.MapperScan;
//import org.springframework.beans.factory.annotation.Qualifier;
//import org.springframework.boot.context.properties.ConfigurationProperties;
//import org.springframework.boot.jdbc.DataSourceBuilder;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
//import org.springframework.jdbc.datasource.DataSourceTransactionManager;
//
//@MapperScan(basePackages = "egovframework.com.a2m.egov.dao.altibase", sqlSessionTemplateRef = "AltibaseSessionTemplate")
//@Configuration
//public class AltibaseConfig {
//	@Bean(name = "AltibaseDataSource")
//	@ConfigurationProperties(prefix = "spring.datasource.altibase")
//	public DataSource FirstDataSource() {
//		return DataSourceBuilder.create().build();
//	}
//
//	@Bean(name = "AltibaseSessionFactory")
//	public SqlSessionFactory sqlSessionFactory(@Qualifier("AltibaseDataSource") DataSource dataSource)
//			throws Exception {
//
//		SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
//		sqlSessionFactoryBean.setDataSource(dataSource);
//		sqlSessionFactoryBean
//				.setMapperLocations(new PathMatchingResourcePatternResolver().getResources("egovframework/mapper/let/a2m/gov/altibase/*.xml"));
//		return sqlSessionFactoryBean.getObject();
//	}
//
//	@Bean(name = "AltibaseSessionTemplate")
//	public SqlSessionTemplate sqlSessionTemplate(
//			@Qualifier("AltibaseSessionFactory") SqlSessionFactory sessionTemplate) {
//		return new SqlSessionTemplate(sessionTemplate);
//	}
//
//	@Bean(name = "AltibaseTransactionManager")
//	public DataSourceTransactionManager PrimaryTransactionManager(
//			@Qualifier("AltibaseDataSource") DataSource dataSource) {
//
//		return new DataSourceTransactionManager(dataSource);
//	}
//}
