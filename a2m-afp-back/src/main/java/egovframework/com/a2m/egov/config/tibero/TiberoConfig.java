//package egovframework.com.a2m.egov.config.tibero;
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
//@MapperScan(basePackages = "egovframework.com.a2m.egov.dao.tibero", sqlSessionTemplateRef = "TiberoSessionTemplate")
//@Configuration
//public class TiberoConfig {
//	@Bean(name = "TiberoDataSource")
//	@ConfigurationProperties(prefix = "spring.datasource.tibero")
//	public DataSource FirstDataSource() {
//		return DataSourceBuilder.create().build();
//	}
//
//	@Bean(name = "TiberoSessionFactory")
//	public SqlSessionFactory sqlSessionFactory(@Qualifier("TiberoDataSource") DataSource dataSource)
//			throws Exception {
//
//		SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
//		sqlSessionFactoryBean.setDataSource(dataSource);
//		sqlSessionFactoryBean
//				.setMapperLocations(new PathMatchingResourcePatternResolver().getResources("egovframework/mapper/let/a2m/gov/tibero/*.xml"));
//		return sqlSessionFactoryBean.getObject();
//	}
//
//	@Bean(name = "TiberoSessionTemplate")
//	public SqlSessionTemplate sqlSessionTemplate(
//			@Qualifier("TiberoSessionFactory") SqlSessionFactory sessionTemplate) {
//		return new SqlSessionTemplate(sessionTemplate);
//	}
//
//	@Bean(name = "TiberoTransactionManager")
//	public DataSourceTransactionManager PrimaryTransactionManager(
//			@Qualifier("TiberoDataSource") DataSource dataSource) {
//
//		return new DataSourceTransactionManager(dataSource);
//	}
//}
