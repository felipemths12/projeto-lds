package com.projetolds.projetolds.model;

import com.projetolds.projetolds.model.enums.StatusAtendimento;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    @Enumerated(EnumType.STRING)
    private StatusAtendimento status_atendimento;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_funcionario", nullable = false)
    private Funcionario funcionario;

    @OneToMany(mappedBy = "atendimento", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Mensagem> mensagens = new ArrayList<>();
}
