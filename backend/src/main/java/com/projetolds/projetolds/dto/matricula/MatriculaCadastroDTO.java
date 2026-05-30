package com.projetolds.projetolds.dto.matricula;

import jakarta.validation.constraints.NotNull;

public record MatriculaCadastroDTO(

        @NotNull
        Long codigo_aluno,

        @NotNull
        Long codigo_turma) {
}
