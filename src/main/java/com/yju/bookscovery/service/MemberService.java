package com.yju.bookscovery.service;

import com.yju.bookscovery.dao.FavoriteDao;
import com.yju.bookscovery.dao.MemberDao;
import com.yju.bookscovery.dao.RecommandBookDao;
import com.yju.bookscovery.dao.SearchHistoryDao;
import com.yju.bookscovery.dto.MemberDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class MemberService {
    @Autowired
    MemberDao memberDao;

    @Autowired
    RecommandBookDao recommandBookDao;

    @Autowired
    FavoriteDao favoriteDao;

    @Autowired
    SearchHistoryDao searchHistoryDao;

    public MemberDto read(String id) throws Exception{
        MemberDto member = memberDao.selectMember(id);
        return  member;
    }

    public int update(MemberDto dto) throws Exception{
        return memberDao.updateMember(dto);
    }

    @Transactional(rollbackFor = Exception.class)
    public int remove(Integer member_id) throws Exception{
        favoriteDao.deleteAllFavorite(member_id);
        searchHistoryDao.deleteAllHistory(member_id);
        recommandBookDao.deleteAllRecommand(member_id);
        return memberDao.deleteMember(member_id);
    }

    public int add(MemberDto dto) throws Exception{
        return memberDao.insertMember(dto);
    }

    public List<MemberDto> readAll() throws Exception{
        return memberDao.selectAll();
    }
}
