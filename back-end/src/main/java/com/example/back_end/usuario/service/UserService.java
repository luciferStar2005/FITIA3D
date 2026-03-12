package com.example.back_end.usuario.service;


import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.back_end.usuario.data.UserRepository;
import com.example.back_end.usuario.dto.RegisterUserRequest;
import com.example.back_end.usuario.model.UserEntity;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class UserService {
    private final UserRepository repository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserEntity registerUser(RegisterUserRequest rq){
        repository.findByEmail(rq.getEmail())
        .ifPresent(u->{
            throw new RuntimeException("this email already exist");
        });

        UserEntity newUser= UserEntity.builder()
        .identification(rq.getIdentification())
        .firtsName(rq.getFirtsName())
        .secondName(rq.getSecondName())
        .lastname(rq.getLastName())
        .email(rq.getEmail())
        .passsword(passwordEncoder.encode(rq.getPassword()))
        .build();

        repository.save(newUser);

        return newUser;
    }
}
