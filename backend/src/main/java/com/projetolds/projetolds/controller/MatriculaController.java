package com.projetolds.projetolds.controller;

import com.projetolds.projetolds.dto.matricula.MatriculaAtualizacaoDTO;
import com.projetolds.projetolds.dto.matricula.MatriculaCadastroDTO;
import com.projetolds.projetolds.dto.matricula.MatriculaListagemDTO;
import com.projetolds.projetolds.service.MatriculaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/matriculas")
@CrossOrigin(origins = "http://localhost:5173")
public class MatriculaController {

    @Autowired
    private MatriculaService matriculaService;

    @PostMapping
    public ResponseEntity<Void> cadastrar(@RequestBody @Valid MatriculaCadastroDTO matriculaCadastroDTO) {
        matriculaService.matricular(matriculaCadastroDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    public ResponseEntity<List<MatriculaListagemDTO>> listar() {
        List<MatriculaListagemDTO> matriculas = matriculas = matriculaService.listarMatriculas();
        return ResponseEntity.ok(matriculas);
    }

    @PutMapping
    public ResponseEntity<Void> atualizarMatriculas(@RequestBody @Valid MatriculaAtualizacaoDTO matriculaAtualizacaoDTO) {
        matriculaService.atualizarMatriculas(matriculaAtualizacaoDTO);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> cancelarMatriculas(@PathVariable Long id) {
        matriculaService.cancelarMatriculas(id);
        return ResponseEntity.noContent().build();
    }
}
