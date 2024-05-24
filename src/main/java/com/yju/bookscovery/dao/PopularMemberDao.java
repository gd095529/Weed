package com.yju.bookscovery.dao;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class PopularMemberDao {
    @Autowired
    SqlSession session;

    String namespace="com.yju.bookscovery.dao.PopularMemberMapper.";

    public int selectPoupularMember(Integer popular_book_member_id)throws Exception{
        return session.selectOne(namespace+"selectOne",popular_book_member_id);
    }

}
