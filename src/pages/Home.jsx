import { Link } from 'react-router-dom';
import weeks from '../data/weeks';
import useProgress from '../hooks/useProgress';

export default function Home() {
  const { getWeekProgress } = useProgress();

  return (
    <div className="home">
      {/* Hero */}
      <span className="home__badge">11주 완성 가이드</span>
      <h1 className="home__title">
        Harvard CS50 (2026)
        <br />
        <span className="home__title--accent">하버드 코딩 입문 강의</span>
      </h1>
      <p className="home__desc">
        세계에서 가장 인기 있는 코딩 입문 강의를 챕터별로 나누어 학습합니다.
        <br />
        혼자서도 충분히 따라올 수 있어요!
      </p>

      {/* 학습 목표 + 시간표 */}
      <div className="home__info">
        <div className="home__info-card">
          <h3>🎯 학습 목표</h3>
          <ul>
            <li>컴퓨팅 사고와 문제 해결 능력 습득</li>
            <li>C, Python, SQL, JavaScript 기초 학습</li>
            <li>자료구조와 알고리즘의 핵심 개념 이해</li>
            <li>웹 개발의 기초부터 백엔드까지 경험</li>
          </ul>
        </div>
        <div className="home__info-card">
          <h3>🕐 학습 시간표</h3>
          <p className="home__info-sub">총 11주 과정 (강의당 약 1~2시간)</p>
          <div className="home__schedule">
            <div><span>기초 (Week 0-1)</span><strong>2시간</strong></div>
            <div><span>C 심화 (Week 2-5)</span><strong>4시간</strong></div>
            <div><span>Python & SQL (Week 6-7)</span><strong>2시간</strong></div>
            <div><span>웹 & AI (Week 7.5-9)</span><strong>3시간</strong></div>
          </div>
        </div>
      </div>

      {/* 강의 목록 */}
      <h2 className="home__section-title">📚 강의 목록</h2>
      <div className="home__grid">
        {weeks.map((week) => {
          const progress = getWeekProgress(week.id, week.chapters.length);
          const hasContent = week.chapters.length > 0;

          return (
            <Link
              key={week.id}
              to={`/week/${week.id}`}
              className="home__card"
            >
              <div className="home__card-header">
                <span className="home__card-icon">{week.icon}</span>
                <span className="home__card-week">Week {week.id}</span>
              </div>
              <h3 className="home__card-title">{week.title}</h3>
              <p className="home__card-desc">{week.description}</p>
              {hasContent ? (
                <div className="home__card-progress">
                  <div className="home__card-progress-bar">
                    <div style={{ width: `${progress}%` }} />
                  </div>
                  <span>{progress}%</span>
                </div>
              ) : (
                <span className="home__card-soon">준비 중</span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
