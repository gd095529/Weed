package com.yju.bookscovery.dao;

import org.apache.lucene.document.Document;
import org.apache.lucene.queryparser.classic.ParseException;
import org.apache.lucene.queryparser.classic.QueryParser;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.TopDocs;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class AutoCompleteSearcher {
    private final IndexSearcher searcher;
    private final QueryParser queryParser;

    public AutoCompleteSearcher(IndexSearcher searcher, QueryParser queryParser) throws IOException {
        this.searcher = searcher;
        this.queryParser = queryParser;
    }

    public List<String> search(String queryStr, int maxResults) throws IOException, ParseException {
        // 쿼리 문자열을 이스케이프 처리하여 유효하지 않은 문자를 방지
        String escapedQueryStr = QueryParser.escape(queryStr) + "*"; // 부분 일치 쿼리
        Query query = queryParser.parse(escapedQueryStr);
        TopDocs topDocs = searcher.search(query, maxResults);
        List<String> results = new ArrayList<>();
        for (int i = 0; i < topDocs.scoreDocs.length; i++) {
            Document doc = searcher.doc(topDocs.scoreDocs[i].doc);
            results.add(doc.get("bookname"));
        }
        return results;
    }
}
