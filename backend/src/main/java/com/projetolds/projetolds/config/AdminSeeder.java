package com.projetolds.projetolds.config;

import com.projetolds.projetolds.model.Funcionario;
import com.projetolds.projetolds.model.enums.Cargo;
import com.projetolds.projetolds.model.enums.StatusGeral;
import com.projetolds.projetolds.repository.FuncionarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminSeeder implements CommandLineRunner {

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${api.security.admin.default-username}")
    private String adminUser;

    @Value("${api.security.admin.default-password}")
    private String adminSenha;

    @Override
    public void run(String... args) throws Exception {
        if (funcionarioRepository.findByCPF(adminUser) == null) {
            Funcionario admin = new Funcionario();
            admin.setNome("Administrador");
            admin.setCPF(adminUser);
            admin.setSenha_acesso(passwordEncoder.encode(adminSenha));
            admin.setPerfil_cargo(Cargo.ADMIN);
            admin.setStatus_ativo(StatusGeral.ATIVO);

            funcionarioRepository.save(admin);
        }
    }
}
