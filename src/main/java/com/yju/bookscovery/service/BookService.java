package com.yju.bookscovery.service;

import com.yju.bookscovery.dao.BookCountDao;
import com.yju.bookscovery.dao.BookDao;
import com.yju.bookscovery.dao.SearchHistoryDao;
import com.yju.bookscovery.dto.BookDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.awt.print.Book;

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
        if(book_id == 0 || book_id == null){
             bookDao.insertBook(dto);
        }
        searchHistoryDao.insertHistroy(member_id, book_id);
        return bookCountDao.insertBook(department_id, book_id);
    }

}
