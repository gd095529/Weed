package com.yju.bookscovery.dao;

import com.yju.bookscovery.dto.MemberDto;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class MemberDaoImpl implements MemberDao {
    @Autowired
    SqlSession session;

    String namespace = "com.yju.bookscovery.dao.MemberMapper.";

    @Override
    public int countMember()throws Exception{
        return session.selectOne(namespace+"count");
    }

    @Override
    public MemberDto selectMember(Integer member_id) throws Exception{
        return session.selectOne(namespace+"selectOne",member_id);
    }

    @Override
    public List<MemberDto> selectAll() throws Exception{
        return session.selectList(namespace+"selectAll");
    }

    @Override
    public MemberDto selectById(String id) throws Exception{
        return session.selectOne(namespace+"selectOneById",id);
    }

    @Override
    public MemberDto selectByEmail(String email) throws Exception{
        return session.selectOne(namespace+"selectOneByEmail",email);
    }


    @Override
    public List<MemberDto> selectAllByDepartment(Integer department_id) throws Exception{
        return session.selectList(namespace+"selectAllByDepartment",department_id);
    }

    @Override
    public int insertMember(MemberDto member) throws Exception{
        return session.insert(namespace+"insert",member);
    }

    @Override
    public int updateMember(MemberDto member) throws Exception{
        return session.update(namespace+"update",member);
    }

    @Override
    public int deleteMember(Integer member_id) throws Exception{
        return session.delete(namespace+"deleteOne",member_id);
    }

    @Override
    public int deleteAllMember() throws Exception{
        return session.delete(namespace+"deleteAll");
    }
}
