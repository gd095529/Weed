package com.yju.bookscovery.service;

import com.yju.bookscovery.dao.FavoriteDao;
import com.yju.bookscovery.dao.MemberDao;
import com.yju.bookscovery.dao.PopularMemberDao;
import com.yju.bookscovery.dao.SearchHistoryDao;
import com.yju.bookscovery.dto.MemberDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.util.List;

@Service
public class MemberServiceImpl implements MemberService {
    @Autowired
    MemberDao memberDao;

    @Autowired
    FavoriteDao favoriteDao;

    @Autowired
    SearchHistoryDao searchHistoryDao;

    @Autowired
    PopularMemberDao popularMemberDao;

    @Override
    public MemberDto readById(String id) throws Exception{
        MemberDto member = memberDao.selectById(id);
        return  member;
    }

    @Override
    public MemberDto read(Integer member_id) throws Exception{
        MemberDto member = memberDao.selectMember(member_id);
        return  member;
    }

    @Override
    public int update(MemberDto dto) throws Exception{
        return memberDao.updateMember(dto);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public int remove(Integer member_id) throws Exception{
        favoriteDao.deleteAllByMemberFavorite(member_id);
        searchHistoryDao.deleteAllHistory(member_id);
        popularMemberDao.deleteAllPopularByMember(member_id);
        return memberDao.deleteMember(member_id);
    }

    @Override
    public int add(MemberDto dto) throws Exception{
        return memberDao.insertMember(dto);
    }

    @Override
    public List<MemberDto> readAll() throws Exception{
        return memberDao.selectAll();
    }

    @Override
    public String getHashPwd(String salt, String pwd) throws Exception{
        //salt와 password를 섞어 해싱암호화
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        md.update(salt.getBytes());
        md.update(pwd.getBytes());
        //바이트 배열 양의 정수로 변환, 16진수 문자열로 포맷팅
        return String.format("%064x", new BigInteger(1, md.digest()));
    }
}
