import Quiz from './Quiz';
import useProgress from '../hooks/useProgress';

export default function ChapterContent({ weekId, chapter }) {
  const { isChapterDone, toggleChapter } = useProgress();
  const done = isChapterDone(weekId, chapter.id);

  return (
    <div className="chapter-content">
      <h2 className="chapter-content__title">
        <span className="chapter-content__icon">{done ? '✅' : '📖'}</span>
        {chapter.title}
      </h2>

      {/* 핵심 노트 */}
      <div className="chapter-content__notes">
        <h3>💡 핵심 개념</h3>
        <ul>
          {chapter.notes.map((note, i) => (
            <li key={i}>{note}</li>
          ))}
        </ul>
      </div>

      {/* 퀴즈 */}
      {chapter.quiz && chapter.quiz.length > 0 && (
        <Quiz questions={chapter.quiz} />
      )}

      {/* 완료 체크 */}
      <label className="chapter-content__done">
        <input
          type="checkbox"
          checked={done}
          onChange={() => toggleChapter(weekId, chapter.id)}
        />
        <span className="chapter-content__done-check">
          {done ? '✓' : ''}
        </span>
        <span>이 챕터 학습 완료</span>
      </label>
    </div>
  );
}
