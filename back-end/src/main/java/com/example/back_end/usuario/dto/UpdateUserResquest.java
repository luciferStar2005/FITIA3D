package com.example.back_end.usuario.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UpdateUserResquest {
    private String firtsName;
    private String lastName;
    private Float weight;
    private Float stature;
    private String gender;
    private LocalDate birthDate;
}
