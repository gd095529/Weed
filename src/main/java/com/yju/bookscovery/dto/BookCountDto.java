package com.yju.bookscovery.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
public class BookCountDto {
    private Integer book_count_id;
    private Integer department_id;
    private String bookname;
    private int book_count;
}
