package com.yju.bookscovery.service;

import com.yju.bookscovery.dao.BookCountDao;
import com.yju.bookscovery.dao.BookDao;
import com.yju.bookscovery.dao.SearchHistoryDao;
import com.yju.bookscovery.dto.BookDto;
import com.yju.bookscovery.dto.DepartmentCountBookJoinDto;
import com.yju.bookscovery.dto.FavoriteBookJoinDto;
import com.yju.bookscovery.dto.HistoryBookJoinDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BookService {
    @Autowired
    private BookDao bookDao;
    @Autowired
    SearchHistoryDao searchHistoryDao;
    @Autowired
    BookCountDao bookCountDao;

    @Transactional(rollbackFor = Exception.class)
    public int insertBook(BookDto dto, Integer member_id, Integer department_id) throws Exception {
        Integer book_id = bookDao.checkByISBN(dto.getIsbn());
        if(book_id == null || book_id == 0){
             bookDao.insertBook(dto);
        }
        searchHistoryDao.insertHistroy(member_id, book_id);
        return bookCountDao.insertBook(department_id, book_id);
    }

    //여기에 조인
    public List<DepartmentCountBookJoinDto> selectTopByDepartment(Integer department_id) throws Exception {
        List<DepartmentCountBookJoinDto> data = bookDao.selectTopByDepartment(department_id);
        if (data == null || data.isEmpty()) {
            return List.of(); // 빈 리스트 반환
        }
        return data;
    }

    public List<FavoriteBookJoinDto> selectAllFavoriteByMemberId(Integer member_id) throws Exception {
        List<FavoriteBookJoinDto> data = bookDao.selectAllFavoriteByMemberId(member_id);
        if (data == null || data.isEmpty()) {
            return List.of(); // 빈 리스트 반환
        }
        return data;
    }

    public List<HistoryBookJoinDto> selectAllHistoryByMemberId(Integer member_id) throws Exception {
        List<HistoryBookJoinDto> data = bookDao.selectAllHistoryByMemberId(member_id);
        if (data == null || data.isEmpty()) {
            return List.of(); // 빈 리스트 반환
        }
        return data;
    }
}
