package com.projetolds.projetolds.repository;

import com.projetolds.projetolds.model.Aluno;
import com.projetolds.projetolds.model.Matricula;
import com.projetolds.projetolds.model.Turma;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MatriculaRepository extends JpaRepository<Matricula, Long> {
    Boolean existsByAlunoAndTurma(Aluno aluno, Turma turma);

    Long countByTurmaAndStatusMatricula(Turma turma, String status);
}
