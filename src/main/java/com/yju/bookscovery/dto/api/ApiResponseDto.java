package com.yju.bookscovery.dto.api;

import com.yju.bookscovery.dto.BookDto;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApiResponseDto {
    private ResponseDto response;

    @Getter
    @Setter
    public static class ResponseDto {
        private BookDetailDto bookDetailDto;

    }

    @Getter
    @Setter
    public static class BookDetailDto {
        private String bookname;
        private String authors;
        private String publisher;
        private String bookImageURL;
        private String description;
        private int publication_year;
        private String isbn13;
        private String vol;
        private String class_no;
        private String class_nm;
        private int loanCnt;
    }
}

