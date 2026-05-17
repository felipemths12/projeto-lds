package com.projetolds.projetolds.repository;

import com.projetolds.projetolds.model.Mensagem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MensagemRepository extends JpaRepository<Mensagem, Long> {
}
