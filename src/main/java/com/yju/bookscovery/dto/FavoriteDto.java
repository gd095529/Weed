package com.yju.bookscovery.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
public class FavoriteDto {
    private Integer favorite_id;
    private Integer member_id;
    private Integer isbn;
}
