package com.yju.bookscovery.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class FavoriteBookJoinDto {
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
    private Integer favorite_id;
    private LocalDateTime favorite_date;

}
