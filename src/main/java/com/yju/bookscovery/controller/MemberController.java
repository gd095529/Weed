package com.yju.bookscovery.controller;

import com.yju.bookscovery.dto.MemberDto;
import com.yju.bookscovery.service.AuthService;
import com.yju.bookscovery.service.EmailService;
import com.yju.bookscovery.service.MemberService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/join")
public class MemberController {
    @Autowired
    MemberService memberService;

    @Autowired
    EmailService emailService;

    @Autowired
    AuthService authService;

    @PostMapping("/add")
    public ResponseEntity<String> addMember(@RequestBody MemberDto member) throws Exception {

        String salt = memberService.getSalt();

        member.setPassword(memberService.getHashPwd(salt,member.getPassword()));
        member.setPassword_key(salt);
        try {
            memberService.add(member);
        }catch (Exception e){
            return ResponseEntity.badRequest().body("사용자 등록 실패");
        }

        return ResponseEntity.ok().body("계정 생성 완료");
    }

    @DeleteMapping("/remove")
    public  ResponseEntity<?> removeMember(String password, HttpSession session) throws Exception {
        Integer member_id = (Integer) session.getAttribute("member_id");
        //세션에 멤버아디를 저장해도되는가?
        MemberDto member =memberService.read(member_id);

        String salt = member.getPassword_key();
        session.invalidate();
        if(member.getPassword().equals(memberService.getHashPwd(salt,password))){
//            memberService.remove(member_id);
            return ResponseEntity.ok().body("탈퇴되었습니다.");
        }else{
            return ResponseEntity.badRequest().body("비밀번호 오류");
        }
    }

    @GetMapping("/modify")
    public  ResponseEntity<?> modifyMember(HttpSession session, String password) throws Exception {
        Integer member_id = (Integer) session.getAttribute("member_id");
        MemberDto member =memberService.read(member_id);

        String salt = member.getPassword_key();

        if(memberService.getHashPwd(salt, password).equals(member.getPassword())){
            return ResponseEntity.ok().build();
            //수정 페이지 보여주기
        }else{
            return ResponseEntity.badRequest().body("비밀번호 오류");
        }
    }

    @PutMapping("/modify")
    public  ResponseEntity<?> modifyMember(MemberDto memberDto) throws Exception {
        memberService.update(memberDto);
        return ResponseEntity.ok().body("수정되었습니다.");
    }

    @PostMapping("/send_code")
    public  ResponseEntity<String> sendVerificationCode(String id,@RequestParam String email, String name, HttpSession session) throws Exception {
        MemberDto member = memberService.readByEmail(email);
        if(member.getName().equals(name) && member.getId().equals(id)) {
            authService.sendVerificationCode(email, session); //인증 이메일 보냈음 인증번호랑
            return ResponseEntity.ok().body("메일로 인증번호를 보냈습니다.");
        }
        return ResponseEntity.ok().body("상세정보가 다릅니다.");
    }

    @PostMapping("/verify_code")
    public ResponseEntity<String> verifyCode(@RequestParam String code, HttpSession session) {
        boolean isValid = authService.verifyCode(code, session);
        if(isValid){
            return ResponseEntity.ok().body("인증 완료되었습니다. 비밀번호를 설정해주세요.");
        }else
            return ResponseEntity.ok().body("인증번호 다릅니다.");
    }

    @GetMapping("/find_id")
    public  ResponseEntity<?> findId(String email, String name) throws Exception {
        MemberDto member = memberService.readByEmail(email);
        if(member.getName().equals(name)) {
            emailService.sendEmail(email, "Bookscovery 내 아이디 찾기 결과입니다.", "Bookscovery 아이디는 <" + memberService.readByEmail(email) + ">입니다.");
            return ResponseEntity.ok().body("메일로 아이디를 보냈습니다.");
        }else{
            return ResponseEntity.badRequest().body("상세정보가 다릅니다.");
        }
    }

    @PostMapping("/reset_password")
    public  ResponseEntity<?> resetPassword(String email, String password) throws Exception {
        MemberDto member = memberService.readByEmail(email);

        String salt = memberService.getSalt();
        member.setPassword(memberService.getHashPwd(salt,password));
        member.setPassword_key(salt);

        memberService.update(member);
        return ResponseEntity.ok().body("비밀번호 수정 완료");
    }
}
