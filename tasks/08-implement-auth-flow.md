# タスク08: 擬似認証フローの実装

## 概要
初回起動時にユーザーの表示名を入力させ、LocalStorageに保存する簡易認証フローを実装します。

## 実装場所
- `app/page.tsx` または専用のコンポーネント
- `hooks/useAuth.ts`（オプション）

## フロー

### 1. 初回アクセス時
1. LocalStorageに `user-name` が存在するかチェック
2. 存在しない場合、ダイアログを表示
3. ユーザーに表示名を入力させる
4. 入力後、LocalStorageに保存

### 2. 2回目以降のアクセス
- LocalStorageから表示名を読み込み
- ヘッダーに表示

## ダイアログの実装
- shadcn/ui の Dialog コンポーネントを使用
- 閉じるボタンを無効化（名前入力が必須）

### ダイアログ内容
```
+--------------------------------+
|  ようこそ！                     |
|  表示名を入力してください        |
|  [入力フィールド]               |
|           [開始]               |
+--------------------------------+
```

## LocalStorage キー
- キー名: `user-name`
- 値: ユーザーが入力した表示名（文字列）

## バリデーション
- 表示名は空欄不可
- 最小1文字、最大20文字程度

## 実装例
```typescript
const [userName, setUserName] = useState<string | null>(null);
const [showDialog, setShowDialog] = useState(false);

useEffect(() => {
  const savedName = localStorage.getItem('user-name');
  if (savedName) {
    setUserName(savedName);
  } else {
    setShowDialog(true);
  }
}, []);

const handleSaveName = (name: string) => {
  localStorage.setItem('user-name', name);
  setUserName(name);
  setShowDialog(false);
};
```

## 注意事項
- SSR（サーバーサイドレンダリング）では LocalStorage にアクセスできないため、`useEffect` 内でチェック
- Next.jsの場合は `"use client"` ディレクティブが必要
