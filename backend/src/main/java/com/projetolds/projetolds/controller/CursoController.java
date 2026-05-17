package com.projetolds.projetolds.controller;

import com.projetolds.projetolds.dto.CursoCadastroDTO;
import com.projetolds.projetolds.dto.CursoListagemDTO;
import com.projetolds.projetolds.service.CursoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cursos")
@CrossOrigin(origins = "http://localhost:5173") // Permite o acesso do frontend local (Vite)
public class CursoController {

    @Autowired
    private CursoService cursoService;

    @PostMapping
    public ResponseEntity<Void> cadastrar(@RequestBody CursoCadastroDTO dto) {
        cursoService.cadastrarCurso(dto);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    public ResponseEntity<List<CursoListagemDTO>> listar() {
        List<CursoListagemDTO> cursos = cursoService.listarTodos();
        return ResponseEntity.ok(cursos);
    }
}
