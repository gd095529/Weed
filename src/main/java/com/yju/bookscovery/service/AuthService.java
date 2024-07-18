//package com.yju.bookscovery.service;
//
//import jakarta.servlet.http.HttpSession;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.security.SecureRandom;
//import java.util.Base64;
//import java.util.List;
//
//@Service
//public class AuthService {
//    @Autowired
//    private SendEmailService emailService;
//
//    public void sendVerificationCode(String email, HttpSession session) {
//        String verificationCode = generateVerificationCode();
//        session.setAttribute("verificationCode", verificationCode);
//        session.setAttribute("verificationCodeExpiry", System.currentTimeMillis() + 3 * 60 * 1000); // 3분제한
//
//        String subject = "이메일 인증 코드";
//        String message = "인증 코드 : " + verificationCode;
//        List<String> receivers = null;
//        emailService.send(subject, message, receivers);
//    }
//
//    private String generateVerificationCode() {
//        SecureRandom random = new SecureRandom();
//        byte[] bytes = new byte[6];
//        random.nextBytes(bytes);
//        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes).substring(0, 6);
//    }
//
//    public boolean verifyCode(String code, HttpSession session) {
//        String sessionCode = (String) session.getAttribute("verificationCode");
//        Long expiryTime = (Long) session.getAttribute("verificationCodeExpiry");
//
//        if (sessionCode == null || expiryTime == null || System.currentTimeMillis() > expiryTime) {
//            return false;
//        }
//
//        return sessionCode.equals(code);
//    }
//}
