package com.yju.bookscovery.service;

import com.yju.bookscovery.dao.FavoriteDao;
import com.yju.bookscovery.dto.FavoriteDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FavoriteService {
    @Autowired
    FavoriteDao favoriteDao;

    public FavoriteDto select(Integer favorite_id) throws Exception{
        return favoriteDao.selectFavorite(favorite_id);
    }

    public int insert(Integer member_id, Integer book_id) throws Exception{
        return  favoriteDao.insertFavorite(member_id, book_id);
    }

    public int delete(Integer favorite_id) throws Exception{
        return favoriteDao.deleteFavorite(favorite_id);
    }

    public int deleteAll(Integer member_id) throws Exception{
        return favoriteDao.deleteAllByMemberFavorite(member_id);
    }
}
