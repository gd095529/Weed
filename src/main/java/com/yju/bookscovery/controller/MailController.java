//package com.yju.bookscovery.controller;
//
//import com.yju.bookscovery.service.AuthService;
//import com.yju.bookscovery.service.MemberService;
//import jakarta.servlet.http.HttpSession;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequestMapping("/mail")
//public class MailController {
//    @Autowired
//    MemberService memberService;
//
//    @Autowired
//    AuthService authService;
//
//
//    @PostMapping("/send_code")
//    public ResponseEntity<String> sendVerificationCode(@RequestParam String email, HttpSession session) {
//            authService.sendVerificationCode(email, session); //인증 이메일 보냈음 인증번호랑
//            return ResponseEntity.ok().body("메일로 인증번호를 보냈습니다.");
//    }
//
//    @PostMapping("/verify_code")
//    public ResponseEntity<String> verifyCode(@RequestParam String code, HttpSession session) {
//        boolean isValid = authService.verifyCode(code, session);
//        if(isValid){
//            return ResponseEntity.ok().body("인증 완료되었습니다. 비밀번호를 설정해주세요.");
//        }else
//            return ResponseEntity.ok().body("인증번호 다릅니다.");
//    }
//}
