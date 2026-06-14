package com.projetolds.projetolds.repository;

import com.projetolds.projetolds.model.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface AlunoRepository extends JpaRepository <Aluno, Long> {
    UserDetails findByEmail(String email);
    
    // Verifica se já existe um aluno com esse CPF
    boolean existsByCPF(String cpf);
    
    // Verifica se já existe um aluno com esse RG
    boolean existsByRG(String rg);
}
