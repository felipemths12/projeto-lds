package com.projetolds.projetolds.repository;

import com.projetolds.projetolds.model.Aluno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AlunoRepository extends JpaRepository <Aluno, Long> {
    UserDetails findByEmail(String email);
    
    // Consulta JPQL manual para evitar o erro de parser na propriedade "codigo_aluno"
    @Query("SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END FROM Aluno a WHERE a.CPF = :cpf")
    boolean existsByCPF(@Param("cpf") String cpf);
    
    // Consulta JPQL manual para evitar o erro de parser na propriedade "codigo_aluno"
    @Query("SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END FROM Aluno a WHERE a.RG = :rg")
    boolean existsByRG(@Param("rg") String rg);
}
