package com.yju.bookscovery.service;

import org.apache.lucene.document.Document;
import org.apache.lucene.document.Field;
import org.apache.lucene.document.StringField;
import org.apache.lucene.document.TextField;
import org.apache.lucene.index.IndexWriter;

import java.io.IOException;


public class DataIndexer {
    private final IndexWriter indexWriter;

    public DataIndexer(IndexWriter indexWriter) {
        this.indexWriter = indexWriter;
    }

    public void indexBook(String bookName, String author) throws IOException {
        Document document = new Document();
        document.add(new TextField("bookName", bookName, Field.Store.YES));
        document.add(new StringField("author", author, Field.Store.YES));
        indexWriter.addDocument(document);
    }

    public void commit() throws IOException {
        indexWriter.commit();
    }
}
