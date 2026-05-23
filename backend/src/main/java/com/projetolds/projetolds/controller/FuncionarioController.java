package com.projetolds.projetolds.controller;

import com.projetolds.projetolds.dto.funcionario.FuncionarioCadastroDTO;
import com.projetolds.projetolds.dto.funcionario.FuncionarioListagemDTO;
import com.projetolds.projetolds.service.FuncionarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/funcionarios")
@CrossOrigin(origins = "http://localhost:5173")
public class FuncionarioController {

    @Autowired
    private FuncionarioService funcionarioService;

    @PostMapping
    public ResponseEntity<Void> cadastrarFuncionario(@RequestBody FuncionarioCadastroDTO funcionarioCadastroDTO) {
        funcionarioService.cadastrarFuncionario(funcionarioCadastroDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    public ResponseEntity<List<FuncionarioListagemDTO>> listarFuncionario() {
        List<FuncionarioListagemDTO> funcionarios = funcionarioService.listarTodosFuncionarios();
        return ResponseEntity.ok(funcionarios);
    }
}
