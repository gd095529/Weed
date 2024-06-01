package com.yju.bookscovery.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/test123")
public class BookController {
//    @Autowired
    @GetMapping("/ok")
    public ResponseEntity<?> test(){
        return ResponseEntity.ok().build();
    }
}
