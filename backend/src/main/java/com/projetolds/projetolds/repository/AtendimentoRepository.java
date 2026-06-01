package com.projetolds.projetolds.repository;

import com.projetolds.projetolds.model.Aluno;
import com.projetolds.projetolds.model.Atendimento;
import com.projetolds.projetolds.model.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AtendimentoRepository extends JpaRepository<Atendimento, Long> {
    List<Atendimento> findByAluno(Aluno aluno);
    List<Atendimento> findByFuncionario(Funcionario funcionario);
}
