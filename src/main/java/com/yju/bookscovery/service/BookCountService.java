package com.yju.bookscovery.service;

import com.yju.bookscovery.dao.BookCountDao;
import com.yju.bookscovery.dto.BookCountDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookCountService {
    @Autowired
    BookCountDao bookCountDao;

    public BookCountDto select(Integer book_count_id, Integer department_id) throws Exception{
        return bookCountDao.selectBook(book_count_id,department_id);
    }

    public int insert(BookCountDto dto) throws Exception{
        return bookCountDao.insertBook(dto);
    }

    public int delete(Integer book_count_id, Integer department_id) throws Exception{
        return bookCountDao.deleteBook(book_count_id,department_id);
    }

    public int deleteAll(Integer department_id) throws Exception{
        return bookCountDao.deleteAllBook(department_id);
    }
}
