package com.yju.bookscovery.dto;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

class MemberDtoTest {
    LocalDateTime now = LocalDateTime.now();
    @Test
    @DisplayName("멤버 생성확인")
    void createMember(){
        MemberDto memberDto =  new MemberDto(null, "차","남",12,null,"gd","asdf","gd@gd","white",now);

        Assertions.assertThat(memberDto.getName()).isEqualTo("차");
        Assertions.assertThat(memberDto.getGender()).isEqualTo("남");
        Assertions.assertThat(memberDto.getAge()).isEqualTo(12);
        Assertions.assertThat(memberDto.getId()).isEqualTo("gd");
        Assertions.assertThat(memberDto.getPassword()).isEqualTo("asdf");
        Assertions.assertThat(memberDto.getEmail()).isEqualTo("gd@gd");
        Assertions.assertThat(memberDto.getMode()).isEqualTo("white");
    }

}