package com.yju.bookscovery.service;

import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import reactor.core.publisher.Mono;

@Component
public class ScheduledTasks {
    @Autowired
    private LibraryDataService libraryDataService;
//    private final RestTemplate restTemplate = new RestTemplate();

    @Scheduled(cron = "0 0 0 1 * ?")
    public void performApiRequest() {
        libraryDataService.saveKeyword();
    }
}