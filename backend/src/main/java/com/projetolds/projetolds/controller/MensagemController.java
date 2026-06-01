package com.projetolds.projetolds.controller;

import com.projetolds.projetolds.dto.mensagem.EnviarMensagemDTO;
import com.projetolds.projetolds.dto.mensagem.MensagemListagemDTO;
import com.projetolds.projetolds.service.MensagemService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mensagens")
@CrossOrigin(origins = "http://localhost:5173")
public class MensagemController {

    @Autowired
    private MensagemService mensagemService;

    @PostMapping
    public ResponseEntity<MensagemListagemDTO> enviarMensagens(@RequestBody @Valid EnviarMensagemDTO enviarMensagemDTO) {
        MensagemListagemDTO mensagem = mensagemService.enviarMensagem(enviarMensagemDTO);
        return ResponseEntity.ok(mensagem);
    }

    @GetMapping("/protocolo/{numero_protocolo}")
    public ResponseEntity<List<MensagemListagemDTO>> listarChat(@PathVariable Long numero_protocolo) {
        List<MensagemListagemDTO> historico = mensagemService.listarHistoricoDeMensagens(numero_protocolo);
        return ResponseEntity.ok(historico);
    }
}
