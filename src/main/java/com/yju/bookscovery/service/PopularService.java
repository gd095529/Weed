package com.yju.bookscovery.service;

import com.yju.bookscovery.dao.BookDao;
import com.yju.bookscovery.dao.PopularBookDao;
import com.yju.bookscovery.dao.PopularMemberDao;
import com.yju.bookscovery.dto.BookDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PopularService {
    @Autowired
    private PopularBookDao popularBookDao;

    @Autowired
    private PopularMemberDao popularMemberDao;

    @Autowired
    private BookDao bookDao;

    public List<BookDto> getPopularBookList(Integer member_id, int loan_count) {
        return popularBookDao.selectAllPopularBookByMember(member_id, loan_count);
    }

    @Transactional(rollbackFor = Exception.class)
    public int insertPopular(Integer member_id, BookDto bookDto) throws Exception { //나중에 book으로 옮길지 생각
        bookDao.insertBook(bookDto);
        Integer book_id = bookDao.checkByISBN(bookDto.getIsbn());
        popularBookDao.insertPopularBook(book_id);
        return popularMemberDao.insertPopularMember(book_id, member_id);
    }


    //일주일이나 한달지나면 인기도서 삭제하는거
}
