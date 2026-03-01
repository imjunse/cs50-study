import { useState } from 'react';

export default function Quiz({ questions }) {
  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState({});

  const select = (qIdx, optIdx) => {
    if (revealed[qIdx]) return;
    setAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  };

  const reveal = (qIdx) => {
    setRevealed((prev) => ({ ...prev, [qIdx]: true }));
  };

  return (
    <div className="quiz">
      <h3 className="quiz__title">📝 복습 퀴즈</h3>
      {questions.map((q, qIdx) => {
        const selected = answers[qIdx];
        const isRevealed = revealed[qIdx];
        const isCorrect = selected === q.answer;

        return (
          <div key={qIdx} className="quiz__question">
            <div className="quiz__label">QUESTION {String(qIdx + 1).padStart(2, '0')}</div>
            <p className="quiz__text">{q.question}</p>
            <div className="quiz__options">
              {q.options.map((opt, optIdx) => {
                let className = 'quiz__option';
                if (selected === optIdx) className += ' quiz__option--selected';
                if (isRevealed && optIdx === q.answer) className += ' quiz__option--correct';
                if (isRevealed && selected === optIdx && !isCorrect) className += ' quiz__option--wrong';

                return (
                  <button
                    key={optIdx}
                    className={className}
                    onClick={() => select(qIdx, optIdx)}
                  >
                    <span className="quiz__option-letter">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
            {selected !== undefined && !isRevealed && (
              <button className="quiz__check" onClick={() => reveal(qIdx)}>
                정답 확인
              </button>
            )}
            {isRevealed && (
              <div className={`quiz__result ${isCorrect ? 'quiz__result--correct' : 'quiz__result--wrong'}`}>
                {isCorrect ? '✅ 정답입니다!' : `❌ 오답! 정답: ${String.fromCharCode(65 + q.answer)}. ${q.options[q.answer]}`}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
