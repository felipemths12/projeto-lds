package com.projetolds.projetolds.controller;

import com.projetolds.projetolds.dto.turma.TurmaCadastroDTO;
import com.projetolds.projetolds.dto.turma.TurmaListagemDTO;
import com.projetolds.projetolds.service.TurmaService;
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
    public ResponseEntity<Void> cadastrarTurma(@RequestBody TurmaCadastroDTO turmaCadastroDTO) {
        turmaService.cadastrarTurma(turmaCadastroDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    public ResponseEntity<List<TurmaListagemDTO>> listarTurmas() {
        List<TurmaListagemDTO> turmas = turmaService.listarTurmas();
        return ResponseEntity.ok(turmas);
    }
}
