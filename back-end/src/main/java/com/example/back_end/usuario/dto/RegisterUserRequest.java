package com.example.back_end.usuario.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class RegisterUserRequest {
    private String firtsName;
    private String lastName;
    private String email;
    private String password;
}
