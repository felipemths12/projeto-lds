package com.projetolds.projetolds.dto.turma;

public record TurmaAtualizacaoDTO(Long codigo_turma,
                                  Integer numero_vagas,
                                  String turno,
                                  Long id_funcionario) {
}
