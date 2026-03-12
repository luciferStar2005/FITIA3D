package com.example.back_end.usuario.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.back_end.usuario.dto.RegisterUserRequest;
import com.example.back_end.usuario.model.UserEntity;
import com.example.back_end.usuario.service.UserService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/user")
@AllArgsConstructor
public class UserController {
    private final UserService service;

    @PostMapping("/register")
    public ResponseEntity<UserEntity> register(RegisterUserRequest rq){
        UserEntity user=service.registerUser(rq);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }
}
