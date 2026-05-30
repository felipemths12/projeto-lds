package com.projetolds.projetolds.dto.curso;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CursoAtualizacaoDTO(

        @NotNull
        Long codigo_curso,

        String nome,
        Integer carga_horaria) {
}
