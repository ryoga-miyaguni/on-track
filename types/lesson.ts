export type ActivityType = 'lecture' | 'group_work' | 'admin' | 'break';

export interface Segment {
  id: string;
  title: string;
  durationMin: number; // 分単位（設定用）
  type: ActivityType;
}

export interface LessonPlan {
  title: string;
  totalDurationMin: number;
  segments: Segment[];
}

// 開発用のダミーデータ（初期表示確認用）
export const MOCK_LESSON: LessonPlan = {
  title: "中学2年 英語 - 不定詞",
  totalDurationMin: 50,
  segments: [
    { id: '1', title: '出席・挨拶', durationMin: 3, type: 'admin' },
    { id: '2', title: '単語テスト', durationMin: 7, type: 'lecture' },
    { id: '3', title: '文法解説', durationMin: 15, type: 'lecture' },
    { id: '4', title: 'ペアワーク', durationMin: 20, type: 'group_work' },
    { id: '5', title: '振り返り', durationMin: 5, type: 'admin' },
  ]
};