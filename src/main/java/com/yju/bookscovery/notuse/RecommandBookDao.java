//package com.yju.bookscovery.dao;
//
//import com.yju.bookscovery.dto.RecommandBookDto;
//import org.apache.ibatis.session.SqlSession;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Repository;
//
//import java.util.HashMap;
//import java.util.List;
//import java.util.Map;
//
//@Repository
//public class RecommandBookDao {
//    @Autowired
//    SqlSession session;
//
//    String namespace="com.yju.bookscovery.dao.RecommandBookMapper.";
//
//    public int countRecommand() throws Exception{
//        return session.selectOne(namespace+"count");
//    }
//    public RecommandBookDto selectRecommand(Integer recommand_id, Integer member_id) throws Exception{
//        Map map = new HashMap();
//        map.put("recommand_id",recommand_id);
//        map.put("member_id",member_id);
//        return session.selectOne(namespace+"selectOne",map);
//    }
//    public List<RecommandBookDto> selectAllRecommand()throws Exception{
//        return session.selectList(namespace+"selectAll");
//    }
//    public int insertRecommand(RecommandBookDto dto) throws Exception{
//        return session.insert(namespace+"insert",dto);
//    }
//    public int deleteAllRecommand(Integer member_id) throws Exception{
//        return session.delete(namespace+"deleteAll",member_id);
//    }
//    public int deleteRecommand(Integer recommand_id, Integer member_id)throws Exception{
//        Map map = new HashMap();
//        map.put("recommand_id",recommand_id);
//        map.put("member_id",member_id);
//        return session.delete(namespace+"deleteOne",map);
//    }
//
//}
