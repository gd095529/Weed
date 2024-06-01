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
    private Integer book_id;
    private int book_count;
}
