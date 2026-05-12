package com.projetolds.projetolds.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "telefones")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Telefone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_telefone;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "codigo_aluno")
    private Aluno aluno;

    private String numero;

    private String tipo_telefone;
}
