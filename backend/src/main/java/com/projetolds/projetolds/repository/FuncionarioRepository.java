package com.projetolds.projetolds.repository;

import com.projetolds.projetolds.model.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {
    UserDetails findByCPF(String cpf);
}
