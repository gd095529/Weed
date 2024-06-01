package com.yju.bookscovery.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
public class PopularMemberDto {
    private Integer popular_member_id;
    private Integer popular_id;
    private Integer member_id;
}
