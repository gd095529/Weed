package com.yju.bookscovery.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class DepartmentCountBookJoinDto {
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
    private int book_count;
}
