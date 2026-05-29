package com.projetolds.projetolds.dto.atendimento;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record AtendimentoCadastroDTO(

        @NotBlank
        String assunto,

        @NotNull
        Long codigo_aluno,

        @NotNull
        Long id_funcionario) {
}
