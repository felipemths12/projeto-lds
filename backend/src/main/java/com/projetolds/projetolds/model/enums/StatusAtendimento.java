package com.projetolds.projetolds.model.enums;

public enum StatusAtendimento {
    ABERTO("ABERTO"),
    EM_ATENDIMENTO("EM ATENDIMENTO"),
    FINALIZADO("FINALIZADO");

    private String statusAtendimento;

    StatusAtendimento(String statusAtendimento) {
        this.statusAtendimento = statusAtendimento;
    }

    public String getStatusAtendimento() {
        return statusAtendimento;
    }
}
