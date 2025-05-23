package com.xbooks.project.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberChangePasswordDTO {
    private String memEmail;
    private String currentPassword;
    private String newPassword;
}
