//package egovframework.com.a2m.egov.config.mysql;
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
//@MapperScan(basePackages = "egovframework.com.a2m.egov.dao.mysql", sqlSessionTemplateRef = "MySqlSessionTemplate")
//@Configuration
//public class MySqlConfig {
//	@Bean(name = "MySqlDataSource")
//	@ConfigurationProperties(prefix = "spring.datasource.mysql")
//	public DataSource FirstDataSource() {
//		return DataSourceBuilder.create().build();
//	}
//
//	@Bean(name = "MySqlSessionFactory")
//	public SqlSessionFactory sqlSessionFactory(@Qualifier("MySqlDataSource") DataSource dataSource)
//			throws Exception {
//
//		SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
//		sqlSessionFactoryBean.setDataSource(dataSource);
//		sqlSessionFactoryBean
//				.setMapperLocations(new PathMatchingResourcePatternResolver().getResources("egovframework/mapper/let/a2m/gov/mysql/*.xml"));
//		return sqlSessionFactoryBean.getObject();
//	}
//
//	@Bean(name = "MySqlSessionTemplate")
//	public SqlSessionTemplate sqlSessionTemplate(
//			@Qualifier("MySqlSessionFactory") SqlSessionFactory sessionTemplate) {
//		return new SqlSessionTemplate(sessionTemplate);
//	}
//
//	@Bean(name = "MySqlTransactionManager")
//	public DataSourceTransactionManager PrimaryTransactionManager(
//			@Qualifier("MySqlDataSource") DataSource dataSource) {
//
//		return new DataSourceTransactionManager(dataSource);
//	}
//}
