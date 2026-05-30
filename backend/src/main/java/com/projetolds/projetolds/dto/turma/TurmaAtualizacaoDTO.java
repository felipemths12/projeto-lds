package com.projetolds.projetolds.dto.turma;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record TurmaAtualizacaoDTO(

        @NotNull
        Long codigo_turma,

        @NotNull
        Integer numero_vagas,

        @NotBlank
        String turno,

        @NotNull
        Long id_funcionario) {
}
