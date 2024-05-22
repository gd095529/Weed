package com.yju.bookscovery.dao;

import com.yju.bookscovery.dto.BookCountDto;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class BookCountDao {
    @Autowired
    SqlSession session;

    String namespace="com.yju.bookscovery.dao.bookCountMapper.";

    public int countBook()throws Exception{
        return session.selectOne(namespace+"count");
    }
    public BookCountDto selectBook(Integer book_count_id, Integer department_id)throws Exception{
        Map map = new HashMap();
        map.put("book_count_id",book_count_id);
        map.put("department_id",department_id);
        return session.selectOne(namespace+"selectOne",map);
    }
    public List<BookCountDto> selectAllBook()throws Exception{
        return session.selectList(namespace+"selectAll");
    }
    public int insertBook(BookCountDto dto)throws Exception{
        return session.insert(namespace+"insert",dto);
    }
    public int updateBook(BookCountDto dto)throws Exception{
        return session.update(namespace+"update",dto);
    }
    public int deleteAllBook(Integer department_id)throws Exception{
        return session.delete(namespace+"deleteAll", department_id);
    }
    public int deleteBook(Integer book_count_id, Integer department_id)throws Exception{
        Map map = new HashMap();
        map.put("book_count_id",book_count_id);
        map.put("department_id",department_id);
        return session.delete(namespace+"deleteOne",map);
    }
}

