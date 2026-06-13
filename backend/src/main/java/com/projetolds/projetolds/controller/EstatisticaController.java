package com.projetolds.projetolds.controller;

import com.projetolds.projetolds.dto.estatistica.EstatisticaDTO;
import com.projetolds.projetolds.service.EstatisticaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/estatisticas")
@CrossOrigin(origins = "http://localhost:5173")
public class EstatisticaController {

    @Autowired
    private EstatisticaService estatisticaService;

    @GetMapping
    public ResponseEntity<EstatisticaDTO> obterEstatisticas() {
        return ResponseEntity.ok(estatisticaService.obterEstatisticas());
    }
}
