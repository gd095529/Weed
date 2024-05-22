package com.yju.bookscovery.service;

import com.yju.bookscovery.dao.RecommandBookDao;
import com.yju.bookscovery.dto.RecommandBookDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecommandBookService {
    @Autowired
    RecommandBookDao recommandBookDao;

    public RecommandBookDto select(Integer recommand_id, Integer member_id) throws Exception{
        return recommandBookDao.selectRecommand(recommand_id, member_id);
    }

    public int insert(RecommandBookDto dto)throws Exception{
        return recommandBookDao.insertRecommand(dto);
    }

    public List<RecommandBookDto> selectAll() throws Exception{
        return recommandBookDao.selectAllRecommand();
    }

    public int delete(Integer recommandBook_id, Integer member_id) throws Exception{
        return recommandBookDao.deleteRecommand(recommandBook_id, member_id);
    }


}
