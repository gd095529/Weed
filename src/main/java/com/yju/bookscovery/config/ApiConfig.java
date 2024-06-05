package com.yju.bookscovery.config;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
@PropertySource("classpath:config.properties")
@Getter
public class ApiConfig {
    @Bean // http 요청 빌더
    public WebClient.Builder webClientApiReq() {
        return WebClient.builder();
    }

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
