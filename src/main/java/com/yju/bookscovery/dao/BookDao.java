package com.yju.bookscovery.dao;

import com.yju.bookscovery.dto.BookDto;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.awt.print.Book;
import java.util.List;

@Repository
public class BookDao {
    @Autowired
    SqlSession session;

    String namespace="com.yju.bookscovery.dao.BookMapper.";

    public BookDto selectBookById(int id) {
        return session.selectOne(namespace+"getBookById", id);
    }

    public List<BookDto> getAllBooks() {
        return session.selectList(namespace+"getAllBooks");
    }

    public int addBook(BookDto book) {
        return session.insert(namespace+"addBook", book);
    }

    public int updateBook(BookDto book) {
        return session.update(namespace+"updateBook", book);
    }

    public int deleteBook(int id) {
        return session.delete(namespace+"deleteBook", id);
    }

    public List<BookDto> getBooksByAuthor(String author) {
        return session.selectList(namespace+"getBooksByAuthor", author);
    }

    public List<BookDto> getBooksByTitle(String title) {
        return session.selectList(namespace+"getBooksByTitle", title);
    }

    public List<BookDto> getBooksByPage(int page) {
        return session.selectList(namespace+"getBooksByPage", page);
    }
}
