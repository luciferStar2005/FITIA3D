package com.example.back_end.usuario.data;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.back_end.usuario.domain.User;

public interface UserRepository extends JpaRepository<User, Long>{
    
}
