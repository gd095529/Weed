package com.yju.bookscovery.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@ToString
public class MemberDto {
    private Integer member_id;
    private String name;
    private String gender;
    private Integer age;
    private Integer department_id;
    private String id;
    private String password;
    private String password_key;
    private String email;
    private String mode;
    private LocalDateTime update_date;
}
