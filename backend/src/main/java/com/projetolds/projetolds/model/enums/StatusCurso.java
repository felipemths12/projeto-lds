package com.projetolds.projetolds.model.enums;

public enum StatusCurso {
    ATIVO("ATIVO"),
    INATIVO("INATIVO"),
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
