package com.projetolds.projetolds.service;

import com.projetolds.projetolds.dto.matricula.MatriculaCadastroDTO;
import com.projetolds.projetolds.dto.matricula.MatriculaListagemDTO;
import com.projetolds.projetolds.model.Aluno;
import com.projetolds.projetolds.model.Matricula;
import com.projetolds.projetolds.model.Turma;
import com.projetolds.projetolds.model.enums.StatusCurso;
import com.projetolds.projetolds.model.enums.StatusGeral;
import com.projetolds.projetolds.repository.AlunoRepository;
import com.projetolds.projetolds.repository.MatriculaRepository;
import com.projetolds.projetolds.repository.TurmaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MatriculaService {

    @Autowired
    private MatriculaRepository matriculaRepository;

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private TurmaRepository turmaRepository;

    public Matricula matricular (MatriculaCadastroDTO matriculaCadastroDTO) {
        Aluno aluno = alunoRepository.findById(matriculaCadastroDTO.codigo_aluno())
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado"));

        Turma turma = turmaRepository.findById(matriculaCadastroDTO.codigo_turma())
                .orElseThrow(() -> new RuntimeException("Turma não encontrada"));

        if(matriculaRepository.existsByAlunoAndTurma(aluno, turma)) {
            throw new RuntimeException("Matrícula bloqueda: O aluno selecionado já se encontra matriculado nessa turma.");
        }

        if(turma.getNumero_vagas() <= 0) {
            throw new RuntimeException("Matrícula negada: Sem vagas disponíveis.");
        }

        Matricula matricula = new Matricula();

        matricula.setAluno(aluno);
        matricula.setTurma(turma);
        matricula.setData_realizacao(LocalDateTime.now());
        matricula.setStatus_matricula(StatusGeral.ATIVO);

        Matricula salvarMatricula = matriculaRepository.save(matricula);

        turma.setNumero_vagas(turma.getNumero_vagas() - 1);
        turmaRepository.save(turma);

        return salvarMatricula;
    }

    public List<MatriculaListagemDTO> listarMatriculas() {
        return matriculaRepository.findAll().stream().map(MatriculaListagemDTO::new).toList();
    }

    @Transactional
    public void cancelarMatriculas(Long id) {
        Matricula matricula = matriculaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Matrícula não encontrada."));

        if (matricula.getStatus_matricula() == StatusGeral.ATIVO) {
            matricula.setStatus_matricula(StatusGeral.INATIVO);

            Turma turma = matricula.getTurma();
            turma.setNumero_vagas(turma.getNumero_vagas() + 1);
            turmaRepository.save(turma);
        }
    }
}
