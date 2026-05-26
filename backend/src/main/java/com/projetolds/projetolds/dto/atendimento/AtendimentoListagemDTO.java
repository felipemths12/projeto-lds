package com.projetolds.projetolds.dto.atendimento;

import com.projetolds.projetolds.model.Atendimento;

import java.time.LocalDateTime;

public record AtendimentoListagemDTO(Long numero_protocolo,
                                     String assunto,
                                     LocalDateTime dataHora_agendamento,
                                     String status_atendimento,
                                     String nome_aluno,
                                     String nome_funcionario) {

    public AtendimentoListagemDTO (Atendimento atendimento) {
        this(atendimento.getNumero_protocolo(), atendimento.getAssunto(), atendimento.getDataHora_agendamento(),
                atendimento.getStatus_atendimento().name(), atendimento.getAluno().getNome(), atendimento.getFuncionario().getNome());
    }
}
