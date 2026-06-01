package com.projetolds.projetolds.dto.matricula;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record MatriculaAtualizacaoDTO(

        @NotNull
        Long numero_matricula,

        Long codigo_turma,

        @Pattern(regexp = "ATIVO|INATIVO|TRANCADO")
        String status_matricula) {
}
