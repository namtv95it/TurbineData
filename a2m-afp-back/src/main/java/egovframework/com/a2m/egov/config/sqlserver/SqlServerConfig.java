//package egovframework.com.a2m.egov.config.sqlserver;
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
//@MapperScan(basePackages = "egovframework.com.a2m.egov.dao.sqlserver", sqlSessionTemplateRef = "SqlServerSessionTemplate")
//@Configuration
//public class SqlServerConfig {
//	@Bean(name = "SqlServerDataSource")
//	@ConfigurationProperties(prefix = "spring.datasource.sqlserver")
//	public DataSource SecondDataSource() {
//		return DataSourceBuilder.create().build();
//	}
//
//	@Bean(name = "SqlServerSessionFactory")
//	public SqlSessionFactory sqlSessionFactory(@Qualifier("SqlServerDataSource") DataSource dataSource)
//			throws Exception {
//
//		SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
//		sqlSessionFactoryBean.setDataSource(dataSource);
//		sqlSessionFactoryBean
//				.setMapperLocations(new PathMatchingResourcePatternResolver().getResources("egovframework/mapper/let/a2m/gov/sqlserver/*.xml"));
//		return sqlSessionFactoryBean.getObject();
//	}
//
//	@Bean(name = "SqlServerSessionTemplate")
//	public SqlSessionTemplate sqlSessionTemplate(
//			@Qualifier("SqlServerSessionFactory") SqlSessionFactory sessionTemplate) {
//		return new SqlSessionTemplate(sessionTemplate);
//	}
//
//	@Bean(name = "SqlServerTransactionManager")
//	public DataSourceTransactionManager PrimaryTransactionManager(
//			@Qualifier("SqlServerDataSource") DataSource dataSource) {
//
//		return new DataSourceTransactionManager(dataSource);
//	}
//}
