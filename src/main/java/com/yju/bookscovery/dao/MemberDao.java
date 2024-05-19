package com.yju.bookscovery.dao;

import com.yju.bookscovery.dto.MemberDto;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class MemberDao {
    @Autowired
    SqlSession session;

    String namespace = "com.yju.bookscovery.dao.MemberMapper.";

    public int countMember()throws Exception{
        return session.selectOne(namespace+"count");
    }

    public MemberDto selectMember(Integer member_id) throws Exception{
        return session.selectOne(namespace+"selectOne",member_id);
    }
    public MemberDto selectMember(String id) throws Exception{
        return session.selectOne(namespace+"selectById",id);
    }

    public List<MemberDto> selectAll() throws Exception{
        return session.selectList(namespace+"selectAll");
    }

    public int insertMember(MemberDto member) throws Exception{
        return session.insert(namespace+"insert",member);
    }

    public int updateMember(MemberDto member) throws Exception{
        return session.update(namespace+"update",member);
    }

    public int deleteMember(Integer member_id) throws Exception{
        return session.delete(namespace+"deleteOne",member_id);
    }

    public int deleteAllMember() throws Exception{
        return session.delete(namespace+"deleteAll");
    }
}
