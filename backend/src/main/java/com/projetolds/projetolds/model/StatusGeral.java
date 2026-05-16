package com.projetolds.projetolds.model;


//Atende a: Funcionario, Matricula
public enum StatusGeral {
    ATIVO("ATIVO"),
    INATIVO("INATIVO"),
    PENDENTE("PENDENTE");

    private String status;

    StatusGeral(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }
}
