package com.projetolds.projetolds.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "matriculas")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Matricula {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long numero_matricula;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "codigo_aluno", nullable = false)
    private Aluno aluno;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "codigo_turma", nullable = false)
    private Turma turma;

    private LocalDateTime data_realizacao;

    @Enumerated(EnumType.STRING)
    private StatusGeral status_matricula;
}
