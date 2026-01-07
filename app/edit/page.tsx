'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MOCK_LESSON, LessonPlan, Segment } from '@/types/lesson';

export default function EditPage() {
  const router = useRouter();
  const [lesson, setLesson] = useState<LessonPlan>(() => {
    const saved = localStorage.getItem('ontrack_lesson_data');
    return saved ? JSON.parse(saved) : MOCK_LESSON;
  });

  const handleSave = () => {
    localStorage.setItem('ontrack_lesson_data', JSON.stringify(lesson));
    router.push('/');
  };

  const updateSegment = (index: number, field: keyof Segment, value: unknown) => {
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

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center font-sans text-gray-900">
      <main className="w-full max-w-md min-h-screen bg-white shadow-2xl flex flex-col">
        
        <header className="h-14 border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 bg-white/95 backdrop-blur z-20">
          <button onClick={() => router.push('/')} className="text-gray-500 font-bold text-sm">キャンセル</button>
          <h1 className="font-bold text-lg">授業計画の編集</h1>
          <button onClick={handleSave} className="text-blue-600 font-bold text-sm">保存</button>
        </header>

        <div className="p-4 space-y-6 flex-1 overflow-y-auto pb-20">
          
          <section className="space-y-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1">授業タイトル</label>
              <input 
                type="text" 
                value={lesson.title}
                onChange={(e) => setLesson({...lesson, title: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-lg font-bold"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs font-bold text-gray-500 mb-1">授業時間 (分)</label>
                <input 
                  type="number"
                  inputMode="numeric" 
                  value={lesson.totalDurationMin}
                  onChange={(e) => setLesson({...lesson, totalDurationMin: Number(e.target.value)})}
                  className="w-full p-2 border border-gray-300 rounded-lg font-bold"
                />
              </div>
              <div className="flex-1">
                <label className="block text-xs font-bold text-gray-500 mb-1">活動合計</label>
                <div className={`w-full p-2 border rounded-lg font-bold bg-gray-200 text-gray-600 ${calcTotal > lesson.totalDurationMin ? 'text-red-600' : ''}`}>
                  {calcTotal}分
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-sm font-bold text-gray-500 uppercase">活動リスト</h2>
            
            {lesson.segments.map((seg, index) => (
              <div key={seg.id} className="flex flex-col gap-2 p-3 border border-gray-200 rounded-xl bg-white shadow-sm">
                <div className="flex gap-2 items-center">
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 shrink-0">
                    {index + 1}
                  </div>
                  <input 
                    type="text" 
                    value={seg.title}
                    onChange={(e) => updateSegment(index, 'title', e.target.value)}
                    className="flex-1 p-2 border border-gray-200 rounded font-bold text-sm"
                    placeholder="活動名"
                  />
                  <div className="flex items-center gap-1">
                    <input 
                      type="number" 
                      inputMode="numeric"
                      min="1"
                      value={seg.durationMin}
                      onChange={(e) => updateSegment(index, 'durationMin', Number(e.target.value))}
                      className="w-16 p-2 border border-gray-200 rounded font-bold text-center text-sm"
                    />
                    <span className="text-xs text-gray-400">分</span>
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button 
                    onClick={() => removeSegment(index)}
                    className="text-red-400 hover:text-red-600 text-xs font-bold px-2 py-1"
                  >
                    削除
                  </button>
                </div>
              </div>
            ))}

            <button 
              onClick={addSegment}
              className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-bold hover:bg-gray-50 transition"
            >
              + 活動を追加
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}