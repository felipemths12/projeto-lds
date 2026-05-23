package com.projetolds.projetolds.dto.turma;

public record TurmaCadastroDTO (Integer semestre,
                                Integer ano,
                                String turno,
                                Integer numero_vagas,
                                Long codigo_curso,
                                Long id_funcionario){
}
