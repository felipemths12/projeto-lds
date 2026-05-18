package com.projetolds.projetolds.dto.curso;

import com.projetolds.projetolds.model.Curso;

public record CursoListagemDTO(
        Long codigo_curso,
        String nome,
        Integer carga_horaria,
        String status
) {

    public CursoListagemDTO(Curso curso) {
        this(
                curso.getCodigo_curso(),
                curso.getNome(),
                curso.getCarga_horaria(),
                curso.getStatus_curso() != null ? curso.getStatus_curso().name() : null
        );
    }
}
