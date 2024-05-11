package com.yju.bookscovery.dao;

import com.yju.bookscovery.dto.User;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UsersDao {

    @Autowired
    SqlSession session;

    String namespace="com.yju.bookscovery.dao.UsersMapper.";

    public User selectUser(String id) throws Exception{
        return session.selectOne(namespace+"selectUser",id);
    }
}
