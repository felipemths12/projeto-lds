package com.projetolds.projetolds.dto.aluno;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AlunoCadastroDTO(

        @NotBlank
        String nome,

        @NotBlank
        @Size(min = 11, max = 11)
        String cpf,

        @NotBlank
        String rg,

        @NotBlank
        @Email
        String email,

        @NotBlank
        @Size(min = 8)
        String senha,

        @NotBlank
        String telefone,

        @NotBlank
        String logradouro,

        @NotBlank
        String cep) {
}
