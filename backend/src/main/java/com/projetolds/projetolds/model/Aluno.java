package com.projetolds.projetolds.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "alunos")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Aluno {

    @Id
    @Column(name = "codigo_aluno")
    private Long codigo_aluno;

    private String nome;

    @Column(unique = true)
    private String CPF;

    @Column(unique = true)
    private String RG;

    @OneToOne(mappedBy = "aluno", cascade = CascadeType.ALL)
    private Endereco endereco;

    @OneToMany(mappedBy = "aluno", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Telefone> telefones = new ArrayList<>();

    @OneToMany(mappedBy = "aluno", cascade = CascadeType.ALL)
    private List<Matricula> matriculas = new ArrayList<>();

    @OneToMany(mappedBy = "aluno", cascade = CascadeType.ALL)
    private List<Mensagem> mensagens = new ArrayList<>();

    private String email;

    private LocalDateTime data_nascimento;

    private String senha_acesso;

}
