package com.projetolds.projetolds.service;

import com.projetolds.projetolds.dto.mensagem.EnviarMensagemDTO;
import com.projetolds.projetolds.model.Atendimento;
import com.projetolds.projetolds.model.Mensagem;
import com.projetolds.projetolds.model.enums.StatusEnvio;
import com.projetolds.projetolds.repository.AlunoRepository;
import com.projetolds.projetolds.repository.AtendimentoRepository;
import com.projetolds.projetolds.repository.FuncionarioRepository;
import com.projetolds.projetolds.repository.MensagemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class MensagemService {

    @Autowired
    private MensagemRepository mensagemRepository;

    @Autowired
    private AtendimentoRepository atendimentoRepository;

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Transactional
    public Mensagem enviarMensagem(EnviarMensagemDTO enviarMensagemDTO) {
        Atendimento atendimento = atendimentoRepository.findById(enviarMensagemDTO.numero_protocolo())
                .orElseThrow(() -> new RuntimeException("Atendimento/protocolo não encontrado."));

        Mensagem mensagem = new Mensagem();
        mensagem.setConteudo(enviarMensagemDTO.conteudo());
        mensagem.setAtendimento(atendimento);
        mensagem.setData_envio(LocalDateTime.now());
        mensagem.setStatus_envio(StatusEnvio.ENVIADO);

        if("ALUNO".equalsIgnoreCase(enviarMensagemDTO.tipo_remetente())) {
            var aluno = alunoRepository.findById(enviarMensagemDTO.id_remetente())
                    .orElseThrow(() -> new RuntimeException("Aluno não encontrado."));
            mensagem.setAluno(aluno);
        } else if ("FUNCIONARIO".equalsIgnoreCase(enviarMensagemDTO.tipo_remetente())) {
            var funcionario = funcionarioRepository.findById(enviarMensagemDTO.id_remetente())
                    .orElseThrow(() -> new RuntimeException("Funcionário não encontrado."));
            mensagem.setFuncionario(funcionario);
        } else {
            throw new RuntimeException("Tipo de remetente inválido.");
        }

        return mensagemRepository.save(mensagem);
    }
}
