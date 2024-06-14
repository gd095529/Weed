package com.yju.bookscovery.controller;

import com.yju.bookscovery.dao.AutoCompleteSearcher;
import org.apache.lucene.queryparser.classic.ParseException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
public class SearchController {
    private final AutoCompleteSearcher autoCompleteSearcher;

    public SearchController(AutoCompleteSearcher autoCompleteSearcher) {
        this.autoCompleteSearcher = autoCompleteSearcher;
    }

    @GetMapping("/search/suggestions")
    public List<String> getSuggestions(@RequestParam String query) throws IOException, ParseException {
        return autoCompleteSearcher.search(query, 10);
    }
}
