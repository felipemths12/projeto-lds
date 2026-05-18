package com.projetolds.projetolds.controller;

import com.projetolds.projetolds.dto.aluno.AlunoCadastroDTO;
import com.projetolds.projetolds.dto.aluno.AlunoListagemDTO;
import com.projetolds.projetolds.service.AlunoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/alunos")
@CrossOrigin(origins = "http://localhost:5173")
public class AlunoController {

    @Autowired
    private AlunoService alunoService;

    @PostMapping
    public ResponseEntity<Void> cadastrar(@RequestBody AlunoCadastroDTO dto) {
        alunoService.cadastrarAluno(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    public ResponseEntity<List<AlunoListagemDTO>> listarAlunos() {
        List<AlunoListagemDTO> alunos = alunoService.listarTodos();
        return ResponseEntity.ok(alunos);
    }
}
