package com.projetolds.projetolds.dto.matricula;

import com.projetolds.projetolds.model.Matricula;

public record MatriculaListagemDTO(Long numero_matricula,
                                   String status,
                                   Long codigo_aluno,
                                   String nome_aluno,
                                   Long codigo_turma) {

    public MatriculaListagemDTO (Matricula m) {
        this(m.getNumero_matricula(), m.getStatus_matricula().name(), m.getAluno().getCodigo_aluno(), m.getAluno().getNome(), m.getTurma().getCodigo_turma());
    }
}
