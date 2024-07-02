package com.yju.bookscovery.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class KeywordDto {
    private String word;
    private int weight;
}
