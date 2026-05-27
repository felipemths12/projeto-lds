package com.projetolds.projetolds.service;

import com.projetolds.projetolds.dto.turma.TurmaAtualizacaoDTO;
import com.projetolds.projetolds.dto.turma.TurmaCadastroDTO;
import com.projetolds.projetolds.dto.turma.TurmaListagemDTO;
import com.projetolds.projetolds.model.Curso;
import com.projetolds.projetolds.model.Funcionario;
import com.projetolds.projetolds.model.Turma;
import com.projetolds.projetolds.model.enums.Cargo;
import com.projetolds.projetolds.repository.CursoRepository;
import com.projetolds.projetolds.repository.FuncionarioRepository;
import com.projetolds.projetolds.repository.TurmaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TurmaService {

    @Autowired
    private TurmaRepository turmaRepository;

    @Autowired
    private CursoRepository cursoRepository;

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    public Turma cadastrarTurma(TurmaCadastroDTO turmaCadastroDTO) {
        Curso curso = cursoRepository.findById(turmaCadastroDTO.codigo_curso())
                .orElseThrow(() -> new RuntimeException("Curso não encontrado"));

        Funcionario funcionario = funcionarioRepository.findById(turmaCadastroDTO.id_funcionario())
                .orElseThrow(() -> new RuntimeException("Professor não encontrado"));

        if (funcionario.getPerfil_cargo() != Cargo.PROFESSOR) {
            throw new RuntimeException("Cadastro negado: O funcionário selecionado não possui o perfil de PROFESSOR");
        }

        Turma turma = new Turma();

        turma.setSemestre(turmaCadastroDTO.semestre());
        turma.setAno(turmaCadastroDTO.ano());
        turma.setTurno(turmaCadastroDTO.turno());
        turma.setNumero_vagas(turmaCadastroDTO.numero_vagas());
        turma.setCurso(curso);
        turma.setProfessor(funcionario);

        return turmaRepository.save(turma);

    }

    public List<TurmaListagemDTO> listarTurmas() {
        return turmaRepository.findAll().stream().map(TurmaListagemDTO::new).toList();
    }

    @Transactional
    public Turma atualizarTurma(TurmaAtualizacaoDTO turmaAtualizacaoDTO) {
        Turma turma = turmaRepository.findById(turmaAtualizacaoDTO.codigo_turma())
                .orElseThrow(() -> new RuntimeException("Turma não encontrada."));

        if (turmaAtualizacaoDTO.numero_vagas() != null) {
            turma.setNumero_vagas(turma.getNumero_vagas());
        }

        if (turmaAtualizacaoDTO.turno() != null) {
            turma.setTurno(turmaAtualizacaoDTO.turno());
        }

        if (turmaAtualizacaoDTO.id_funcionario() != null) {
            Funcionario novoProfessor = funcionarioRepository.findById(turmaAtualizacaoDTO.id_funcionario())
                    .orElseThrow(() -> new RuntimeException("Professor não encontrado."));

            if (novoProfessor.getPerfil_cargo() != Cargo.PROFESSOR) {
                throw new RuntimeException("O funcionário selecionado não é um PROFESSOR");
            }

            turma.setProfessor(novoProfessor);
        }

        return turmaRepository.save(turma);
    }

    @Transactional
    public void deletarTurma(Long id) {
        turmaRepository.deleteById(id);
    }
}
