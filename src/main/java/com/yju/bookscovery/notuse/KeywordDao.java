//package com.yju.bookscovery.dao;
//
//import com.yju.bookscovery.dto.KeywordDto;
//import org.apache.ibatis.session.SqlSession;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Repository;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//@Repository
//public class KeywordDao {
//    @Autowired
//    SqlSession session;
//
//    String namespace = "com.yju.bookscovery.dao.KeywordMapper.";
//
//    public int countKeyword() throws Exception{
//        return session.selectOne(namespace+"count");
//    }
//    public KeywordDto selectKeyword(String keyword) throws Exception{
//        return session.selectOne(namespace+"selectOne",keyword);
//    }
//    public List<KeywordDto> selectAllKeyword() throws Exception{
//        return session.selectList(namespace+"selectAll");
//    }
//    public int insertKeyword(String keyword) throws Exception{
//        return session.insert(namespace+"insert",keyword);
//    }
//    public int updateKeyword(String keyword, String modKeyword) throws Exception{
//        Map map = new HashMap<>();
//        map.put("keyword",keyword);
//        map.put("modKeyword",modKeyword);
//        return session.update(namespace+"update",map);
//    }
//    public int deleteAllKeyword() throws Exception{
//        return session.delete(namespace+"deleteAll");
//    }
//    public int deleteKeyword(String keyword) throws Exception{
//        return session.delete(namespace+"deleteOne",keyword);
//    }
//}
