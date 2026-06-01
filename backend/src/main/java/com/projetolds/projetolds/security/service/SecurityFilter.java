package com.projetolds.projetolds.security.service;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class SecurityFilter extends OncePerRequestFilter {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private AutenticacaoService autenticacaoService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        var tokenJWT = recuperarToken(request);

        if (tokenJWT != null) {
            var subject = tokenService.validacaoToken(tokenJWT);

            if (subject != null && !subject.isEmpty()) {
                try {
                    // Centralizamos a busca do usuário para suportar email (Aluno) e CPF (Funcionario).
                    var usuario = autenticacaoService.loadUserByUsername(subject);

                    if (usuario != null) {
                        var autenticacao = new UsernamePasswordAuthenticationToken(usuario, null, usuario.getAuthorities());
                        SecurityContextHolder.getContext().setAuthentication(autenticacao);
                    }
                } catch (Exception e) {
                    // Se o token for válido mas o usuário não existir, seguimos sem autenticar.
                }
            }
        }

        filterChain.doFilter(request, response);
    }

    private String recuperarToken(HttpServletRequest requisicao) {
        var cabecalhoAutorizacao = requisicao.getHeader("Authorization");
        if (cabecalhoAutorizacao != null) {
            return cabecalhoAutorizacao.replace("Bearer ", "");
        }
        return null;
    }
}
