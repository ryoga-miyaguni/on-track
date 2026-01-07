import { Segment } from '@/types/lesson';

interface Props {
  segments: Segment[];
  currentIndex: number;
  onNext: () => void;
}

export default function Timeline({ segments, currentIndex, onNext }: Props) {
  const nextTitle = segments[currentIndex + 1]?.title || '終了';

  return (
    <footer className="h-[20%] shrink-0 bg-gray-50 border-t border-gray-200 flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-20">
      
      <div className="p-3 bg-white border-b border-gray-100 shrink-0">
        <button 
          onClick={onNext}
          className="w-full py-3 bg-gray-900 text-white rounded-xl text-lg font-bold shadow-md hover:bg-gray-800 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <span>Next:</span>
          <span className="font-normal opacity-90 truncate max-w-45">
            {nextTitle}
          </span>
          <span className="ml-1">→</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2 pb-20">
        {segments.map((seg, index) => {
          const isCurrent = index === currentIndex;
          const isPast = index < currentIndex;
          
          return (
            <div 
              key={seg.id}
              className={`flex items-center p-3 rounded-lg border transition-colors duration-300
                ${isCurrent ? 'bg-white border-blue-500 shadow-md transform scale-[1.02]' : 'border-transparent hover:bg-gray-100'}
                ${isPast ? 'opacity-40 grayscale' : 'opacity-100'}
              `}
            >
              <div className={`w-8 h-8 flex shrink-0 items-center justify-center rounded-full mr-3 text-xs font-bold font-mono
                ${isCurrent ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}
              `}>
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`font-bold text-sm truncate ${isCurrent ? 'text-blue-900' : 'text-gray-700'}`}>
                  {seg.title}
                </div>
                <div className="text-xs text-gray-400 font-mono mt-0.5">{seg.durationMin} min</div>
              </div>
              {isCurrent && (
                <div className="shrink-0 text-[10px] font-bold bg-blue-100 text-blue-600 px-2 py-0.5 rounded ml-2">NOW</div>
              )}
            </div>
          );
        })}
      </div>
    </footer>
  );
}