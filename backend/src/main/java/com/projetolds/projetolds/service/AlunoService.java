package com.projetolds.projetolds.service;

import com.projetolds.projetolds.dto.AlunoCadastroDTO;
import com.projetolds.projetolds.dto.AlunoListagemDTO;
import com.projetolds.projetolds.model.Aluno;
import com.projetolds.projetolds.model.Endereco;
import com.projetolds.projetolds.model.Telefone;
import com.projetolds.projetolds.repository.AlunoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AlunoService {

    @Autowired
    private AlunoRepository alunoRepository;

    @Transactional
    public Aluno cadastrarAluno(AlunoCadastroDTO dto) {
        Aluno aluno = new Aluno();
        aluno.setNome(dto.nome());
        aluno.setCPF(dto.cpf());
        aluno.setRG(dto.rg());
        aluno.setEmail(dto.email());
        aluno.setSenha_acesso(dto.senha());

        Endereco endereco = new Endereco();
        endereco.setLogradouro(dto.logradouro());
        endereco.setCEP(dto.cep());

        endereco.setAluno(aluno);
        aluno.setEndereco(endereco);

        Telefone telefone = new Telefone();
        telefone.setNumero(dto.telefone());
        telefone.setTipo_telefone("CELULAR");

        telefone.setAluno(aluno);
        aluno.getTelefones().add(telefone);

        return alunoRepository.save(aluno);

    }

    public List<AlunoListagemDTO> listarTodos() {
        return alunoRepository.findAll()
                .stream()
                .map(AlunoListagemDTO::new)
                .toList();
    }
}
