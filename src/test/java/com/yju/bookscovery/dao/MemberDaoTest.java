package com.yju.bookscovery.dao;

import com.yju.bookscovery.dto.MemberDto;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mybatis.spring.boot.test.autoconfigure.MybatisTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.context.annotation.Import;

import java.time.LocalDateTime;
import java.util.List;

//@SpringBootTest
@MybatisTest
@Import(MemberDao.class)
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class MemberDaoTest {
    @Autowired
    MemberDao member;

    LocalDateTime now = LocalDateTime.now();

    @Test
    void countMember() throws Exception {
        member.deleteAllMember();
        Assertions.assertThat(member.countMember()==0);
        MemberDto memberDto = new MemberDto(null, "차","남",12,1,"gd","asdf","asdf","gd@gd","white");
        MemberDto memberDto1 = new MemberDto(null,"대","여",12,1,"asdf","asdf","asdf","gd@na","black");
        Assertions.assertThat(member.insertMember(memberDto)==1);
        Assertions.assertThat(member.insertMember(memberDto1)==1);
        Assertions.assertThat(member.countMember()==2);
    }

    @Test
    void selectMember() throws Exception{
        member.deleteAllMember();
        Assertions.assertThat(member.countMember()==0);
        MemberDto memberDto = new MemberDto(null, "차","남",12,1,"gd","asdf","asdf","gd@gd","white");
        Assertions.assertThat(member.insertMember(memberDto)==1);
        MemberDto memberDto1 = member.selectAll().get(0);
        Assertions.assertThat(memberDto.getPassword()).isEqualTo(memberDto1.getPassword());
    }

    @Test
    void selectAll() throws Exception{
        member.deleteAllMember();
        Assertions.assertThat(member.countMember()==0);
        List<MemberDto> allMember = member.selectAll();
        Assertions.assertThat(allMember.size()==0);
        MemberDto memberDto = new MemberDto(null, "차","남",12,1,"gd","asdf","asdf","gd@gd","white");
        MemberDto memberDto1 = new MemberDto(null,"대","여",12,1,"asdf","asdf","asdf","gd@na","black");
        Assertions.assertThat(member.insertMember(memberDto)==1);
        allMember = member.selectAll();
        Assertions.assertThat(allMember.size()==1);
        Assertions.assertThat(member.insertMember(memberDto1)==1);
        allMember = member.selectAll();
        Assertions.assertThat(allMember.size()==2);
    }

    @Test
    void insertMember() throws Exception{
        member.deleteAllMember();
        Assertions.assertThat(member.countMember()==0);
        MemberDto memberDto = new MemberDto(null, "차","남",12,1,"gd","asdf","asdf","gd@gd","white");
        Assertions.assertThat(member.insertMember(memberDto)==1);
        Assertions.assertThat(member.countMember()==1);
        Assertions.assertThat(memberDto.getName()).isEqualTo(member.selectMember(num).getName());

    }

    @Test
    void updateMember() throws Exception {
        member.deleteAllMember();
        Assertions.assertThat(member.countMember()==0);
        MemberDto memberDto = new MemberDto(null, "차","남",12,1,"gd","asdf","asdf","gd@gd","white");
        Assertions.assertThat(member.insertMember(memberDto)==1);
        MemberDto memberDto1 = member.selectMember("gd");
        memberDto1.setPassword("fdsa");
        Assertions.assertThat(member.updateMember(memberDto1)==1);
        Assertions.assertThat(member.selectMember(memberDto1.getMember_id()).getPassword()).isEqualTo("fdsa");
    }

    @Test
    void deleteMember() throws Exception {
        member.deleteAllMember();
        Assertions.assertThat(member.countMember()==0);
        MemberDto memberDto = new MemberDto(null, "차","남",12,1,"gd","asdf","asdf","gd@gd","white");
        Assertions.assertThat(member.insertMember(memberDto)==1);
        Assertions.assertThat(member.countMember()==1);
    }

    @Test
    void deleteAllMember() throws Exception {
        member.deleteAllMember();
        Assertions.assertThat(member.countMember()==0);
        MemberDto memberDto = new MemberDto(null, "차","남",12,1,"gd","asdf","asdf","gd@gd","white");
        MemberDto memberDto1 = new MemberDto(null,"대","여",12,1,"asdf","asdf","asdf","gd@na","black");
        Assertions.assertThat(member.insertMember(memberDto)==1);
        Assertions.assertThat(member.countMember()==1);
        Assertions.assertThat(member.insertMember(memberDto1)==1);
        Assertions.assertThat(member.countMember()==2);
        member.deleteAllMember();
        Assertions.assertThat(member.countMember()==0);
    }
}