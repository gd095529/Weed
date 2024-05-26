package com.yju.bookscovery.dao;

import com.yju.bookscovery.dto.PopularBookDto;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

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

    public int insertPopular(PopularBookDto dto) throws Exception{
        return session.insert(namespace+"insert",dto);
    }

    public int deleteAllPopularByMember(Integer member_id)throws Exception{
        return session.delete(namespace+"deleteAll",member_id);
    }

    public int deletePopular(Integer popular_book_member_id)throws Exception{
        return session.delete(namespace+"deleteOne",popular_book_member_id);
    }

}
