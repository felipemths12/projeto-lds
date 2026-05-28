package com.projetolds.projetolds.security.service;

import com.projetolds.projetolds.repository.AlunoRepository;
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
    private AlunoRepository alunoRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        var tokenJWT = recuperarToken(request);

        if(tokenJWT != null) {
            var subject = tokenService.validacaoToken(tokenJWT);

            if(subject != null && !subject.isEmpty()) {
                var usuario = alunoRepository.findByEmail(subject);

                var autenticacao = new UsernamePasswordAuthenticationToken(usuario, null, usuario.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(autenticacao);
            }
        }

        filterChain.doFilter(request, response);
    }

    private String recuperarToken(HttpServletRequest requisicao) {
        var cabecalhoAutorizacao = requisicao.getHeader("Autorização");
        if (cabecalhoAutorizacao != null) {
            return cabecalhoAutorizacao.replace("Bearer", "");
        }
        return null;
    }
}
