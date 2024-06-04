package com.yju.bookscovery.dao;

import com.yju.bookscovery.dto.BookDto;
import com.yju.bookscovery.dto.PopularBookDto;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class PopularBookDao {
    @Autowired
    SqlSession session;

    String namespace="com.yju.bookscovery.dao.PopularBookMapper.";

    public PopularBookDto selectPopularBook(Integer popular_id) {
        return session.selectOne(namespace+"selectOne", popular_id);
    }

    public int insertPopularBook(Integer book_id) {
        return session.insert(namespace+"insert", book_id);
    }

    public List<BookDto> selectAllPopularBookByMember(Integer member_id, int loan_count) {
        Map map = new HashMap();
        map.put("member_id", member_id);
        map.put("loan_count", loan_count);
        return session.selectList(namespace+"selectAllByMember",map);
    }
}
