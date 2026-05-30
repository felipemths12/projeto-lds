package com.projetolds.projetolds.config;

import com.projetolds.projetolds.dto.config.DadosErroValidacao;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.nio.file.AccessDeniedException;
import java.util.List;

@RestControllerAdvice
public class TratadorDeErros {

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity erro404() {
        return ResponseEntity.notFound().build();
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity erro400(MethodArgumentNotValidException exception) {
        List<FieldError> erros = exception.getFieldErrors();
        return ResponseEntity.badRequest().body(erros.stream().map(DadosErroValidacao::new));
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity erro403() {
        return ResponseEntity.status(403).body("Acesso negado. Você não tem permissão para fazer isso.");
    }

    @ExceptionHandler(IllegalAccessException.class)
    public ResponseEntity erroRegraDeNegocio(IllegalAccessException exception) {
        return ResponseEntity.badRequest().body(exception.getMessage());
    }
}
