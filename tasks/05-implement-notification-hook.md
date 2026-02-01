# タスク05: 通知フックの実装

## 概要
ブラウザのNotification APIを使用したリマインダー通知機能を実装します。

## ファイル
`hooks/useNotification.ts`

## 実装する機能

### 1. 通知許可のリクエスト
```typescript
const requestPermission = async () => {
  const permission = await Notification.requestPermission();
  return permission === 'granted';
};
```

### 2. リマインダー監視ロジック
- `setInterval` を使用して定期的にタスクをチェック
- 各タスクの `remindAt` 時刻と現在時刻を比較
- 条件に合致したらデスクトップ通知を発行

### 3. 通知の表示
```typescript
const showNotification = (task: Task) => {
  new Notification('タスクリマインダー', {
    body: `"${task.title}" の期限が近づいています`,
    icon: '/icon.png',
    tag: task.id,
  });
};
```

## remindAt の計算
- `remindAt = dueDate - remindBeforeMinutes`
- 現在時刻が `remindAt` を過ぎていて、`isNotified` が false の場合に通知

## 実装の流れ
1. コンポーネントマウント時に通知許可をリクエスト
2. `useEffect` 内で `setInterval` を設定（例: 30秒ごと）
3. タスクリストをループし、通知が必要なタスクをチェック
4. 通知後、`markAsNotified` を呼び出す
5. アンマウント時に `clearInterval`

## 注意事項
- ブラウザがバックグラウンドでも動作するが、タブを閉じると停止
- Service Workerを使えば完全なバックグラウンド動作も可能（今回は不要）
- 通知許可が拒否された場合のハンドリング
