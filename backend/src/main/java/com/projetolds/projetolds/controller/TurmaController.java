package com.projetolds.projetolds.controller;

import com.projetolds.projetolds.dto.turma.TurmaAtualizacaoDTO;
import com.projetolds.projetolds.dto.turma.TurmaCadastroDTO;
import com.projetolds.projetolds.dto.turma.TurmaListagemDTO;
import com.projetolds.projetolds.service.TurmaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/turmas")
@CrossOrigin(origins = "http://localhost:5173")
public class TurmaController {

    @Autowired
    private TurmaService turmaService;

    @PostMapping
    public ResponseEntity<Void> cadastrarTurma(@RequestBody @Valid TurmaCadastroDTO turmaCadastroDTO) {
        turmaService.cadastrarTurma(turmaCadastroDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    public ResponseEntity<List<TurmaListagemDTO>> listarTurmas() {
        List<TurmaListagemDTO> turmas = turmaService.listarTurmas();
        return ResponseEntity.ok(turmas);
    }

    @PutMapping
    public ResponseEntity<Void> atualizarTurmas(@RequestBody @Valid TurmaAtualizacaoDTO turmaAtualizacaoDTO) {
        turmaService.atualizarTurma(turmaAtualizacaoDTO);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarAlunos(@PathVariable Long id) {
        turmaService.deletarTurma(id);
        return ResponseEntity.noContent().build();
    }
}
