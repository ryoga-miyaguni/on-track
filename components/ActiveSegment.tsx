import { formatTime } from '@/utils/time';
import { Segment } from '@/types/lesson';

interface Props {
  segment: Segment;
  segmentElapsed: number;
  isRunning: boolean;
  onToggleTimer: () => void;
  onAddTime: (seconds: number) => void;
}

export default function ActiveSegment({ segment, segmentElapsed, isRunning, onToggleTimer, onAddTime }: Props) {
  const remainingSeconds = (segment.durationMin * 60) - segmentElapsed;
  const isOvertime = remainingSeconds < 0;

  return (
    <section className={`flex-1 w-full flex flex-col items-center justify-center p-4 text-center transition-colors duration-500 relative
      ${isOvertime ? 'bg-red-50' : 'bg-white'}
    `}>
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 leading-tight px-2 wrap-break-word w-full">
        {segment.title}
      </h1>

      <div 
        onClick={onToggleTimer}
        className={`text-[5rem] leading-none font-mono font-bold tracking-tighter mb-6 cursor-pointer select-none transition-colors
          ${isOvertime ? 'text-red-600' : 'text-gray-900'}
          ${!isRunning ? 'opacity-40' : 'opacity-100'}
        `}
      >
        {isOvertime ? "+" : ""}{formatTime(Math.abs(remainingSeconds))}
      </div>

      {/* ボタンエリア: ご指定のデザインを適用 */}
      <div className="flex items-center gap-4">
        
        {/* 再生/停止ボタン: w-14 h-14, shadow-lg */}
        <button 
          onClick={onToggleTimer}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-all text-white text-2xl mr-4
            ${isRunning ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-600 hover:bg-blue-700'}
          `}
        >
           {isRunning ? '⏸' : '▶'}
        </button>

        {/* 時間追加ボタン: px-4 py-3, rounded-lg, border, shadow-sm */}
        <button 
          onClick={() => onAddTime(30)}
          className="px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm font-bold shadow-sm active:bg-gray-50 active:scale-95 transition"
        >
          +30s
        </button>
        <button 
          onClick={() => onAddTime(60)}
          className="px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm font-bold shadow-sm active:bg-gray-50 active:scale-95 transition"
        >
          +1m
        </button>
      </div>
    </section>
  );
}