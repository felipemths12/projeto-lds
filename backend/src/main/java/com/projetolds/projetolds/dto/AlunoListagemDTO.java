package com.projetolds.projetolds.dto;

import com.projetolds.projetolds.model.Aluno;

public record AlunoListagemDTO (Long codigo_aluno,
                                String nome,
                                String cpf,
                                String email){

    public AlunoListagemDTO (Aluno aluno) {
        this(aluno.getCodigo_aluno(), aluno.getNome(), aluno.getCPF(), aluno.getEmail());
    }
}
