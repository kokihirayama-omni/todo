1. システム概要
社内チーム向けのモダンなリマインダー・タスク管理Webアプリを構築してください。

目的: 確実な通知と、直感的なタスク管理。

UXの肝: ブラウザのNotification APIを活用したプッシュ通知。

UIスタイル: 清潔感のあるモダンデザイン（shadcn/ui + Framer Motion）。

2. 技術スタック（厳守）
Framework: React (Vite / TypeScript)

Styling: Tailwind CSS

UI Library: shadcn/ui (Radix UI)

Animation: Framer Motion

Icons: Lucide React

State Management: Zustand (persistミドルウェアでLocalStorage同期)

Date Utilities: date-fns

3. ディレクトリ構造案
Plaintext
src/
├── components/
│   ├── ui/           # shadcn/ui components
│   ├── layout/       # AppShell, Header
│   └── tasks/        # TaskCard, TaskList, TaskModal
├── store/            # useTaskStore.ts (Zustand)
├── hooks/            # useNotification.ts
└── lib/              # utils.ts, types.ts
4. 機能要件詳細
4.1 タスク・データ構造
TypeScript
type Priority = 'low' | 'medium' | 'high';
interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: Date;
  remindBeforeMinutes: number; // 0, 5, 15, 60
  priority: Priority;
  isCompleted: boolean;
  isNotified: boolean;
  createdAt: Date;
}
4.2 コア機能
タスク管理: CRUD一式。ZustandとLocalStorageでリロード後もデータを保持。

通知機能:

Notification.requestPermission() による許可取得。

setInterval 等を用い、バックグラウンド（タブが開いている状態）で remindAt を監視。

条件合致時にデスクトップ通知を発行し、isNotified を true に更新。

擬似認証: 初回起動時に「表示名」を入力させ、LocalStorageに保存する簡易フロー。

4.3 UI/UX詳細
アクセシビリティ: shadcn/uiのDialogやSelectを用いた、キーボード操作可能なUI。

アニメーション: タスク完了時のフェードアウト、リスト追加時のスライドイン。

レスポンシブ: モバイル/デスクトップ両対応。

5. 実装ステップ（Claude Codeへの指示）
npm create vite@latest . -- --template react-ts を実行。

lucide-react, zustand, date-fns, framer-motion をインストール。

npx shadcn-ui@latest init を実行し、必要なコンポーネント（Button, Input, Dialog, Card, Select, Badge, Checkbox, Toast）を追加。

useTaskStore.ts でデータ永続化を含む状態管理を実装。

useNotification.ts でブラウザ通知ロジックを実装。

UIの実装を行い、最後に Framer Motion で磨きをかける。