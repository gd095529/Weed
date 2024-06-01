//package com.yju.bookscovery.service;
//
//import com.yju.bookscovery.dao.KeywordDao;
//import com.yju.bookscovery.dto.KeywordDto;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class KeywordService {
//    @Autowired
//    KeywordDao keywordDao;
//
//    public KeywordDto select(String keyword) throws Exception{
//        return keywordDao.selectKeyword(keyword);
//    }
//
//    public int insert(String keyword) throws Exception{
//        return keywordDao.insertKeyword(keyword);
//    }
//
//    public int deleteAll() throws Exception{
//        return keywordDao.deleteAllKeyword();
//    }
//
//    public List<KeywordDto> selectAll() throws Exception{
//        return keywordDao.selectAllKeyword();
//    }
//}
