import { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import YouTube from 'react-youtube';
import weeks from '../data/weeks';
import ChapterContent from '../components/ChapterContent';
import useProgress from '../hooks/useProgress';

export default function WeekStudy() {
  const { weekId } = useParams();
  const week = weeks.find((w) => String(w.id) === weekId);
  const [activeChapter, setActiveChapter] = useState(0);
  const playerRef = useRef(null);
  const { isChapterDone, getWeekProgress } = useProgress();

  if (!week) {
    return (
      <div className="week-study__empty">
        <h2>강의를 찾을 수 없습니다</h2>
        <Link to="/">← 목록으로 돌아가기</Link>
      </div>
    );
  }

  if (week.chapters.length === 0) {
    return (
      <div className="week-study__empty">
        <span className="week-study__empty-icon">{week.icon}</span>
        <h2>Week {week.id}: {week.title}</h2>
        <p>아직 준비 중인 강의입니다. 곧 업데이트될 예정이에요!</p>
        <Link to="/" className="btn btn--outline">← 목록으로 돌아가기</Link>
      </div>
    );
  }

  const chapter = week.chapters[activeChapter];
  const progress = getWeekProgress(week.id, week.chapters.length);

  const weekIdx = weeks.findIndex((w) => String(w.id) === weekId);
  const prevWeek = weekIdx > 0 ? weeks[weekIdx - 1] : null;
  const nextWeek = weekIdx < weeks.length - 1 ? weeks[weekIdx + 1] : null;

  const onReady = (event) => {
    playerRef.current = event.target;
  };

  const seekTo = (seconds, chapterIdx) => {
    setActiveChapter(chapterIdx);
    if (playerRef.current) {
      playerRef.current.seekTo(seconds, true);
      playerRef.current.playVideo();
    }
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="week-study">
      {/* Header */}
      <span className="week-study__badge">Week {week.id}</span>
      <h1 className="week-study__title">
        <span>{week.icon}</span> {week.title}
      </h1>
      <p className="week-study__desc">{week.description}</p>

      {/* 진행률 */}
      <div className="week-study__progress">
        <div className="week-study__progress-bar">
          <div style={{ width: `${progress}%` }} />
        </div>
        <span>학습 진행률 {progress}%</span>
      </div>

      {/* YouTube Player */}
      <div className="week-study__video">
        <YouTube
          videoId={week.videoId}
          opts={{
            width: '100%',
            height: '100%',
            playerVars: { rel: 0, modestbranding: 1 },
          }}
          onReady={onReady}
          className="week-study__youtube"
          iframeClassName="week-study__iframe"
        />
      </div>

      {/* Chapter Navigation */}
      <div className="week-study__chapters">
        <h3 className="week-study__chapters-title">📑 챕터 목록</h3>
        <div className="week-study__chapters-list">
          {week.chapters.map((ch, idx) => {
            const done = isChapterDone(week.id, ch.id);
            return (
              <button
                key={ch.id}
                className={`week-study__chapter-btn ${idx === activeChapter ? 'week-study__chapter-btn--active' : ''} ${done ? 'week-study__chapter-btn--done' : ''}`}
                onClick={() => seekTo(ch.startTime, idx)}
              >
                <span className="week-study__chapter-status">
                  {done ? '✓' : idx + 1}
                </span>
                <span className="week-study__chapter-info">
                  <span className="week-study__chapter-name">{ch.title}</span>
                  <span className="week-study__chapter-time">{formatTime(ch.startTime)}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Chapter Content */}
      <ChapterContent weekId={week.id} chapter={chapter} />

      {/* Bottom Navigation */}
      <div className="week-study__nav">
        {activeChapter > 0 ? (
          <button
            className="btn btn--outline"
            onClick={() => seekTo(week.chapters[activeChapter - 1].startTime, activeChapter - 1)}
          >
            ← 이전: {week.chapters[activeChapter - 1].title}
          </button>
        ) : prevWeek ? (
          <Link to={`/week/${prevWeek.id}`} className="btn btn--outline">
            ← 이전: Week {prevWeek.id}
          </Link>
        ) : (
          <div />
        )}

        {activeChapter < week.chapters.length - 1 ? (
          <button
            className="btn btn--primary"
            onClick={() => seekTo(week.chapters[activeChapter + 1].startTime, activeChapter + 1)}
          >
            다음: {week.chapters[activeChapter + 1].title} →
          </button>
        ) : nextWeek ? (
          <Link to={`/week/${nextWeek.id}`} className="btn btn--primary">
            다음: Week {nextWeek.id} →
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
