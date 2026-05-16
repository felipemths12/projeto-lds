package com.projetolds.projetolds.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "turmas")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Turma {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo_turma;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "codigo_curso")
    private Curso curso;

    @OneToMany(mappedBy = "turma", cascade = CascadeType.ALL)
    private List<Matricula> matriculas = new ArrayList<>();

    private Integer semestre;
    private Integer ano;
    private String turno;
    private Integer numero_vagas;
}
