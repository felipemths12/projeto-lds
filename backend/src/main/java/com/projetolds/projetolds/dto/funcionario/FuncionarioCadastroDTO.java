package com.projetolds.projetolds.dto.funcionario;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record FuncionarioCadastroDTO(

        @NotBlank
        String nome,

        @NotBlank
        @Size(min = 11, max = 11)
        String cpf,

        @NotBlank
        @Size(min = 8)
        String senha,

        @NotBlank
        @Pattern(regexp = "ADMIN|ATENDENTE|PROFESSOR")
        String perfil_cargo) {
}
