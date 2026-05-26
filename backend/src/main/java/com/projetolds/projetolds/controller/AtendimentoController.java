package com.projetolds.projetolds.controller;

import com.projetolds.projetolds.dto.atendimento.AtendimentoCadastroDTO;
import com.projetolds.projetolds.dto.atendimento.AtendimentoListagemDTO;
import com.projetolds.projetolds.service.AtendimentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/atendimentos")
@CrossOrigin(origins = "http://localhost:5173")
public class AtendimentoController {

    @Autowired
    private AtendimentoService atendimentoService;

    @GetMapping
    public ResponseEntity<List<AtendimentoListagemDTO>> listarAtendimentos() {
        return ResponseEntity.ok(atendimentoService.listarTodosAtendimentos());
    }

    @PostMapping
    public ResponseEntity<Void> abrirAtendimentos (@RequestBody AtendimentoCadastroDTO atendimentoCadastroDTO) {
        atendimentoService.abrirAtendimento(atendimentoCadastroDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
