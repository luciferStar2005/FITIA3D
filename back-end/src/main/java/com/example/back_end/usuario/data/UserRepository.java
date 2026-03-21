package com.example.back_end.usuario.data;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.back_end.usuario.model.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long>{
    Optional<UserEntity> findByEmail(String email);
}
