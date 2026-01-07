'use client';

import { useState, useEffect } from 'react';
import { MOCK_LESSON, LessonPlan } from '@/types/lesson';
import LessonHeader from '@/components/LessonHeader';
import ActiveSegment from '@/components/ActiveSegment';
import Timeline from '@/components/Timeline';
import { useLessonTimer } from '@/hooks/useLessonTimer';

export default function Home() {
  const [lesson, setLesson] = useState<LessonPlan>(MOCK_LESSON);
  const [isMounted, setIsMounted] = useState(false);

  const {
    isRunning,
    elapsedTotal,
    currentSegmentIndex,
    segmentElapsed,
    currentSegment,
    toggleTimer,
    handleNext,
    addTime
  } = useLessonTimer(lesson);

  // --- Init (データ読み込み) ---
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

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start md:items-center font-sans text-gray-900">
      <main className="w-full max-w-xl h-dvh bg-white shadow-2xl overflow-hidden flex flex-col relative">
        
        <LessonHeader 
          elapsedTotal={elapsedTotal}
          totalDurationMin={lesson.totalDurationMin}
        />

        <ActiveSegment 
          segment={currentSegment}
          segmentElapsed={segmentElapsed}
          isRunning={isRunning}
          onToggleTimer={toggleTimer}
          onAddTime={addTime}
        />

        <Timeline 
          segments={lesson.segments}
          currentIndex={currentSegmentIndex}
          onNext={handleNext}
        />

      </main>
    </div>
  );
}