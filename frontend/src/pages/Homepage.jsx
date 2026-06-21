import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

const slides = [
  {
    id: 1,
    emoji: '📚',
    title: 'Encontre o curso ideal para você',
    description: 'Explore nossa variedade de cursos disponíveis, compare cargas horárias e escolha o que melhor se encaixa nos seus objetivos.',
    link: '/cursos',
    linkText: 'Explorar Cursos',
  },
  {
    id: 2,
    emoji: '✍️',
    title: 'Matrícula rápida e simplificada',
    description: 'Cadastre-se em poucos minutos e faça sua matrícula diretamente pelo sistema, sem burocracia e sem filas.',
    link: '/cadastro',
    linkText: 'Criar Conta',
  },
  {
    id: 3,
    emoji: '📅',
    title: 'Agende atendimentos com facilidade',
    description: 'Precisa de suporte? Agende horários com a secretaria ou coordenação direto pela plataforma, no dia e hora que preferir.',
    link: '/login',
    linkText: 'Acessar Agendamentos',
  },
  {
    id: 4,
    emoji: '💬',
    title: 'Fale diretamente com a instituição',
    description: 'Tire dúvidas, envie solicitações e acompanhe suas conversas com professores e funcionários em um só lugar.',
    link: '/login',
    linkText: 'Acessar Mensagens',
  },
];

export default function Homepage() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState('next');
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback((index, dir = 'next') => {
    setDirection(dir);
    setCurrent(index);
  }, []);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length, 'next');
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, 'prev');
  }, [current, goTo]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  const slide = slides[current];

  return (
    <div className="homepage-container">
      {/* Hero */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Bem-vindo ao seu portal <span className="hero-highlight">acadêmico</span>
          </h1>
          <p className="hero-subtitle">
            Aqui você encontra cursos, faz sua matrícula, agenda atendimentos
            e se comunica com a instituição — tudo de forma simples e rápida.
          </p>
          <div className="hero-buttons">
            <Link to="/cadastro" className="btn-primary" id="hero-cadastro-btn">
              Cadastre-se Agora
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link to="/login" className="btn-secondary" id="hero-login-btn">
              Já tenho conta
            </Link>
          </div>
        </div>
      </section>

      {/* Carrossel */}
      <section className="carousel-section" id="carousel-section">
        <h2 className="section-heading">O que você pode fazer</h2>

        <div
          className="carousel-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button
            className="carousel-arrow"
            onClick={prev}
            aria-label="Slide anterior"
            id="carousel-prev"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className={`carousel-card slide-${direction}`} key={slide.id}>
            <span className="carousel-emoji">{slide.emoji}</span>
            <h3 className="carousel-title">{slide.title}</h3>
            <p className="carousel-description">{slide.description}</p>
            <Link to={slide.link} className="carousel-link">
              {slide.linkText}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

          <button
            className="carousel-arrow"
            onClick={next}
            aria-label="Próximo slide"
            id="carousel-next"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </button>
        </div>

        {/* Indicadores */}
        <div className="carousel-dots" id="carousel-dots">
          {slides.map((s, i) => (
            <button
              key={s.id}
              className={`carousel-dot${i === current ? ' active' : ''}`}
              onClick={() => goTo(i, i > current ? 'next' : 'prev')}
              aria-label={`Ir para slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Cards rápidos */}
      <section className="quick-cards">
        <Link to="/cursos" className="quick-card" id="quick-cursos">
          <span className="quick-icon">📚</span>
          <div>
            <strong>Ver Cursos</strong>
            <span>Confira os cursos disponíveis</span>
          </div>
        </Link>
        <Link to="/cadastro" className="quick-card" id="quick-cadastro">
          <span className="quick-icon">🎓</span>
          <div>
            <strong>Criar Conta</strong>
            <span>Cadastre-se para se matricular</span>
          </div>
        </Link>
        <Link to="/login" className="quick-card" id="quick-login">
          <span className="quick-icon">🔑</span>
          <div>
            <strong>Fazer Login</strong>
            <span>Acesse sua área do aluno</span>
          </div>
        </Link>
      </section>
    </div>
  );
}