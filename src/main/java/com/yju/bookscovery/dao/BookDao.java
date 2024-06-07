package com.yju.bookscovery.dao;

import com.yju.bookscovery.dto.BookDto;
import com.yju.bookscovery.dto.DepartmentCountBookJoinDto;
import com.yju.bookscovery.dto.FavoriteBookJoinDto;
import com.yju.bookscovery.dto.HistoryBookJoinDto;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BookDao {
    @Autowired
    SqlSession session;

    String namespace="com.yju.bookscovery.dao.BookMapper.";

    public BookDto selectBook(Integer book_id) throws Exception{
        return session.selectOne(namespace+"selectOne",book_id);
    }

    public Integer check(Integer book_id) throws Exception{
        return session.selectOne(namespace+"check",book_id);
    }

    public Integer checkByISBN(String isbn) throws Exception{
        return session.selectOne(namespace+"checkByISBN",isbn);
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

    public List<DepartmentCountBookJoinDto> selectTopByDepartment(Integer department_id) throws Exception{
        return session.selectList(namespace+"departmentCountJoin",department_id);
    }

    public List<FavoriteBookJoinDto> selectAllFavoriteByMemberId(Integer member_id) throws Exception{
        return session.selectList(namespace+"favoriteBookJoin",member_id);
    }

    public List<HistoryBookJoinDto> selectAllHistoryByMemberId(Integer member_id) throws Exception{
        return session.selectList(namespace+"historyBookJoin",member_id);
    }
}
