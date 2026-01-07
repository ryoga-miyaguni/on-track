import { useState, useEffect, useRef } from 'react';
import { LessonPlan } from '@/types/lesson';

export const useLessonTimer = (lesson: LessonPlan) => {
  // --- State ---
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTotal, setElapsedTotal] = useState(0);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [segmentElapsed, setSegmentElapsed] = useState(0);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastTickRef = useRef<number>(0);

  // --- Logic (バックグラウンド補正付き) ---
  useEffect(() => {
    if (isRunning) {
      lastTickRef.current = Date.now();

      timerRef.current = setInterval(() => {
        const now = Date.now();
        const diff = now - lastTickRef.current;

        if (diff >= 1000) {
          const secondsPassed = Math.floor(diff / 1000);
          setElapsedTotal((prev) => prev + secondsPassed);
          setSegmentElapsed((prev) => prev + secondsPassed);
          lastTickRef.current += secondsPassed * 1000;
        }
      }, 200);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  // --- Actions ---
  const toggleTimer = () => setIsRunning(!isRunning);

  const handleNext = () => {
    if (currentSegmentIndex < lesson.segments.length - 1) {
      setCurrentSegmentIndex((prev) => prev + 1);
      setSegmentElapsed(0); 
      lastTickRef.current = Date.now(); 
      setIsRunning(true); 
    } else {
      alert("授業終了です！");
      setIsRunning(false);
    }
  };

  const addTime = (seconds: number) => {
    setSegmentElapsed((prev) => prev - seconds);
  };

  // UIが必要とするデータと関数だけを返す
  return {
    isRunning,
    elapsedTotal,
    currentSegmentIndex,
    segmentElapsed,
    currentSegment: lesson.segments[currentSegmentIndex] || lesson.segments[0],
    toggleTimer,
    handleNext,
    addTime,
  };
};