package com.projetolds.projetolds.dto.mensagem;

public record EnviarMensagemDTO(String texto,
                                Long numero_protocolo,
                                Long id_remetente,
                                String tipo_remetente) {
}
