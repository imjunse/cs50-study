import { useState, useCallback } from 'react';

const STORAGE_KEY = 'cs50-study-progress';

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

export default function useProgress() {
  const [progress, setProgress] = useState(loadProgress);

  const toggleChapter = useCallback((weekId, chapterId) => {
    setProgress((prev) => {
      const key = `${weekId}:${chapterId}`;
      const next = { ...prev, [key]: !prev[key] };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isChapterDone = useCallback(
    (weekId, chapterId) => !!progress[`${weekId}:${chapterId}`],
    [progress],
  );

  const getWeekProgress = useCallback(
    (weekId, totalChapters) => {
      if (totalChapters === 0) return 0;
      let done = 0;
      for (let i = 0; i < totalChapters; i++) {
        const key = `${weekId}:`;
        const matches = Object.keys(progress).filter(
          (k) => k.startsWith(key) && progress[k],
        );
        done = matches.length;
        break;
      }
      return Math.round((done / totalChapters) * 100);
    },
    [progress],
  );

  const getTotalProgress = useCallback(
    (weeks) => {
      const totalChapters = weeks.reduce((sum, w) => sum + w.chapters.length, 0);
      if (totalChapters === 0) return 0;
      const done = Object.values(progress).filter(Boolean).length;
      return Math.round((done / totalChapters) * 100);
    },
    [progress],
  );

  return { toggleChapter, isChapterDone, getWeekProgress, getTotalProgress };
}
