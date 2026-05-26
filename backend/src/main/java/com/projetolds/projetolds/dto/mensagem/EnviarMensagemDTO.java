package com.projetolds.projetolds.dto.mensagem;

public record EnviarMensagemDTO(String conteudo,
                                Long numero_protocolo,
                                Long id_remetente,
                                String tipo_remetente) {
}
