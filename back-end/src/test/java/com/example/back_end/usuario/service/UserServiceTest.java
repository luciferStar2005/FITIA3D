package com.example.back_end.usuario.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import com.example.back_end.usuario.data.UserRepository;
import com.example.back_end.usuario.dto.RegisterUserRequest;
import com.example.back_end.usuario.model.UserEntity;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
    @Mock
    private UserRepository repository;

    @Mock
    private BCryptPasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService service;

    
    @Test
    void testRegisterUser() {
        RegisterUserRequest request = RegisterUserRequest.builder()
        .identification(1065592068L)
        .firtsName("Calet")
        .SecondName("Josue")
        .lastName("Ortiz")
        .email("test@example.com")
        .Password("password")
        .build();

        UserEntity usuarioCreado= new UserEntity(1065592068L, 
            "Calet", 
            "Josue", 
            "Ortiz",
            "test@example.com", 
            "password", 
            1);
        when(repository.save(any(UserEntity.class))).thenReturn(usuarioCreado);

        UserEntity result= service.registerUser(request);
        verify(passwordEncoder, times(1)).encode("password");
        assertNotNull(result);
        assertEquals(usuarioCreado, result);
        verify(repository, times(1)).save(usuarioCreado);
    }
}
