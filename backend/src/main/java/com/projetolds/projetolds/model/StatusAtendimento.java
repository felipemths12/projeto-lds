package com.projetolds.projetolds.model;

public enum StatusAtendimento {
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
