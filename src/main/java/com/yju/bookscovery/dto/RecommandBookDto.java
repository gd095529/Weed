package com.yju.bookscovery.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class RecommandBookDto {
    private Integer recommand_id;
    private Integer member_id;
    private String field2;
    private LocalDateTime updateDate;
}
