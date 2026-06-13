package com.projetolds.projetolds.dto.estatistica;

public record EstatisticaDTO(
        long totalAlunos,
        long totalCursos,
        long cursosAtivos,
        long cursosInativos,
        long totalTurmas,
        long vagasDisponiveis,
        long totalMatriculas,
        long matriculasAtivas,
        long matriculasPendentes,
        long matriculasInativas,
        long totalFuncionarios,
        long totalProfessores,
        long totalAtendimentos,
        long atendimentosAbertos
) {
}
