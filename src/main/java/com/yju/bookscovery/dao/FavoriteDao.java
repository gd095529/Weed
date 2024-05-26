package com.yju.bookscovery.dao;

import com.yju.bookscovery.dto.FavoriteDto;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FavoriteDao {
    @Autowired
    SqlSession session;

    String namespace = "com.yju.bookscovery.dao.FavoriteMapper.";

    public int countByMemberFavorite(Integer member_id)throws Exception{
        return session.selectOne(namespace+"countByMember",member_id);
    }
    public FavoriteDto selectFavorite(Integer favorite_id)throws Exception{
        return session.selectOne(namespace+"selectOne",favorite_id);
    }
    public List<FavoriteDto> selectAllByMemberFavorite(Integer member_id)throws Exception{
        return session.selectList(namespace+"selectAll",member_id);
    }
    public int insertFavorite(FavoriteDto dto)throws Exception{
        return session.insert(namespace+"insert",dto);
    }
    public int deleteAllByMemberFavorite(Integer member_id)throws Exception{
        return session.delete(namespace+"deleteAll", member_id);
    }
    public int deleteFavorite(Integer favorite_id)throws Exception{
        return session.delete(namespace+"deleteOne",favorite_id);
    }

}
