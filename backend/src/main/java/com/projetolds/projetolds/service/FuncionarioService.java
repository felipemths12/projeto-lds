package com.projetolds.projetolds.service;

import com.projetolds.projetolds.dto.funcionario.FuncionarioAtualizacaoDTO;
import com.projetolds.projetolds.dto.funcionario.FuncionarioCadastroDTO;
import com.projetolds.projetolds.dto.funcionario.FuncionarioListagemDTO;
import com.projetolds.projetolds.model.Funcionario;
import com.projetolds.projetolds.model.enums.Cargo;
import com.projetolds.projetolds.model.enums.StatusGeral;
import com.projetolds.projetolds.repository.FuncionarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class FuncionarioService {

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    public Funcionario cadastrarFuncionario(FuncionarioCadastroDTO funcionarioCadastroDTO) {
        Funcionario funcionario = new Funcionario();

        funcionario.setNome(funcionarioCadastroDTO.nome());
        funcionario.setCPF(funcionarioCadastroDTO.cpf());
        funcionario.setSenha_acesso(funcionarioCadastroDTO.senha());
        funcionario.setPerfil_cargo(Cargo.valueOf(funcionarioCadastroDTO.perfil_cargo().toUpperCase()));
        funcionario.setStatus_ativo(StatusGeral.ATIVO);

        return funcionarioRepository.save(funcionario);
    }

    public List<FuncionarioListagemDTO> listarTodosFuncionarios() {
        return funcionarioRepository.findAll().stream().map(FuncionarioListagemDTO::new).toList();
    }

    @Transactional
    public Funcionario atualizarFuncionario(FuncionarioAtualizacaoDTO funcionarioAtualizacaoDTO) {
        Funcionario funcionario = funcionarioRepository.findById(funcionarioAtualizacaoDTO.id_funcionario())
                .orElseThrow(() -> new RuntimeException("Funcionário não encontrado."));

        if (funcionarioAtualizacaoDTO.nome() != null) {
            funcionario.setNome(funcionarioAtualizacaoDTO.nome());
        }

        if (funcionarioAtualizacaoDTO.perfil_cargo() != null) {
            funcionario.setPerfil_cargo(Cargo.valueOf(funcionarioAtualizacaoDTO.perfil_cargo()));
        }

        return funcionarioRepository.save(funcionario);
    }

    @Transactional
    public void inativarFuncionario(Long id) {
        Funcionario funcionario = funcionarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Funcioário não encontrado"));

        funcionario.setStatus_ativo(StatusGeral.INATIVO);
    }
}