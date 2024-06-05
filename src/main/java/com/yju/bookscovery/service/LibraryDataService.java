package com.yju.bookscovery.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.yju.bookscovery.config.ApiConfig;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class LibraryDataService {

    private final ApiConfig apiConfig;
    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    public LibraryDataService(ApiConfig apiConfig, WebClient.Builder webClientApiReq, ObjectMapper objectMapper) {
        this.apiConfig = apiConfig;
        this.webClient = webClientApiReq.build();
        this.objectMapper = objectMapper;
    }

    public Mono<String> getPopularByDay(String amount, String sort, String order) {
        String url = apiConfig.getLOAN_INCREASE_URL() + "&authKey=" + apiConfig.getLIBRARY_API_KEY()
                + "&pageNo=1&pageSize=10";
        return webClient.get()
                .uri(url)
                .retrieve()
                .bodyToMono(String.class)
                .flatMap(response -> {
                    try {
                        // JSON 응답을 파싱하여 필요한 데이터만 추출
                        JsonNode jsonNode = objectMapper.readTree(response);
                        // 예시: 필요한 데이터만 추출
                        JsonNode requiredData = jsonNode.path("someField");
                        return Mono.just(requiredData.toString());
                    } catch (Exception e) {
                        return Mono.error(e);
                    }
                });
    }

    public Mono<String> getDetailBook(String isbn) {
        String url = apiConfig.getDETAIL_URL() + "&authKey=" + apiConfig.getLIBRARY_API_KEY()
                + "&isbn13=" + isbn + "&loaninfoYN=Y";
        return webClient.get()
                .uri(url)
                .retrieve()
                .bodyToMono(String.class)
                .flatMap(response -> {
                    try {
                        // JSON 응답을 파싱하여 필요한 데이터만 추출
                        JsonNode jsonNode = objectMapper.readTree(response);
                        // 필요한 데이터만 추출
                        JsonNode requiredData = jsonNode.path("book");
                        return Mono.just(requiredData.toString());
                    } catch (Exception e) {
                        return Mono.error(e);
                    }
                });
    }
}
