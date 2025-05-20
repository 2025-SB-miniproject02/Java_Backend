package com.xbooks.project.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberSignUpDTO {
    private String mem_id;
    private String mem_email;
    private String mem_password;
    private String mem_name;
    private String mem_nickname;
    private String mem_deleted;
}
