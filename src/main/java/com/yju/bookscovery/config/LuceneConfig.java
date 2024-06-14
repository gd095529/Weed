package com.yju.bookscovery.config;

import com.yju.bookscovery.dao.BookDao;
import com.yju.bookscovery.dto.BookDto;
import org.apache.lucene.analysis.standard.StandardAnalyzer;
import org.apache.lucene.index.DirectoryReader;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.index.IndexWriterConfig;
import org.apache.lucene.queryparser.classic.QueryParser;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.RAMDirectory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.util.List;

@Configuration
public class LuceneConfig {
    private Directory indexDirectory;
    private StandardAnalyzer analyzer;
    private IndexWriterConfig config;
    private IndexWriter indexWriter;
    private BookDao bookDao;

    public LuceneConfig(BookDao bookDao) throws Exception {
        this.indexDirectory = new RAMDirectory(); // 메모리 내 인덱스 저장
        this.analyzer = new StandardAnalyzer();
        this.config = new IndexWriterConfig(analyzer);
        this.indexWriter = new IndexWriter(indexDirectory, config);
        this.bookDao = bookDao;
        initializeIndex(); // 인덱스 초기화
    }

    @Bean
    public Directory indexDirectory() {
        return this.indexDirectory;
    }

    @Bean
    public StandardAnalyzer analyzer() {
        return this.analyzer;
    }

    @Bean
    public IndexWriterConfig indexWriterConfig() {
        return this.config;
    }

    @Bean
    public IndexWriter indexWriter() {
        return this.indexWriter;
    }

    @Bean
    public DirectoryReader directoryReader() throws IOException {
        return DirectoryReader.open(this.indexDirectory);
    }

    @Bean
    public IndexSearcher indexSearcher() throws IOException {
        return new IndexSearcher(directoryReader());
    }

    @Bean
    public QueryParser queryParser() {
        return new QueryParser("bookname", this.analyzer);
    }

    private void initializeIndex() throws Exception {
        // 초기 데이터 인덱싱
        List<BookDto> books = bookDao.selectAllBooks();
        for (BookDto bookDto : books) {
            indexWriter.addDocument(createDocument(bookDto));
        }
        indexWriter.commit();
        indexWriter.commit();
    }

    private org.apache.lucene.document.Document createDocument(BookDto dto) {
        org.apache.lucene.document.Document document = new org.apache.lucene.document.Document();
        document.add(new org.apache.lucene.document.TextField("bookname", dto.getBookname(), org.apache.lucene.document.Field.Store.YES));
        document.add(new org.apache.lucene.document.StringField("author", dto.getAuthors(), org.apache.lucene.document.Field.Store.YES));
        return document;
    }
}
