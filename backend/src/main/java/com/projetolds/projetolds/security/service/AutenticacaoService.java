package com.projetolds.projetolds.security.service;

import com.projetolds.projetolds.repository.AlunoRepository;
import com.projetolds.projetolds.repository.FuncionarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class AutenticacaoService implements UserDetailsService {

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    FuncionarioRepository funcionarioRepository;

    @Override
    public UserDetails loadUserByUsername(String nomeDeUsuario) throws UsernameNotFoundException {

        if(nomeDeUsuario.contains("@")) {
            UserDetails aluno = alunoRepository.findByEmail(nomeDeUsuario);
            if (aluno != null) {
                return aluno;
            }
        } else {
            UserDetails funcionario = funcionarioRepository.findByCPF(nomeDeUsuario);
            if (funcionario != null) {
                return funcionario;
            }
        }

        throw new UsernameNotFoundException("Usuário não encontrado com as credenciais apresentadas");
    }
}
