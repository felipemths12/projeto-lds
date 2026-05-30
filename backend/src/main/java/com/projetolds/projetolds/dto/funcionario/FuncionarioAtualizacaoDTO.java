package com.projetolds.projetolds.dto.funcionario;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

public record FuncionarioAtualizacaoDTO(

        @NotNull
        Long id_funcionario,

        String nome,

        @Pattern(regexp = "ADMIN|ATENDENTE|PROFESSOR")
        String perfil_cargo) {
}
