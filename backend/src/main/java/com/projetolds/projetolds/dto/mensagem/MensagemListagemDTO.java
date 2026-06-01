package com.projetolds.projetolds.dto.mensagem;

import com.projetolds.projetolds.model.Mensagem;

import java.time.LocalDateTime;

public record MensagemListagemDTO(Long codigo_mensagem,
                                  String conteudo,
                                  LocalDateTime data_envio,
                                  String status_envio,
                                  String tipo_mensagem,
                                  Long codigo_aluno,
                                  Long id_funcionario,
                                  Long numero_protocolo) {

    public MensagemListagemDTO(Mensagem mensagem) {
        this(mensagem.getCodigo_mensagem(),
             mensagem.getConteudo(),
             mensagem.getData_envio(),
             mensagem.getStatus_envio() != null ? mensagem.getStatus_envio().name() : null,
             mensagem.getTipo_mensagem(),
             mensagem.getAluno() != null ? mensagem.getAluno().getCodigo_aluno() : null,
             mensagem.getFuncionario() != null ? mensagem.getFuncionario().getId_funcionario() : null,
             mensagem.getAtendimento().getNumero_protocolo());
    }
}
