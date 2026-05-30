package com.projetolds.projetolds.model;

import com.projetolds.projetolds.model.enums.Cargo;
import com.projetolds.projetolds.model.enums.StatusGeral;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "funcionarios")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Funcionario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_funcionario;

    private String nome;

    @Column(unique = true)
    private String CPF;

    private String senha_acesso;

    @Enumerated(EnumType.STRING)
    private Cargo perfil_cargo;

    @Enumerated(EnumType.STRING)
    private StatusGeral status_ativo;

    @OneToMany(mappedBy = "professor", cascade = CascadeType.ALL)
    private List<Turma> turmas = new ArrayList<>();

    @OneToMany(mappedBy = "funcionario", cascade = CascadeType.ALL)
    private List<Atendimento> atendimentos = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_ " + this.getPerfil_cargo().name()));
    }

    @Override
    public String getPassword() {
        return this.senha_acesso;
    }

    @Override
    public String getUsername() {
        return this.CPF;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
