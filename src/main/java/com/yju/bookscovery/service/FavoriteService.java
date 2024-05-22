package com.yju.bookscovery.service;

import com.yju.bookscovery.dao.FavoriteDao;
import com.yju.bookscovery.dto.FavoriteDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FavoriteService {
    @Autowired
    FavoriteDao favoriteDao;

    public FavoriteDto select(Integer favorite_id, Integer member_id) throws Exception{
        return favoriteDao.selectFavorite(favorite_id, member_id);
    }

    public int insert(FavoriteDto dto) throws Exception{
        return  favoriteDao.insertFavorite(dto);
    }

    public int delete(Integer favorite_id, Integer member_id) throws Exception{
        return favoriteDao.deleteFavorite(favorite_id, member_id);
    }

    public int deleteAll(Integer member_id) throws Exception{
        return favoriteDao.deleteAllFavorite(member_id);
    }
}
