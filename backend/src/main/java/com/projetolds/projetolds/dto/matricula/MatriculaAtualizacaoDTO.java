package com.projetolds.projetolds.dto.matricula;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record MatriculaAtualizacaoDTO(

        @NotNull
        Long numero_matricula,

        @NotNull
        Long codigo_turma,

        @NotBlank
        @Pattern(regexp = "ATIVO|INATIVO|TRANCADO")
        String status_matricula) {
}
