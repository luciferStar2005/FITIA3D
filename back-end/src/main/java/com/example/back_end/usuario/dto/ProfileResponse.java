package com.example.back_end.usuario.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@AllArgsConstructor
@Data
public class ProfileResponse {
    private String firtsName;
    private String lastName;
    private String email;
}
