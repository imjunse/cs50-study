import { NavLink, useParams } from 'react-router-dom';
import weeks from '../data/weeks';
import useProgress from '../hooks/useProgress';

export default function Layout({ children }) {
  const { weekId } = useParams();
  const { getTotalProgress } = useProgress();
  const totalProgress = getTotalProgress(weeks);

  const toggleDark = () => {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem(
      'cs50-dark',
      document.documentElement.classList.contains('dark'),
    );
  };

  return (
    <div className="layout">
      {/* Top Bar */}
      <header className="topbar">
        <NavLink to="/" className="topbar__logo">
          <div className="topbar__logo-icon">CS</div>
          <div>
            <div className="topbar__title">CS50 Study</div>
            <div className="topbar__subtitle">HARVARD 2026</div>
          </div>
        </NavLink>
        <div className="topbar__right">
          <div className="topbar__progress">
            <div
              className="topbar__progress-bar"
              style={{ width: `${totalProgress}%` }}
            />
          </div>
          <span className="topbar__progress-text">{totalProgress}% COMPLETE</span>
          <button className="topbar__dark-toggle" onClick={toggleDark} aria-label="Toggle dark mode">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
            </svg>
          </button>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="topbar__github"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
        </div>
      </header>

      <div className="layout__body">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="sidebar__label">COURSE CONTENT</div>
          <nav className="sidebar__nav">
            {weeks.map((week) => (
              <NavLink
                key={week.id}
                to={`/week/${week.id}`}
                className={({ isActive }) =>
                  `sidebar__item ${isActive ? 'sidebar__item--active' : ''}`
                }
              >
                <span className="sidebar__icon">{week.icon}</span>
                <span>Week {week.id}: {week.title}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="content">
          {children}
          <footer className="footer">
            <span>Made by <strong>Junse(쭌스)</strong></span>
            <span className="footer__sep">·</span>
            <a href="mailto:hosohere@gmail.com" className="footer__email">hosohere@gmail.com</a>
            <span className="footer__sep">·</span>
            <span>CS50 is a course by Harvard University</span>
          </footer>
        </main>
      </div>
    </div>
  );
}
