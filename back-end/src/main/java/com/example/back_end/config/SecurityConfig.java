package com.example.back_end.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.example.back_end.config.auth.JwtAuthenticationFilter;
import com.example.back_end.config.errorSecurity.RestAuthenticationEntryPoint;

import lombok.AllArgsConstructor;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final RestAuthenticationEntryPoint restAuthenticationEntryPoint;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) {
        return config.getAuthenticationManager();
    }
@Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
            .cors(Customizer.withDefaults())
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                    // 1. SILENCIAR EL FAVICON Y LA RAÍZ (Para que Ngrok y el móvil pasen de largo sin romper nada)
                    .requestMatchers("/", "/favicon.ico").permitAll()
                    
                    // 2. PERMITIR MÉTODOS OPTIONS (CORS)
                    .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                    
                    // 3. PERMITIR TUS ENDPOINTS PÚBLICOS DE LA API
                    .requestMatchers("/api/v2/user/register", "/api/v1/auth/**").permitAll()
                    
                    // CUALQUIER OTRA RUTA REQUIERE JWT
                    .anyRequest().authenticated())
            .exceptionHandling(exception -> exception
                    .authenticationEntryPoint(restAuthenticationEntryPoint))
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
}

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        // Permitimos localhost para tu PC Y cualquier subdominio de Ngrok para tu teléfono
        config.setAllowedOriginPatterns(List.of(
                "http://localhost:5173",
                "https://*.ngrok-free.app",
                "https://*.ngrok-free.dev"
        ));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(false);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
