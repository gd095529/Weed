package com.yju.bookscovery.dao;

import com.yju.bookscovery.dto.MemberDto;

import java.util.List;

public interface MemberDao {
    int countMember() throws Exception;

    MemberDto selectMember(Integer member_id) throws Exception;

    List<MemberDto> selectAll() throws Exception;

    MemberDto selectById(String id) throws Exception;

    List<MemberDto> selectAllByDepartment(Integer department_id) throws Exception;

    int insertMember(MemberDto member) throws Exception;

    int updateMember(MemberDto member) throws Exception;

    int deleteMember(Integer member_id) throws Exception;

    int deleteAllMember() throws Exception;
}
