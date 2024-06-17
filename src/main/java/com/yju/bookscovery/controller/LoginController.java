package com.yju.bookscovery.controller;

import com.yju.bookscovery.dto.MemberDto;
import com.yju.bookscovery.service.MemberService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.net.URLEncoder;

@RestController
public class LoginController {
    @Autowired
    MemberService memberService;

//    @GetMapping
//    public String loginForm() {
//        return "loginForm";
//    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        // 1. 세션을 종료
        session.invalidate();
        // 2. 홈으로 이동
        return ResponseEntity.ok().build();
    }

    @ResponseBody
    @PostMapping("/login")
    public ResponseEntity<String> login(String id, String password, String toURL, boolean rememberId,
                                   HttpServletRequest request, HttpServletResponse response) throws Exception {
        // 1. id와 pwd를 확인
        MemberDto member = memberService.readById(id);
        // 키로 해싱해서 pwd확인
        if(!memberService.getHashPwd(member.getPassword_key(),password).equals(member.getPassword())) {
            // 2-1   일치하지 않으면, loginForm으로 이동
            String msg = URLEncoder.encode("id 또는 pwd가 일치하지 않습니다.", "UTF-8");

            return ResponseEntity.badRequest().body(msg);
        }
        // 2-2. id와 pwd가 일치하면,
        //  세션 객체를 얻어오기
        HttpSession session = request.getSession();
        //  세션 객체에 id를 저장
        session.setAttribute("id", id);
        session.setAttribute("member_id", member.getMember_id());
        session.setAttribute("department_id", member.getDepartment_id());

        if(rememberId) {
            //     1. 쿠키를 생성
            Cookie cookie = new Cookie("id", id);
//		       2. 응답에 저장
            response.addCookie(cookie);
        } else {
            // 1. 쿠키를 삭제
            Cookie cookie = new Cookie("id", id);
            cookie.setMaxAge(0); // 쿠키를 삭제
//		       2. 응답에 저장
            response.addCookie(cookie);
        }
//		       3. 홈으로 이동
        toURL = toURL==null || toURL.equals("") ? "/" : toURL;

        return ResponseEntity.ok().body(toURL);
    }

    //추가 아이디 찾기

    //추가 비밀번호 찾기

}