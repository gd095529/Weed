package com.yju.bookscovery.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
public class PopularBookDto {
    private Integer popular_id;
    private Integer book_id;
    private LocalDateTime popular_date;
}
