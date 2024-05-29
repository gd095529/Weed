package com.yju.bookscovery.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class SearchHistoryDto {
    private Integer search_history_id;
    private Integer member_id;
    private Integer book_id;
    private LocalDateTime search_date;

}
