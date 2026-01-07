import Link from 'next/link';
import { formatTime } from '@/utils/time';

interface Props {
  elapsedTotal: number;
  totalDurationMin: number;
}

export default function LessonHeader({ elapsedTotal, totalDurationMin }: Props) {
  const safeDuration = totalDurationMin > 0 ? totalDurationMin : 1;
  const progressPercent = Math.min((elapsedTotal / (safeDuration * 60)) * 100, 100);

  return (
    <header className="h-[15%] min-h-20 shrink-0 bg-white border-b border-gray-200 flex flex-col justify-center px-6 relative z-10 shadow-sm">
      <div className="flex items-end justify-between mb-3">
        <div className="flex flex-col">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Total Progress</span>
          <div className="font-mono text-3xl font-bold text-gray-800 leading-none">
            {formatTime(elapsedTotal)}
            <span className="text-sm text-gray-400 font-normal ml-2">/ {totalDurationMin}:00</span>
          </div>
        </div>
        
        <Link 
          href="/edit" 
          className="bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-xl font-bold text-lg shadow-md transition-transform active:scale-95 border border-blue-600"
        >
          編集
        </Link>
      </div>

      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden border border-gray-100">
        <div 
          className="h-full bg-blue-500 transition-all duration-1000 ease-linear rounded-full"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
    </header>
  );
}