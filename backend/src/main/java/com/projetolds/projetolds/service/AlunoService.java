package com.projetolds.projetolds.service;

import com.projetolds.projetolds.dto.aluno.AlunoAtualizacaoDTO;
import com.projetolds.projetolds.dto.aluno.AlunoCadastroDTO;
import com.projetolds.projetolds.dto.aluno.AlunoListagemDTO;
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

    @Transactional
    public Aluno atualizarAlunos(AlunoAtualizacaoDTO alunoAtualizacaoDTO) {
        Aluno aluno = alunoRepository.findById(alunoAtualizacaoDTO.codigo_aluno())
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado."));

        if (alunoAtualizacaoDTO.nome() != null) {
            aluno.setNome(alunoAtualizacaoDTO.nome());
        }

        if (alunoAtualizacaoDTO.email() != null) {
            aluno.setEmail(alunoAtualizacaoDTO.email());
        }

        if (alunoAtualizacaoDTO.senha() != null) {
            aluno.setSenha_acesso(alunoAtualizacaoDTO.senha());
        }

        return alunoRepository.save(aluno);
    }

    @Transactional
    public void deletarAlunos(Long id) {
        if (!alunoRepository.existsById(id)) {
            throw new RuntimeException("Aluno não encontrado.");
        }

        alunoRepository.deleteById(id);
    }
}
