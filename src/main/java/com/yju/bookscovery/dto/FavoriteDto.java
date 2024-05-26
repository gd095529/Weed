package com.yju.bookscovery.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
public class FavoriteDto {
    private Integer favorite_id;
    private Integer member_id;
    private Integer book_id;
    private LocalDateTime favorite_date;
}
