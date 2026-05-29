package com.projetolds.projetolds.dto.mensagem;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record EnviarMensagemDTO(

        @NotBlank
        String conteudo,

        @NotNull
        Long numero_protocolo,

        @NotNull
        Long id_remetente,

        @NotBlank
        String tipo_remetente) {
}
