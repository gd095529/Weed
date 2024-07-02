package com.yju.bookscovery;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class BookscoveryApplication {

    public static void main(String[] args) {
        SpringApplication.run(BookscoveryApplication.class, args);
    }

}
