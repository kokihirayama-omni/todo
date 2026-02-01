# タスク02: shadcn/uiの初期化とコンポーネント追加

## 概要
shadcn/uiを初期化し、必要なUIコンポーネントを追加します。

## 初期化コマンド
```bash
npx shadcn@latest init
```

## 追加するコンポーネント
1. **Button** - ボタンコンポーネント
2. **Input** - 入力フィールド
3. **Dialog** - モーダルダイアログ
4. **Card** - カードコンテナ
5. **Select** - セレクトボックス
6. **Badge** - バッジ（優先度表示用）
7. **Checkbox** - チェックボックス（完了マーク用）
8. **Toast** - トースト通知

## コマンド例
```bash
npx shadcn@latest add button input dialog card select badge checkbox toast
```

## 生成されるファイル
- `components/ui/` 配下に各コンポーネントが生成される
- `lib/utils.ts` - ユーティリティ関数（cn関数など）

## 確認方法
- `components/ui/` ディレクトリに各コンポーネントファイルが存在することを確認
