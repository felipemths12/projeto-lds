package com.projetolds.projetolds.dto.aluno;

public record AlunoCadastroDTO(String nome,
                               String cpf,
                               String rg,
                               String email,
                               String senha,
                               String telefone,
                               String logradouro,
                               String cep) {
}
