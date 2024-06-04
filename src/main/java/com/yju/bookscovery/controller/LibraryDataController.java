package com.yju.bookscovery.controller;

import com.yju.bookscovery.service.LibraryDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LibraryDataController {
    @Autowired
    LibraryDataService libraryDataService;


}
