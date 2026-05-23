package com.projetolds.projetolds.dto.turma;

import com.projetolds.projetolds.model.Turma;

public record TurmaListagemDTO(Long codigo_turma,
                               Integer semestre,
                               Integer ano,
                               String turno,
                               Integer vagas,
                               String nome_curso,
                               String nome_funcionario) {

    public TurmaListagemDTO(Turma turma) {
        this(turma.getCodigo_turma(), turma.getSemestre(), turma.getAno(), turma.getTurno(), turma.getNumero_vagas(),
                turma.getCurso().getNome(), turma.getProfessor().getNome());
    }
}
