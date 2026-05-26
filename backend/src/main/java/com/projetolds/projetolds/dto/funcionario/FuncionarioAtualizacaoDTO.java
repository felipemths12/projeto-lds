package com.projetolds.projetolds.dto.funcionario;

public record FuncionarioAtualizacaoDTO(Long id_funcionario,
                                        String nome,
                                        String cpf,
                                        String perfil_cargo) {
}
