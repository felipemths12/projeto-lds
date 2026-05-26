package com.projetolds.projetolds.controller;

import com.projetolds.projetolds.dto.mensagem.EnviarMensagemDTO;
import com.projetolds.projetolds.service.MensagemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/mensagens")
@CrossOrigin(origins = "http://localhost:5173")
public class MensagemController {

    @Autowired
    private MensagemService mensagemService;

    @PostMapping
    public ResponseEntity<Void> enviarMensagens(@RequestBody EnviarMensagemDTO enviarMensagemDTO) {
        mensagemService.enviarMensagem(enviarMensagemDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
