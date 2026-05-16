package com.projetolds.projetolds.model;

public enum StatusEnvio {
    ENVIADO("ENVIADO"),
    LIDO("LIDO");

    private String statusEnvio;

    StatusEnvio(String statusEnvio) {
        this.statusEnvio = statusEnvio;
    }

    public String getStatusEnvio() {
        return statusEnvio;
    }
}
