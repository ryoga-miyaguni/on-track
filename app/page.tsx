'use client';

import { useState, useEffect, useRef } from 'react';
import { MOCK_LESSON, LessonPlan } from '@/types/lesson';
import LessonHeader from '@/components/LessonHeader';
import ActiveSegment from '@/components/ActiveSegment';
import Timeline from '@/components/Timeline';

export default function Home() {
  const [lesson, setLesson] = useState<LessonPlan>(MOCK_LESSON);
  const [isMounted, setIsMounted] = useState(false);

  // --- State ---
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTotal, setElapsedTotal] = useState(0);
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [segmentElapsed, setSegmentElapsed] = useState(0);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // --- Init ---
  useEffect(() => {
    const saved = localStorage.getItem('ontrack_lesson_data');
    if (saved) {
      try {
        const parsedData = JSON.parse(saved);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setLesson(parsedData);
      } catch (e) {
        console.error(e);
      }
    }
    setIsMounted(true);
  }, []);

  // --- Logic ---
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setElapsedTotal((prev) => prev + 1);
        setSegmentElapsed((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  // --- Handlers ---
  const toggleTimer = () => setIsRunning(!isRunning);

  const handleNext = () => {
    if (currentSegmentIndex < lesson.segments.length - 1) {
      setCurrentSegmentIndex((prev) => prev + 1);
      setSegmentElapsed(0); 
      setIsRunning(true); 
    } else {
      alert("授業終了です！");
      setIsRunning(false);
    }
  };

  const addTime = (seconds: number) => {
    setSegmentElapsed((prev) => prev - seconds);
  };

  if (!isMounted) return null;

  const currentSegment = lesson.segments[currentSegmentIndex] || lesson.segments[0];

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center font-sans text-gray-900">
      {/* スマホ画面コンテナ */}
      <main className="w-full max-w-md h-dvh bg-white shadow-2xl overflow-hidden flex flex-col relative">
        
        {/* ① Header (15%) - プログレスバー復活、余白調整 */}
        <LessonHeader 
          elapsedTotal={elapsedTotal}
          totalDurationMin={lesson.totalDurationMin}
        />

        {/* ② Main (45%) - ボタンデザイン修正 */}
        <ActiveSegment 
          segment={currentSegment}
          segmentElapsed={segmentElapsed}
          isRunning={isRunning}
          onToggleTimer={toggleTimer}
          onAddTime={addTime}
        />

        {/* ③ Footer (40%) - タイムライン */}
        <Timeline 
          segments={lesson.segments}
          currentIndex={currentSegmentIndex}
          onNext={handleNext}
        />

      </main>
    </div>
  );
}