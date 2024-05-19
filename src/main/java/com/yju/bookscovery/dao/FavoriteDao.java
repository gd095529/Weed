package com.yju.bookscovery.dao;

import com.yju.bookscovery.dto.FavoriteDto;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class FavoriteDao {
    @Autowired
    SqlSession session;

    String namespace = "com.yju.bookscovery.dao.FavoriteMapper.";

    public int countFavorite()throws Exception{
        return session.selectOne(namespace+"count");
    }
    public FavoriteDto selectFavorite(Integer favorite_id, Integer member_id)throws Exception{
        Map map = new HashMap();
        map.put("favorite_id",favorite_id);
        map.put("member_id",member_id);
        return session.selectOne(namespace+"selectOne",map);
    }
    public List<FavoriteDto> selectAllFavorite(Integer member_id)throws Exception{
        return session.selectList(namespace+"selectAll",member_id);
    }
    public int insertFavorite(FavoriteDto dto)throws Exception{
        return session.insert(namespace+"insert",dto);
    }
    public int updateFavorite(FavoriteDto dto)throws Exception{
        return session.update(namespace+"update",dto);
    }
    public int deleteAllFavorite()throws Exception{
        return session.delete(namespace+"deleteAll");
    }
    public int deleteFavorite(Integer favorite_id, Integer member_id)throws Exception{
        Map map = new HashMap();
        map.put("favorite_id",favorite_id);
        map.put("member_id",member_id);
        return session.delete(namespace+"deleteOne",map);
    }

}
