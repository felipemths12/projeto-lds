package com.projetolds.projetolds.model;

public enum Cargo {
    ADMIN("ADMIN"),
    ATENDENTE("ATENDENTE"),
    PROFESSOR("PROFESSOR");

    private String cargo;

    Cargo(String cargo) {
        this.cargo = cargo;
    }

    public String getCargo() {
        return cargo;
    }
}
