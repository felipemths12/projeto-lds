package com.projetolds.projetolds.repository;

import com.projetolds.projetolds.model.Aluno;
import com.projetolds.projetolds.model.Matricula;
import com.projetolds.projetolds.model.Turma;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MatriculaRepository extends JpaRepository<Matricula, Long> {
    @Query("select case when count(m) > 0 then true else false end from Matricula m where m.aluno = :aluno and m.turma = :turma")
    Boolean existsByAlunoAndTurma(@Param("aluno") Aluno aluno, @Param("turma") Turma turma);

    @Query("select count(m) from Matricula m where m.turma = :turma and m.statusMatricula = :status")
    Long countByTurmaAndStatusMatricula(@Param("turma") Turma turma, @Param("status") com.projetolds.projetolds.model.enums.StatusGeral status);
}
