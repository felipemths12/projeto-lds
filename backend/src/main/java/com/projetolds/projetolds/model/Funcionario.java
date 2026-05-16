package com.projetolds.projetolds.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "funcionarios")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Funcionario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_funcionario;

    private String nome;

    @Column(unique = true)
    private String CPF;

    private String senha_acesso;

    @Enumerated(EnumType.STRING)
    private Cargo perfil_cargo;

    @Enumerated(EnumType.STRING)
    private StatusGeral status_ativo;
}
