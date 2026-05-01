package com.example.back_end.usuario.dto;

import java.time.LocalDate;

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
    private int stature;
    private int weight;
    private char gender;
    private LocalDate birthDate;
}
