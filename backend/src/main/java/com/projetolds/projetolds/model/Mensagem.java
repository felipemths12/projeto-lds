package com.projetolds.projetolds.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "mensagens")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Mensagem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo_mensagem;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "codigo_aluno", nullable = false)
    private Aluno aluno;

    private String tipo_mensagem;
    private String conteudo;
    private LocalDateTime data_envio;

    @Enumerated(EnumType.STRING)
    private StatusEnvio status_envio;
    private LocalDateTime data_leitura;
}
