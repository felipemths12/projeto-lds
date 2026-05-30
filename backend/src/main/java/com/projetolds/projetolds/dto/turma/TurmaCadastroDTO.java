package com.projetolds.projetolds.dto.turma;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public record TurmaCadastroDTO (

        @NotNull
        @Positive
        Integer semestre,

        @NotNull
        Integer ano,

        @NotBlank
        String turno,

        @NotNull
        Integer numero_vagas,

        @NotNull
        Long codigo_curso,

        @NotNull
        Long id_funcionario){
}
