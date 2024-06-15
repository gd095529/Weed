package com.yju.bookscovery.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
@PropertySource("classpath:config.properties")
@Getter
public class ApiConfig {
    @Bean // http 요청 빌더
    public WebClient.Builder webClientApiReq() {
        return WebClient.builder();
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

//    @Bean //한글변환필터
//    public FilterRegistrationBean<CharacterEncodingFilter> encodingFilter() {
//        CharacterEncodingFilter filter = new CharacterEncodingFilter();
//        filter.setEncoding("UTF-8");
//        filter.setForceEncoding(true);
//
//        FilterRegistrationBean<CharacterEncodingFilter> filterRegistrationBean = new FilterRegistrationBean<>();
//        filterRegistrationBean.setFilter(filter);
//        filterRegistrationBean.addUrlPatterns("/*");
//        filterRegistrationBean.setOrder(1); // 필터의 순서를 지정합니다.
//        return filterRegistrationBean;
//    }

    @Value("${LIBRARY_API_KEY}")
    private String LIBRARY_API_KEY;
    @Value("${POPULAR_URL}")
    private String POPULAR_URL;
    @Value("${MANIA_URL}")
    private String MANIA_URL;
    @Value("${EXTENSIVE_READ_URL}")
    private String EXTENSIVE_READ_URL;
    @Value("${DETAIL_URL}")
    private String DETAIL_URL;
    @Value("${DETAIL_KEYWORD_URL}")
    private String DETAIL_KEYWORD_URL;
    @Value("${LOAN_ANALYZE_URL}")
    private String LOAN_ANALYZE_URL;
    @Value("${LOAN_INCREASE_URL}")
    private String LOAN_INCREASE_URL;
    @Value("${SEARCH_BOOK_URL}")
    private String SEARCH_BOOK_URL;
    @Value("${MONTH_KEYWORD_URL}")
    private String MONTH_KEYWORD_URL;


}
