package com.projetolds.projetolds.repository;

import com.projetolds.projetolds.model.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {
}
