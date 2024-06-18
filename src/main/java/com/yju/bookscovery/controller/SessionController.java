package com.yju.bookscovery.controller;

import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/session")
public class SessionController {
    @GetMapping("/member_id")
    public ResponseEntity<?> getMember_id(HttpSession session) {
        if(session == null){
            return ResponseEntity.badRequest().body("로그인이 필요합니다.");
        }else
            return ResponseEntity.ok().body((Integer) session.getAttribute("member_id"));
    }
    @GetMapping("/department_id")
    public ResponseEntity<?> getDepartment_id(HttpSession session) {
        if(session == null){
            return ResponseEntity.badRequest().body("로그인이 필요합니다.");
        }else
            return ResponseEntity.ok().body((Integer) session.getAttribute("department_id"));
    }
    @GetMapping("/id")
    public ResponseEntity<?> getId(HttpSession session) {
        if(session == null){
            return ResponseEntity.badRequest().body("로그인이 필요합니다.");
        }else
            return ResponseEntity.ok().body((Integer) session.getAttribute("id"));
    }

    @GetMapping("/name")
    public ResponseEntity<?> getName(HttpSession session) {
        if(session == null){
            return ResponseEntity.badRequest().body("로그인이 필요합니다.");
        }else
            return ResponseEntity.ok().body((String) session.getAttribute("name"));
    }
}
