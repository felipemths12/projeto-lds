package com.projetolds.projetolds.dto.curso;

import com.projetolds.projetolds.model.Curso;

import java.util.List;

public record CursoListagemDTO(
        Long codigo_curso,
        String nome,
        Integer carga_horaria,
        String status,
        List<String> cpfs_professores
) {

    public CursoListagemDTO(Curso curso) {
        this(
                curso.getCodigo_curso(),
                curso.getNome(),
                curso.getCarga_horaria(),
                curso.getStatus_curso() != null ? curso.getStatus_curso().name() : null,
                curso.getTurmas() != null ? curso.getTurmas().stream().map(t -> t.getProfessor().getCPF()).distinct().toList() : List.of()
        );
    }
}
