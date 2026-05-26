package com.projetolds.projetolds.service;

import com.projetolds.projetolds.dto.curso.CursoAtualizacaoDTO;
import com.projetolds.projetolds.dto.curso.CursoCadastroDTO;
import com.projetolds.projetolds.dto.curso.CursoListagemDTO;
import com.projetolds.projetolds.model.Curso;
import com.projetolds.projetolds.model.enums.StatusCurso;
import com.projetolds.projetolds.repository.CursoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CursoService {

    @Autowired
    private CursoRepository cursoRepository;

    @Transactional
    public Curso cadastrarCurso(CursoCadastroDTO dto) {
        Curso curso = new Curso();
        curso.setNome(dto.nome());
        curso.setCarga_horaria(dto.cargaHoraria());

        return cursoRepository.save(curso);
    }

    public List<CursoListagemDTO> listarTodos() {
        return cursoRepository.findAll()
                .stream()
                .map(CursoListagemDTO::new)
                .toList();
    }

    @Transactional
    public Curso atualizarCurso(CursoAtualizacaoDTO cursoAtualizacaoDTO) {
        Curso curso = cursoRepository.findById(cursoAtualizacaoDTO.codigo_curso())
                .orElseThrow(() -> new RuntimeException("Curso não encontrado."));

        if(cursoAtualizacaoDTO.nome() != null) {
            curso.setNome(cursoAtualizacaoDTO.nome());
        }

        if (cursoAtualizacaoDTO.carga_horaria() != null) {
            curso.setCarga_horaria(cursoAtualizacaoDTO.carga_horaria());
        }

        return cursoRepository.save(curso);
    }

    public void inativarCurso(Long id) {
        Curso curso = cursoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Curso não encontrado."));

        curso.setStatus_curso(StatusCurso.INATIVO);
    }
}
