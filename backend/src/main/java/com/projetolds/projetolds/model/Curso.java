package com.projetolds.projetolds.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "cursos")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Curso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo_curso;

    private String nome;
    private String descricao;
    private Integer carga_horaria;

    @Enumerated(EnumType.STRING)
    private StatusEnvio status_curso;

    @OneToMany(mappedBy = "curso", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Turma> turmas = new ArrayList<>();
}
