//package egovframework.com.a2m.egov.config.cubrid;
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
//@MapperScan(basePackages = "egovframework.com.a2m.egov.dao.cubrid", sqlSessionTemplateRef = "CubridSessionTemplate")
//@Configuration
//public class CubridConfig {
//	@Bean(name = "CubridDataSource")
//	@ConfigurationProperties(prefix = "spring.datasource.cubrid")
//	public DataSource FirstDataSource() {
//		return DataSourceBuilder.create().build();
//	}
//
//	@Bean(name = "CubridSessionFactory")
//	public SqlSessionFactory sqlSessionFactory(@Qualifier("CubridDataSource") DataSource dataSource)
//			throws Exception {
//
//		SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
//		sqlSessionFactoryBean.setDataSource(dataSource);
//		sqlSessionFactoryBean
//				.setMapperLocations(new PathMatchingResourcePatternResolver().getResources("egovframework/mapper/let/a2m/gov/cubrid/*.xml"));
//		return sqlSessionFactoryBean.getObject();
//	}
//
//	@Bean(name = "CubridSessionTemplate")
//	public SqlSessionTemplate sqlSessionTemplate(
//			@Qualifier("CubridSessionFactory") SqlSessionFactory sessionTemplate) {
//		return new SqlSessionTemplate(sessionTemplate);
//	}
//
//	@Bean(name = "CubridTransactionManager")
//	public DataSourceTransactionManager PrimaryTransactionManager(
//			@Qualifier("CubridDataSource") DataSource dataSource) {
//
//		return new DataSourceTransactionManager(dataSource);
//	}
//}
