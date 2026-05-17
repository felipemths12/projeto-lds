package com.projetolds.projetolds.repository;

import com.projetolds.projetolds.model.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AlunoRepository extends JpaRepository <Aluno, Long> {
}
