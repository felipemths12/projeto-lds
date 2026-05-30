package com.projetolds.projetolds.controller;

import com.projetolds.projetolds.dto.funcionario.FuncionarioAtualizacaoDTO;
import com.projetolds.projetolds.dto.funcionario.FuncionarioCadastroDTO;
import com.projetolds.projetolds.dto.funcionario.FuncionarioListagemDTO;
import com.projetolds.projetolds.service.FuncionarioService;
import jakarta.validation.Valid;
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
    public ResponseEntity<Void> cadastrarFuncionario(@RequestBody @Valid FuncionarioCadastroDTO funcionarioCadastroDTO) {
        funcionarioService.cadastrarFuncionario(funcionarioCadastroDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    public ResponseEntity<List<FuncionarioListagemDTO>> listarFuncionario() {
        List<FuncionarioListagemDTO> funcionarios = funcionarioService.listarTodosFuncionarios();
        return ResponseEntity.ok(funcionarios);
    }

    @PutMapping
    public ResponseEntity<Void> atualizarFuncionarios(@RequestBody @Valid FuncionarioAtualizacaoDTO funcionarioAtualizacaoDTO) {
        funcionarioService.atualizarFuncionario(funcionarioAtualizacaoDTO);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> inativarFuncionarios(@PathVariable Long id) {
        funcionarioService.inativarFuncionario(id);
        return ResponseEntity.noContent().build();
    }
}
