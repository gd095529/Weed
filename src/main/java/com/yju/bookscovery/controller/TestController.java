package com.yju.bookscovery.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @GetMapping("/api/test")
    public ResponseEntity<?> test() {

        return ResponseEntity.badRequest().build();
    }


}