# タスク一覧

社内チーム向けのリマインダー・タスク管理Webアプリ開発タスクです。

## タスク概要

| No | タスク名 | ファイル | 状態 |
|:--:|:--------|:--------|:----:|
| 01 | 依存パッケージのインストール | [01-install-dependencies.md](./01-install-dependencies.md) | ⬜️ |
| 02 | shadcn/uiの初期化とコンポーネント追加 | [02-setup-shadcn-ui.md](./02-setup-shadcn-ui.md) | ⬜️ |
| 03 | 型定義の実装 | [03-implement-types.md](./03-implement-types.md) | ⬜️ |
| 04 | Zustand状態管理の実装 | [04-implement-task-store.md](./04-implement-task-store.md) | ⬜️ |
| 05 | 通知フックの実装 | [05-implement-notification-hook.md](./05-implement-notification-hook.md) | ⬜️ |
| 06 | レイアウトコンポーネントの実装 | [06-implement-layout-components.md](./06-implement-layout-components.md) | ⬜️ |
| 07 | タスクコンポーネントの実装 | [07-implement-task-components.md](./07-implement-task-components.md) | ⬜️ |
| 08 | 擬似認証フローの実装 | [08-implement-auth-flow.md](./08-implement-auth-flow.md) | ⬜️ |
| 09 | メインページの実装 | [09-implement-main-page.md](./09-implement-main-page.md) | ⬜️ |
| 10 | Framer Motionアニメーションの追加 | [10-add-animations.md](./10-add-animations.md) | ⬜️ |
| 11 | レスポンシブデザインの調整とアクセシビリティの確認 | [11-responsive-and-accessibility.md](./11-responsive-and-accessibility.md) | ⬜️ |

## 実装順序

タスクは基本的に番号順に実装することを推奨しますが、以下のように並列実行できる部分もあります：

### Phase 1: セットアップ（01-03）
1. 依存パッケージのインストール
2. shadcn/uiの初期化
3. 型定義の実装

### Phase 2: コア機能（04-05）
4. Zustand状態管理の実装
5. 通知フックの実装

### Phase 3: UI実装（06-09）
6. レイアウトコンポーネントの実装
7. タスクコンポーネントの実装
8. 擬似認証フローの実装
9. メインページの実装

### Phase 4: 仕上げ（10-11）
10. Framer Motionアニメーションの追加
11. レスポンシブデザインの調整とアクセシビリティの確認

## 技術スタック

- **Framework**: Next.js 16.1.6 (App Router)
- **UI**: React 19
- **Styling**: Tailwind CSS v4
- **UI Library**: shadcn/ui (Radix UI)
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **State Management**: Zustand
- **Date Utilities**: date-fns

## 参考資料

- [仕様書](../docs/specification.md)
- [CLAUDE.md](../CLAUDE.md)
