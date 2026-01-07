'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MOCK_LESSON, LessonPlan, Segment } from '@/types/lesson';

export default function EditPage() {
  const router = useRouter();
  const [lesson, setLesson] = useState<LessonPlan>(MOCK_LESSON);
  
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('ontrack_lesson_data');
      if (saved) {
        try {
          // eslint-disable-next-line
          setLesson(JSON.parse(saved));
        } catch (e) {
          console.error("読み込みエラー", e);
        }
      }
    }
    setIsMounted(true);
  }, []);

  const handleSave = () => {
    localStorage.setItem('ontrack_lesson_data', JSON.stringify(lesson));
    router.push('/');
  };

  // ★修正箇所: any をやめてジェネリクスを使用
  const updateSegment = <K extends keyof Segment>(index: number, field: K, value: Segment[K]) => {
    const newSegments = [...lesson.segments];
    newSegments[index] = { ...newSegments[index], [field]: value };
    setLesson({ ...lesson, segments: newSegments });
  };

  const addSegment = () => {
    const newSegment: Segment = {
      id: Date.now().toString(),
      title: '',
      durationMin: 5,
      type: 'lecture'
    };
    setLesson({ ...lesson, segments: [...lesson.segments, newSegment] });
  };

  const removeSegment = (index: number) => {
    const newSegments = lesson.segments.filter((_, i) => i !== index);
    setLesson({ ...lesson, segments: newSegments });
  };

  const calcTotal = lesson.segments.reduce((acc, cur) => acc + Number(cur.durationMin), 0);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center font-sans text-gray-900">
      <main className="w-full max-w-md min-h-screen bg-white shadow-2xl flex flex-col">
        
        {/* Header */}
        <header className="h-14 border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 bg-white/95 backdrop-blur z-20">
          <button onClick={() => router.push('/')} className="text-gray-500 font-bold text-sm">キャンセル</button>
          <h1 className="font-bold text-lg">授業計画の編集</h1>
          <button onClick={handleSave} className="text-blue-600 font-bold text-sm">保存</button>
        </header>

        <div className="p-4 space-y-6 flex-1 overflow-y-auto pb-20">
          
          {/* 基本設定 */}
          <section className="space-y-4 p-4 bg-gray-50 rounded-xl border border-gray-200 shadow-sm">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">授業タイトル</label>
              <input 
                type="text" 
                value={lesson.title}
                onChange={(e) => setLesson({...lesson, title: e.target.value})}
                className="w-full p-3 border border-gray-300 rounded-lg font-bold bg-white text-lg"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs font-bold text-gray-500 mb-1">授業時間 (分)</label>
                <input 
                  type="number"
                  inputMode="numeric" 
                  value={lesson.totalDurationMin || ''}
                  onChange={(e) => setLesson({...lesson, totalDurationMin: e.target.value === '' ? 0 : Number(e.target.value)})}
                  className="w-full p-3 border border-gray-300 rounded-lg font-bold text-lg bg-white"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-bold text-gray-500 mb-1">活動合計</label>
                <div className={`w-full p-3 border rounded-lg font-bold bg-gray-100 text-gray-600 text-lg flex items-center ${calcTotal > lesson.totalDurationMin ? 'text-red-600' : ''}`}>
                  {calcTotal}分
                </div>
              </div>
            </div>
          </section>

          {/* 活動リスト */}
          <section className="space-y-3">
            <h2 className="text-sm font-bold text-gray-500 uppercase px-1">活動リスト</h2>
            
            {lesson.segments.map((seg, index) => (
              <div key={seg.id} className="flex flex-col gap-3 p-4 border border-gray-200 rounded-xl bg-white shadow-sm">
                <div className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600 shrink-0">
                    {index + 1}
                  </div>
                  <input 
                    type="text" 
                    value={seg.title}
                    onChange={(e) => updateSegment(index, 'title', e.target.value)}
                    className="flex-1 p-3 border border-gray-200 rounded-lg font-bold text-base bg-gray-50 focus:bg-white focus:border-blue-500 transition-colors"
                    placeholder="活動名を入力"
                  />
                </div>
                
                <div className="flex items-center justify-between pl-11">
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-bold text-gray-400">時間:</label>
                    <input 
                      type="number" 
                      inputMode="numeric"
                      min="1"
                      value={seg.durationMin || ''}
                      onChange={(e) => updateSegment(index, 'durationMin', e.target.value === '' ? 0 : Number(e.target.value))}
                      className="w-20 p-2 border border-gray-300 rounded-lg font-bold text-center text-lg bg-white"
                    />
                    <span className="text-sm font-bold text-gray-500">分</span>
                  </div>

                  <button 
                    onClick={() => removeSegment(index)}
                    className="text-red-500 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded text-xs font-bold transition-colors"
                  >
                    削除
                  </button>
                </div>
              </div>
            ))}

            <button 
              onClick={addSegment}
              className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-bold hover:bg-gray-50 hover:border-gray-400 transition flex items-center justify-center gap-2"
            >
              <span className="text-xl">+</span> 活動を追加
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}