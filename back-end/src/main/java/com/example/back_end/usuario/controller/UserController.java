package com.example.back_end.usuario.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.back_end.usuario.dto.Mensaje;
import com.example.back_end.usuario.dto.ProfileResponse;
import com.example.back_end.usuario.dto.RegisterUserRequest;
import com.example.back_end.usuario.dto.UpdateUserResquest;
import com.example.back_end.usuario.model.UserEntity;
import com.example.back_end.usuario.service.UserService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/v2/user")
@AllArgsConstructor
public class UserController {
    private final UserService service;

    @PostMapping("/register")
    public ResponseEntity<UserEntity> register(@RequestBody RegisterUserRequest rq){
        UserEntity user=service.registerUser(rq);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @GetMapping("/me")
    public ResponseEntity<ProfileResponse> getMyInfo() {
        String username = getUsernameContext();
        ProfileResponse actualUser = service.getProfileFromDatabase(username);
        return new ResponseEntity<>(actualUser, HttpStatus.OK);
    }

    @PutMapping("/modify")
    public ResponseEntity<Mensaje> modify(@RequestBody UpdateUserResquest rq){
        String username=getUsernameContext();

        Mensaje mensaje=service.modifyUser(username, rq);

        return new ResponseEntity<>(mensaje, HttpStatus.OK);
    }

    

    private String getUsernameContext(){
        Authentication auth=SecurityContextHolder.getContext().getAuthentication();
        if(auth == null || !auth.isAuthenticated()){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "No autenticado");
        }

        return auth.getName();
    }
}
