package com.projetolds.projetolds.model;

public enum StatusCurso {
    CURSANDO("CURSANDO"),
    CONCLUIDO("CONCLUÍDO");

    private String statusCurso;

    StatusCurso(String statusCurso) {
        this.statusCurso = statusCurso;
    }

    public String getStatusCurso() {
        return statusCurso;
    }
}
