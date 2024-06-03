package com.yju.bookscovery.service;

import com.yju.bookscovery.dao.BookDao;
import com.yju.bookscovery.dao.PopularBookDao;
import com.yju.bookscovery.dao.PopularMemberDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PopularService {
    @Autowired
    private PopularBookDao popularBookDao;

    @Autowired
    private PopularMemberDao popularMemberDao;

    @Autowired
    private BookDao bookDao;


}
