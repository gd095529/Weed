package com.yju.bookscovery.dao;

import com.yju.bookscovery.dto.BookDto;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class BookDao {
    @Autowired
    SqlSession session;

    String namespace="com.yju.bookscovery.dao.BookMapper.";

    public BookDto selectBook(Integer book_id) throws Exception{
        return session.selectOne(namespace+"selectOne",book_id);
    }

    public int insertBook(BookDto dto) throws Exception{
        return session.insert(namespace+"insert",dto);
    }

    public int deleteAll()throws Exception{
        return session.delete(namespace+"deleteAll");
    }

    public int deleteBook(Integer book_id)throws Exception{
        return session.delete(namespace+"deleteOne",book_id);
    }


}
