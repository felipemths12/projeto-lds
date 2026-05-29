import NavBar from './NavBar';
import './PageLayout.css';

export default function PageLayout({ children, title, subtitle, action }) {
  return (
    <div className="page-layout">
      <NavBar />
      <main className="page-content">
        {(title || subtitle || action) && (
          <div className="page-header">
            <div className="page-header-info">
              {title && <h1>{title}</h1>}
              {subtitle && <p>{subtitle}</p>}
            </div>
            {action && (
              <div className="page-header-action">
                {action}
              </div>
            )}
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
