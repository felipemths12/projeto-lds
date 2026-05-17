package com.projetolds.projetolds.controller;

import com.projetolds.projetolds.dto.AlunoCadastroDTO;
import com.projetolds.projetolds.service.AlunoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/alunos")
@CrossOrigin(origins = "http://localhost:5173")
public class AlunoController {

    @Autowired
    private AlunoService alunoService;

    public ResponseEntity<Void> cadastrar(@RequestBody AlunoCadastroDTO dto) {
        alunoService.cadastrarAluno(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
