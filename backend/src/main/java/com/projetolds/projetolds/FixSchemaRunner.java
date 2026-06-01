package com.projetolds.projetolds;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
public class FixSchemaRunner implements CommandLineRunner {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) throws Exception {
        try {
            jdbcTemplate.execute("ALTER TABLE atendimentos MODIFY COLUMN status_atendimento VARCHAR(255)");
            System.out.println("SCHEMA FIX: Altered status_atendimento to VARCHAR(255)");
            
            jdbcTemplate.execute("ALTER TABLE mensagens MODIFY COLUMN codigo_aluno BIGINT NULL");
            System.out.println("SCHEMA FIX: Altered mensagens.codigo_aluno to allow NULL");
            
            jdbcTemplate.execute("ALTER TABLE mensagens MODIFY COLUMN id_funcionario BIGINT NULL");
            System.out.println("SCHEMA FIX: Altered mensagens.id_funcionario to allow NULL");
        } catch (Exception e) {
            System.out.println("SCHEMA FIX: Could not alter column (might already be fine or table does not exist): " + e.getMessage());
        }
    }
}
