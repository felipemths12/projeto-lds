package com.projetolds.projetolds.dto.funcionário;

import com.projetolds.projetolds.model.Funcionario;

public record FuncionarioListagemDTO(Long id_funcionario,
                                     String nome,
                                     String cpf,
                                     String perfil_cargo,
                                     String status_ativo) {
    public FuncionarioListagemDTO (Funcionario f) {
        this(f.getId_funcionario(), f.getNome(), f.getCPF(), f.getPerfil_cargo().name(), f.getStatus_ativo().name());
    }
}
