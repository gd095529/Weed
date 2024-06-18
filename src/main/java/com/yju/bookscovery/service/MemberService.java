package com.yju.bookscovery.service;

import com.yju.bookscovery.dto.MemberDto;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface MemberService {
    MemberDto readById(String id) throws Exception;

    MemberDto read(Integer member_id) throws Exception;

    MemberDto readByEmail(String email) throws Exception;

    int update(MemberDto dto) throws Exception;

    @Transactional(rollbackFor = Exception.class)
    int remove(Integer member_id) throws Exception;

    int add(MemberDto dto) throws Exception;

    List<MemberDto> readAll() throws Exception;

    String getHashPwd(String salt, String pwd) throws Exception;

    String getSalt() throws Exception;
}
