package com.yju.bookscovery.service;

import com.yju.bookscovery.dao.SearchHistoryDao;
import com.yju.bookscovery.dto.SearchHistoryDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SearchHistoryService {
    @Autowired
    SearchHistoryDao searchHistoryDao;

    public SearchHistoryDto select(Integer search_history_id, Integer member_id) throws Exception{
        return searchHistoryDao.selectHistory(search_history_id, member_id);
    }

    public int insert(SearchHistoryDto dto) throws Exception{
        return searchHistoryDao.insertHistroy(dto);
    }

    public int delete(Integer search_history_id, Integer member_id) throws Exception{
        return searchHistoryDao.deleteHistory(search_history_id, member_id);
    }

    public int deleteAll(Integer member_id) throws Exception{
        return searchHistoryDao.deleteAllHistory(member_id);
    }
}
