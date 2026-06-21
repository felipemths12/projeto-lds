# 🎓 Sistema Escolar - Gestão Acadêmica

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-F2F4F9?style=for-the-badge&logo=spring-boot)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)

## 📖 Sobre o Projeto
O presente projeto consiste no desenvolvimento de um **Sistema Escolar** completo e integrado. Ele foi construído como **Trabalho universitário para Nota de AV3 no Centro Universitário Jorge Amado**, especificamente para a disciplina de **Laboratório de Desenvolvimento de Software**. 

A plataforma oferece uma interface intuitiva e uma API robusta para a gestão completa de uma instituição de ensino, contemplando desde o registro de usuários até dashboards estatísticos.

## 🚀 Funcionalidades Principais
* **Autenticação e Segurança:** Login com JWT e controle de rotas privadas.
* **Gestão de Alunos e Funcionários:** CRUD completo com tratamentos de erros.
* **Gestão Acadêmica:** Criação e manutenção de Cursos, Turmas e Matrículas.
* **Atendimentos e Mensagens:** Sistema integrado para comunicação e agendamentos.
* **Dashboard e Estatísticas:** Visão geral com métricas dinâmicas da instituição.

## 🛠️ Tecnologias Utilizadas
* **Frontend:** React.js, Vite, Context API, CSS3.
* **Backend:** Java 21, Spring Boot, Spring Security (JWT), Spring Data JPA.
* **Banco de Dados:** MySQL.
* **Documentação:** Swagger (OpenAPI).
* **Infraestrutura:** Docker e Vercel.

## ⚙️ Como Executar o Projeto

### Pré-requisitos
* Node.js (v18+)
* Java Development Kit (JDK 21+)
* Maven
* MySQL Server (ou Docker)

### Passo 1: Executando o Backend
1. Acesse a pasta do backend: `cd backend`
2. Configure as credenciais do banco de dados no arquivo `src/main/resources/application.properties`.
3. Execute a aplicação usando o Maven:
   ```bash
   mvn spring-boot:run
