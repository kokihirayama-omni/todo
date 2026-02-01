# タスク03: 型定義の実装

## 概要
アプリケーション全体で使用する型定義を作成します。

## ファイル
`lib/types.ts`

## 実装内容

### Priority型
タスクの優先度を表す型
```typescript
type Priority = 'low' | 'medium' | 'high';
```

### Task型
タスクのデータ構造
```typescript
interface Task {
  id: string;                    // 一意のID（UUID等）
  title: string;                 // タスク名
  description?: string;          // タスクの詳細説明（オプション）
  dueDate: Date;                 // 期限日時
  remindBeforeMinutes: number;   // リマインド時間（0, 5, 15, 60分前）
  priority: Priority;            // 優先度
  isCompleted: boolean;          // 完了フラグ
  isNotified: boolean;           // 通知済みフラグ
  createdAt: Date;               // 作成日時
}
```

## 注意事項
- `remindBeforeMinutes` は 0, 5, 15, 60 のいずれかの値を想定
- Date型はシリアライズ時に文字列に変換される可能性があるため、LocalStorageとの連携時に注意
