package com.yju.bookscovery.dao;

import com.yju.bookscovery.dto.SearchHistoryDto;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class SearchHistoryDao {
    @Autowired
    SqlSession session;

    String namespace="com.yju.bookscovery.dao.SearchHistoryMapper.";

    public int countHistory()throws Exception{
        return session.selectOne(namespace+"count");
    }
    public SearchHistoryDto selectHistory(Integer search_history_id, Integer member_id)throws Exception{
        Map map = new HashMap();
        map.put("search_history_id",search_history_id);
        map.put("member_id",member_id);
        return session.selectOne(namespace+"selectOne",map);
    }
    public List<SearchHistoryDto> searchAllHistory()throws Exception{
        return session.selectList(namespace+"selectAll");
    }
    public int insertHistroy(Integer member_id , Integer book_id) throws Exception{
        Map map = new HashMap();
        map.put("member_id",member_id);
        map.put("book_id",book_id);
        return session.insert(namespace+"insert",map);
    }
    public int deleteAllHistory(Integer member_id) throws Exception{
        return session.delete(namespace+"deleteAll",member_id);
    }
    public int deleteHistory(Integer search_history_id, Integer member_id) throws Exception{
        Map map = new HashMap();
        map.put("search_history_id",search_history_id);
        map.put("member_id",member_id);
        return session.delete(namespace+"deleteOne",map);
    }

}
