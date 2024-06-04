package com.yju.bookscovery.controller;

import com.yju.bookscovery.dto.MemberDto;
import com.yju.bookscovery.service.MemberService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.SecureRandom;
import java.util.Base64;

@RestController
@RequestMapping("/join")
public class MemberController {
    @Autowired
    MemberService memberService;

    @PostMapping("/add")
    public ResponseEntity<?> addMember(@RequestBody MemberDto member) throws Exception {
        //salt 랜덤 생성
        SecureRandom random = SecureRandom.getInstanceStrong();
        byte[] bytes = new byte[16];
        random.nextBytes(bytes);
        String salt = new String(Base64.getEncoder().encode(bytes));

        member.setPassword(memberService.getHashPwd(salt,member.getPassword()));
        member.setPassword_key(salt);
        try {
            memberService.add(member);
        }catch (Exception e){
            return ResponseEntity.badRequest().body("사용자 등록 실패");
        }

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/remove/{member_id}")
    public  ResponseEntity<?> removeMember(@PathVariable Integer member_id, String password, HttpSession session) throws Exception {
        session.invalidate();
        //세션에 멤버아디를 저장해도되는가?
        MemberDto member =memberService.read(member_id);

        String salt = member.getPassword_key();

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
    
    //아이디찾기 추가
    //비밀번호찾기 추가
}
