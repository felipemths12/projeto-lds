package com.projetolds.projetolds.security.service;

import com.projetolds.projetolds.repository.AlunoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

@Service
public class AutenticacaoService implements UserDetailsService {

    @Autowired
    private AlunoRepository alunoRepository;

    @Override
    public UserDetails loadUserByUsername(String nomeDeUsuario) {
        return alunoRepository.findByEmail(nomeDeUsuario);
    }
}
