package com.yju.bookscovery.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class SearchHistoryDto {
    private Integer search_history_id;
    private Integer member_id;
    private Integer isbn;
    private String bookname;
    private String authors;
    private String publisher;

}
