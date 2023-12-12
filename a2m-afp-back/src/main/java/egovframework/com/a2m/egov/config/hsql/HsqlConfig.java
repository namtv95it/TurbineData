//package egovframework.com.a2m.egov.config.hsql;
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
//@MapperScan(basePackages = "egovframework.com.a2m.egov.dao.hsql", sqlSessionTemplateRef = "HsqlSessionTemplate")
//@Configuration
//public class HsqlConfig {
//	@Bean(name = "HsqlDataSource")
//	@ConfigurationProperties(prefix = "spring.datasource.hsql")
//	public DataSource FirstDataSource() {
//		return DataSourceBuilder.create().build();
//	}
//
//	@Bean(name = "HsqlSessionFactory")
//	public SqlSessionFactory sqlSessionFactory(@Qualifier("HsqlDataSource") DataSource dataSource)
//			throws Exception {
//
//		SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
//		sqlSessionFactoryBean.setDataSource(dataSource);
//		sqlSessionFactoryBean
//				.setMapperLocations(new PathMatchingResourcePatternResolver().getResources("egovframework/mapper/let/a2m/gov/hsql/*.xml"));
//		return sqlSessionFactoryBean.getObject();
//	}
//
//	@Bean(name = "HsqlSessionTemplate")
//	public SqlSessionTemplate sqlSessionTemplate(
//			@Qualifier("HsqlSessionFactory") SqlSessionFactory sessionTemplate) {
//		return new SqlSessionTemplate(sessionTemplate);
//	}
//
//	@Bean(name = "HsqlTransactionManager")
//	public DataSourceTransactionManager PrimaryTransactionManager(
//			@Qualifier("HsqlDataSource") DataSource dataSource) {
//
//		return new DataSourceTransactionManager(dataSource);
//	}
//}
