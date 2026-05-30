package com.projetolds.projetolds.dto.aluno;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record AlunoAtualizacaoDTO(

        @NotNull
        Long codigo_aluno,

        String nome,

        @Email
        String email,

        @Size(min = 8)
        String senha) {
}
