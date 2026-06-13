package com.projetolds.projetolds.service;

import com.projetolds.projetolds.dto.estatistica.EstatisticaDTO;
import com.projetolds.projetolds.model.Curso;
import com.projetolds.projetolds.model.Funcionario;
import com.projetolds.projetolds.model.Matricula;
import com.projetolds.projetolds.model.Turma;
import com.projetolds.projetolds.model.Atendimento;
import com.projetolds.projetolds.model.enums.Cargo;
import com.projetolds.projetolds.model.enums.StatusAtendimento;
import com.projetolds.projetolds.model.enums.StatusCurso;
import com.projetolds.projetolds.model.enums.StatusGeral;
import com.projetolds.projetolds.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EstatisticaService {

    @Autowired
    private AlunoRepository alunoRepository;

    @Autowired
    private CursoRepository cursoRepository;

    @Autowired
    private TurmaRepository turmaRepository;

    @Autowired
    private MatriculaRepository matriculaRepository;

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private AtendimentoRepository atendimentoRepository;

    @Transactional(readOnly = true)
    public EstatisticaDTO obterEstatisticas() {
        long totalAlunos = alunoRepository.count();

        List<Curso> cursos = cursoRepository.findAll();
        long totalCursos = cursos.size();
        long cursosAtivos = cursos.stream().filter(c -> c.getStatus_curso() == StatusCurso.ATIVO).count();
        long cursosInativos = cursos.stream().filter(c -> c.getStatus_curso() == StatusCurso.INATIVO).count();

        List<Turma> turmas = turmaRepository.findAll();
        long totalTurmas = turmas.size();
        long vagasDisponiveis = turmas.stream().mapToLong(Turma::getNumero_vagas).sum();

        List<Matricula> matriculas = matriculaRepository.findAll();
        long totalMatriculas = matriculas.size();
        long matriculasAtivas = matriculas.stream().filter(m -> m.getStatusMatricula() == StatusGeral.ATIVO).count();
        long matriculasPendentes = matriculas.stream().filter(m -> m.getStatusMatricula() == StatusGeral.PENDENTE).count();
        long matriculasInativas = matriculas.stream().filter(m -> m.getStatusMatricula() == StatusGeral.INATIVO).count();

        List<Funcionario> funcionarios = funcionarioRepository.findAll();
        long totalFuncionarios = funcionarios.size();
        long totalProfessores = funcionarios.stream().filter(f -> f.getPerfil_cargo() == Cargo.PROFESSOR).count();

        List<Atendimento> atendimentos = atendimentoRepository.findAll();
        long totalAtendimentos = atendimentos.size();
        long atendimentosAbertos = atendimentos.stream().filter(a -> a.getStatus_atendimento() == StatusAtendimento.ABERTO).count();

        return new EstatisticaDTO(
                totalAlunos,
                totalCursos,
                cursosAtivos,
                cursosInativos,
                totalTurmas,
                vagasDisponiveis,
                totalMatriculas,
                matriculasAtivas,
                matriculasPendentes,
                matriculasInativas,
                totalFuncionarios,
                totalProfessores,
                totalAtendimentos,
                atendimentosAbertos
        );
    }
}
