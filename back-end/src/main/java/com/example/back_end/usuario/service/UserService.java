package com.example.back_end.usuario.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;

import com.example.back_end.usuario.data.UserRepository;
import com.example.back_end.usuario.dto.Mensaje;
import com.example.back_end.usuario.dto.ProfileResponse;
import com.example.back_end.usuario.dto.RegisterUserRequest;
import com.example.back_end.usuario.dto.UpdateUserResquest;
import com.example.back_end.usuario.model.UserEntity;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepository repository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserEntity registerUser(RegisterUserRequest rq) {
        repository.findByEmail(rq.getEmail())
                .ifPresent(u -> {
                    throw new EntityNotFoundException("this email already exist");
                });

        UserEntity newUser = UserEntity.builder()
                .firtsName(rq.getFirtsName())
                .lastname(rq.getLastName())
                .email(rq.getEmail())
                .passsword(passwordEncoder.encode(rq.getPassword()))
                .stature(rq.getStature())
                .weight(rq.getWeight())
                .gender(rq.getGender())
                .birthDate(rq.getBirthDate())
                .build();

        repository.save(newUser);

        return newUser;
    }

    public ProfileResponse getProfileFromDatabase(String email) {
        UserEntity user = repository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("user not found: " + email));
        Integer age = user.getBirthDate() != null ? Period.between(user.getBirthDate(), LocalDate.now()).getYears() : 0;
        ProfileResponse response = new ProfileResponse(
                user.getFirtsName(), 
                user.getLastname(), 
                user.getEmail(),
                user.getWeight(),
                user.getStature(),
                age
        );
        return response;

    }

    public Mensaje modifyUser(String email, UpdateUserResquest rq) {
        UserEntity user = repository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("user not found"));

        user.setFirtsName(rq.getFirtsName());
        user.setLastname(rq.getLastName());

        repository.save(user);

        return new Mensaje("Actualizacion exitosa!");
    }
}
