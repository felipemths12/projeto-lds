package com.projetolds.projetolds.service;

import com.projetolds.projetolds.dto.atendimento.AtendimentoCadastroDTO;
import com.projetolds.projetolds.dto.atendimento.AtendimentoListagemDTO;
import com.projetolds.projetolds.model.Aluno;
import com.projetolds.projetolds.model.Atendimento;
import com.projetolds.projetolds.model.Funcionario;
import com.projetolds.projetolds.model.enums.StatusAtendimento;
import com.projetolds.projetolds.repository.AlunoRepository;
import com.projetolds.projetolds.repository.AtendimentoRepository;
import com.projetolds.projetolds.repository.FuncionarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AtendimentoService {

    @Autowired
    private AtendimentoRepository atendimentoRepository;

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    public List<AtendimentoListagemDTO> listarTodosAtendimentos() {
        return atendimentoRepository.findAll().stream().map(AtendimentoListagemDTO::new).toList();
    }

    public Atendimento abrirAtendimento (AtendimentoCadastroDTO atendimentoCadastroDTO) {
        Aluno aluno = alunoRepository.findById(atendimentoCadastroDTO.codigo_aluno())
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado."));

        Funcionario funcionario = funcionarioRepository.findById(atendimentoCadastroDTO.id_funcionario())
                .orElseThrow(() -> new RuntimeException("Funcionario não encontrado."));

        Atendimento atendimento = new Atendimento();
        atendimento.setAssunto(atendimentoCadastroDTO.assunto());
        atendimento.setAluno(aluno);
        atendimento.setFuncionario(funcionario);
        atendimento.setStatus_atendimento(StatusAtendimento.ABERTO);

        return atendimentoRepository.save(atendimento);
    }
}
