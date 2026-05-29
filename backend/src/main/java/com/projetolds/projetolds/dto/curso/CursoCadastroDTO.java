package com.projetolds.projetolds.dto.curso;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CursoCadastroDTO(

        @NotBlank
        String nome,

        @NotNull
        Integer cargaHoraria
) {}
