package com.projetolds.projetolds.service;

import com.projetolds.projetolds.dto.curso.CursoCadastroDTO;
import com.projetolds.projetolds.dto.curso.CursoListagemDTO;
import com.projetolds.projetolds.model.Curso;
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
}
