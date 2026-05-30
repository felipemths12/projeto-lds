package com.projetolds.projetolds.controller;

import com.projetolds.projetolds.dto.login.LoginDTO;
import com.projetolds.projetolds.dto.login.TokenDTO;
import com.projetolds.projetolds.model.Aluno;
import com.projetolds.projetolds.security.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "http://localhost:5173")
public class AutenticacaoController {

    @Autowired
    private AuthenticationManager manager;

    @Autowired
    private TokenService tokenService;

    @PostMapping
    public ResponseEntity<TokenDTO> login(@RequestBody LoginDTO loginDTO) {
        var tokenAutenticacao = new UsernamePasswordAuthenticationToken(loginDTO.login(), loginDTO.senha());

        var autenticacao = manager.authenticate(tokenAutenticacao);

        Aluno alunoLogado = (Aluno) autenticacao.getPrincipal();
        String tokenJWT = tokenService.geradorDeToken(alunoLogado);

        return ResponseEntity.ok(new TokenDTO(tokenJWT));
    }
}
