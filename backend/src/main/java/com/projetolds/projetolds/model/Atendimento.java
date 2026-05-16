package com.projetolds.projetolds.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "atendimentos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class Atendimento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
     private Long numero_protocolo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "codigo_aluno", nullable = false)
    private Aluno aluno;

    private LocalDateTime dataHora_agendamento;
    private String assunto;
    private Boolean status_atendimento;
}
