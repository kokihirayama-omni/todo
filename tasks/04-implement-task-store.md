# タスク04: Zustand状態管理の実装

## 概要
Zustandを使用したタスク管理のグローバルステートを実装します。

## ファイル
`store/useTaskStore.ts`

## 実装する機能

### State
- `tasks: Task[]` - タスクのリスト

### Actions
1. **addTask** - タスクを追加
2. **updateTask** - タスクを更新
3. **deleteTask** - タスクを削除
4. **toggleComplete** - 完了状態をトグル
5. **markAsNotified** - 通知済みフラグを立てる

## LocalStorage永続化
- Zustandの `persist` ミドルウェアを使用
- キー名: `task-storage`
- Date型のシリアライズ/デシリアライズに注意

## 実装例の骨格
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task } from '@/lib/types';

interface TaskStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
  markAsNotified: (id: string) => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
      // ... 他のアクション
    }),
    {
      name: 'task-storage',
    }
  )
);
```

## 注意事項
- Date型をJSONとして保存/復元する際の変換処理を実装
- タスクのソート順序（期限日時順など）を考慮
