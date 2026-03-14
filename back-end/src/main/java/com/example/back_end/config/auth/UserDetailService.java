package com.example.back_end.config.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.User;

import com.example.back_end.usuario.data.UserRepository;
import com.example.back_end.usuario.model.UserEntity;

public class UserDetailService implements UserDetailsService{
    
    @Autowired
    private UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException{
        UserEntity user = repository.findByEmail(email)
        .orElseThrow(()-> new UsernameNotFoundException("The user doesn't exist"));
        
        return User.builder()
                .username(user.getEmail())
                .password(user.getPasssword())
                .build();
    }
}
