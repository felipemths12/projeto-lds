package com.projetolds.projetolds.security;

import com.projetolds.projetolds.security.service.SecurityFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, SecurityFilter securityFilter) throws Exception {
        http
                .cors(cors -> cors.configure(http))
                .csrf(csrf -> csrf.disable())
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .exceptionHandling(ex -> ex.authenticationEntryPoint((request, response, authException) -> response.sendError(401, "Unauthorized")))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/error").permitAll()
                        .requestMatchers(HttpMethod.POST, "/login", "/alunos").permitAll()
                        .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()

                        .requestMatchers(HttpMethod.GET, "/funcionarios").authenticated()
                        .requestMatchers(HttpMethod.POST, "/funcionarios").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/funcionarios").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/funcionarios/**").hasRole("ADMIN")
                        .requestMatchers("/funcionarios").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.POST,"/cursos", "/turmas").hasAnyRole("ADMIN", "ATENDENTE")
                        .requestMatchers(HttpMethod.POST,"/matriculas").hasAnyRole("ADMIN", "ATENDENTE", "PROFESSOR")
                        .requestMatchers(HttpMethod.PUT, "/cursos", "/turmas").hasAnyRole("ADMIN", "ATENDENTE", "PROFESSOR")
                        .requestMatchers(HttpMethod.PUT, "/matriculas", "/alunos").hasAnyRole("ADMIN", "ATENDENTE")
                        .requestMatchers(HttpMethod.DELETE, "/cursos", "/turmas", "/matriculas", "/alunos").hasAnyRole("ADMIN", "ATENDENTE")

                        // O catálogo de cursos é público para visitantes sem login.
                        .requestMatchers(HttpMethod.GET, "/cursos").permitAll()
                        .requestMatchers(HttpMethod.GET, "/turmas").authenticated()

                        .requestMatchers("/mensagens", "/atendimentos").authenticated()

                        .anyRequest().authenticated())
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuracao) throws Exception {
        return configuracao.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
