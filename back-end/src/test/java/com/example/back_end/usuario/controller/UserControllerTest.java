package com.example.back_end.usuario.controller;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDate;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import org.springframework.http.MediaType;
import com.example.back_end.config.auth.JwtService;
import com.example.back_end.config.auth.UserDetailService;
import com.example.back_end.usuario.dto.RegisterUserRequest;
import com.example.back_end.usuario.model.UserEntity;
import com.example.back_end.usuario.service.UserService;

import tools.jackson.databind.ObjectMapper;
import com.example.back_end.config.SecurityConfig;
import com.example.back_end.config.errorSecurity.RestAuthenticationEntryPoint;

import org.springframework.context.annotation.Import;

@WebMvcTest(UserController.class)
@Import({ SecurityConfig.class, RestAuthenticationEntryPoint.class })
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private JwtService jwtService;

    @MockitoBean
    private UserService service;

    @MockitoBean
    private UserDetailService detail;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testRegister() throws Exception {
        RegisterUserRequest request = RegisterUserRequest.builder()
                .firtsName("Calet")
                .lastName("Ortiz")
                .email("test@example.com")
                .password("password")
                .stature(170)
                .weight(70)
                .gender("M")
                .birthDate(LocalDate.of(2005, 5, 1))
                .build();

        UserEntity usuarioCreado = new UserEntity(1,
                "Calet",
                "Ortiz",
                "test@example.com",
                "password",
                1.70f,
                70.0f,
                "M",
                LocalDate.of(2005, 5, 1));

        Mockito.when(service.registerUser(Mockito.any(RegisterUserRequest.class)))
                .thenReturn(usuarioCreado);

        mockMvc.perform(post("/api/v2/user/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andDo(print())
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.email").value("test@example.com"))
                .andExpect(jsonPath("$.id").exists());
    }
}
