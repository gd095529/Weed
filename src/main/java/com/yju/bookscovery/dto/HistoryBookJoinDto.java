package com.yju.bookscovery.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class HistoryBookJoinDto {
    private Integer book_id;
    private String bookname;
    private String isbn;
    private String authors;
    private String publisher;
    private String book_image_URL;
    private int publication_year;
    private String class_no;
    private String department;
    private int loan_count;
    private LocalDateTime search_date;

}
