package com.yju.bookscovery.controller;

import com.yju.bookscovery.dto.MemberDto;
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

    @PostMapping("/check_id")
    public ResponseEntity<String> checkId(String id) throws Exception {
        MemberDto memberDto = memberService.readById(id);
        if (memberDto == null) {
            return ResponseEntity.ok().body("회원가입 가능한 아이디입니다.");
        }else
            return ResponseEntity.ok().body("이미 존재하는 아이디입니다.");
    }

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
            return ResponseEntity.ok().body(member);
            //수정 페이지 보여주기
        }else{
            return ResponseEntity.badRequest().body("비밀번호 오류");
        }
    }

    @PutMapping("/modify")
    public  ResponseEntity<?> modifyMember(@RequestBody MemberDto memberDto) throws Exception {
        memberService.update(memberDto);
        return ResponseEntity.ok().body("수정되었습니다.");
    }

    @PostMapping("/find_id")
    public  ResponseEntity<?> findId(@RequestParam String email, String name) throws Exception {
        MemberDto member = memberService.readByEmail(email);
        if(member.getName().equals(name)) {
//            emailService.sendEmail(email, "Bookscovery 내 아이디 찾기 결과입니다.", "Bookscovery 아이디는 <" + memberService.readByEmail(email) + ">입니다.");
//            return ResponseEntity.ok().body("메일로 아이디를 보냈습니다.");
            return ResponseEntity.ok().body(member.getId());
        }else{
            return ResponseEntity.badRequest().body("상세정보가 다릅니다.");
        }
    }

    @PostMapping("/find_pwd")
    public  ResponseEntity<?> findPwd(@RequestParam String email, String name, String id) throws Exception {
        MemberDto member = memberService.readByEmail(email);
        if (member == null) {
            return ResponseEntity.badRequest().body("그런 계정 없습니다.");
        }
        if(member.getName().equals(name) && member.getId().equals(id)) {
            return ResponseEntity.ok().body("계정확인 인증번호 전송페이지로 이동");
        }else{
            return ResponseEntity.ok().body("상세정보가 다릅니다.");
        }
    }

    @PostMapping("/reset_password")
    public  ResponseEntity<?> resetPassword(@RequestParam String email, String password) throws Exception {
        MemberDto member = memberService.readByEmail(email);

        String salt = memberService.getSalt();
        member.setPassword(memberService.getHashPwd(salt,password));
        member.setPassword_key(salt);

        memberService.update(member);
        return ResponseEntity.ok().body("비밀번호 수정 완료");
    }
}
