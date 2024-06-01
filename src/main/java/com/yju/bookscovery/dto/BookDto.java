package com.yju.bookscovery.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
public class BookDto {
    private Integer book_id;
    private String bookname;
    private String isbn;
    private String author;
    private String publisher;
    private String book_image_URL;
    private int publication_year;
    private String class_no;
    private int loan_count;
}
