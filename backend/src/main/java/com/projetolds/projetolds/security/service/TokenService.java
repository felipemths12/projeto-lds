package com.projetolds.projetolds.security.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.projetolds.projetolds.model.Aluno;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    private String senhaSecreta = "12345678";

    public String geradorDeToken(Aluno aluno) {
        Algorithm algorithm = Algorithm.HMAC256(senhaSecreta);
        return JWT.create()
                .withIssuer("Projeto LDS")
                .withSubject(aluno.getEmail())
                .withExpiresAt(LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-03:00")))
                .sign(algorithm);
    }

    public String validacaoToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(senhaSecreta);
            return JWT.require(algorithm)
                    .withIssuer("Projeto LDS")
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (Exception e) {
            return "Sessão expirada";
        }
    }
}
