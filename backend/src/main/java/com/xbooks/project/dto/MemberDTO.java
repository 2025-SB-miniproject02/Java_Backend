package com.xbooks.project.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberDTO {
    private long   mem_id;
    private String memEmail;
    private String mem_addr;
    private String mem_hp;
    private String mem_password;
    private String mem_name;
    private String mem_nickname;
    private String mem_deleted;
}
