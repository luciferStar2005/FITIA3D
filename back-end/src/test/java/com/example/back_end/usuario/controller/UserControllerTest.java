package com.example.back_end.usuario.controller;

import static org.mockito.ArgumentMatchers.any;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import org.springframework.http.MediaType;

import com.example.back_end.config.SecurityConfig;
import com.example.back_end.config.auth.JwtService;
import com.example.back_end.usuario.dto.RegisterUserRequest;
import com.example.back_end.usuario.model.UserEntity;
import com.example.back_end.usuario.service.UserService;

import tools.jackson.databind.ObjectMapper;

@WebMvcTest(UserController.class)
@Import({SecurityConfig.class})
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private JwtService jwtService;

    @MockitoBean
    private UserService service;

    @Autowired
    private ObjectMapper objectMapper;
    
    @Test
    void testRegister() throws Exception {
        RegisterUserRequest request = RegisterUserRequest.builder()
        .identification(1065592068L)
        .firtsName("Calet")
        .secondName("Josue")
        .lastName("Ortiz")
        .email("test@example.com")
        .password("password")
        .build();

        UserEntity usuarioCreado= new UserEntity(1065592068L, 
            "Calet", 
            "Josue", 
            "Ortiz",
            "test@example.com", 
            "password", 
            1);

        Mockito.when(service.registerUser(any(RegisterUserRequest.class)))
        .thenReturn(usuarioCreado);

        mockMvc.perform(post("/api/user/register")
            .contentType(MediaType.APPLICATION_JSON)
            .content(objectMapper.writeValueAsString(request)))
            .andDo(print())
            .andExpect(status().isCreated())
            .andExpect(jsonPath("$.email").value("test@example.com")) // Verificamos el contenido
            .andExpect(jsonPath("$.identification").exists());
    }
}
