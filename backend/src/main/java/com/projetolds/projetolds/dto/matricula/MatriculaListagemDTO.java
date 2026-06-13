package com.projetolds.projetolds.dto.matricula;

import com.projetolds.projetolds.model.Matricula;

public record MatriculaListagemDTO(Long numero_matricula,
                                   String status,
                                   Long codigo_aluno,
                                   String nome_aluno,
                                   Long codigo_turma,
                                   String nome_curso,
                                   String nome_funcionario) {

    public MatriculaListagemDTO (Matricula m) {
        this(m.getNumero_matricula(), 
             m.getStatusMatricula().name(), 
             m.getAluno().getCodigo_aluno(), 
             m.getAluno().getNome(), 
             m.getTurma().getCodigo_turma(),
             m.getTurma().getCurso() != null ? m.getTurma().getCurso().getNome() : "Sem Curso",
             m.getTurma().getProfessor() != null ? m.getTurma().getProfessor().getNome() : "Sem Professor");
    }
}
