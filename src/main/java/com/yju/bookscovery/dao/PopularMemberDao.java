package com.yju.bookscovery.dao;

import com.yju.bookscovery.dto.PopularBookDto;
import com.yju.bookscovery.dto.PopularMemberDto;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class PopularMemberDao {
    @Autowired
    SqlSession session;

    String namespace="com.yju.bookscovery.dao.PopularMemberMapper.";

    public PopularBookDto selectPopular(Integer popular_book_member_id)throws Exception{
        return session.selectOne(namespace+"selectOne",popular_book_member_id);
    }

    public List<PopularBookDto> selectAllPopularByMember(Integer member_id)throws Exception{
        return session.selectList(namespace+"selectAllByMember",member_id);
    }

    public int insertPopularMember(Integer popular_id, Integer member_id) throws Exception{
        Map map = new HashMap();
        map.put("popular_id", popular_id);
        map.put("member_id", member_id);
        return session.insert(namespace+"insert",map);
    }

    public int deleteAllPopularByMember(Integer member_id)throws Exception{
        return session.delete(namespace+"deleteAll",member_id);
    }

    public int deletePopularMember(Integer popular_book_member_id)throws Exception{
        return session.delete(namespace+"deleteOne",popular_book_member_id);
    }

}
