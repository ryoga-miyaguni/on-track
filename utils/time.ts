/**
 * 秒数を "mm:ss" 形式の文字列に変換する
 * 例: 65秒 -> "01:05"
 * マイナスの場合は "-01:05" となる
 */
export const formatTime = (seconds: number): string => {
  const isNegative = seconds < 0;
  const absSeconds = Math.abs(seconds);
  
  const m = Math.floor(absSeconds / 60);
  const s = absSeconds % 60;

  const mm = m.toString().padStart(2, '0');
  const ss = s.toString().padStart(2, '0');

  return `${isNegative ? '-' : ''}${mm}:${ss}`;
};