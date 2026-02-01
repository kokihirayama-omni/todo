# タスク10: Framer Motionアニメーションの追加

## 概要
Framer Motionを使用してUIにアニメーションを追加し、UXを向上させます。

## 実装するアニメーション

### 1. タスク完了時のフェードアウト
```typescript
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 1 }}
  animate={{ opacity: isCompleted ? 0.5 : 1 }}
  transition={{ duration: 0.3 }}
>
  {/* TaskCard の内容 */}
</motion.div>
```

### 2. リスト追加時のスライドイン
```typescript
<motion.div
  initial={{ x: -20, opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  transition={{ duration: 0.4, ease: "easeOut" }}
>
  {/* TaskCard */}
</motion.div>
```

### 3. タスク削除時のスライドアウト
```typescript
<motion.div
  exit={{ x: 100, opacity: 0 }}
  transition={{ duration: 0.3 }}
>
  {/* TaskCard */}
</motion.div>
```

### 4. モーダルの表示/非表示アニメーション
```typescript
<motion.div
  initial={{ scale: 0.9, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  exit={{ scale: 0.9, opacity: 0 }}
  transition={{ duration: 0.2 }}
>
  {/* TaskModal の内容 */}
</motion.div>
```

### 5. リスト全体のレイアウトアニメーション
```typescript
import { AnimatePresence } from 'framer-motion';

<AnimatePresence>
  {tasks.map((task) => (
    <motion.div
      key={task.id}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
    >
      <TaskCard task={task} />
    </motion.div>
  ))}
</AnimatePresence>
```

## 追加するマイクロインタラクション

### ボタンホバー効果
```typescript
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  追加
</motion.button>
```

### カードホバー効果
```typescript
<motion.div
  whileHover={{ y: -4, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
  transition={{ duration: 0.2 }}
>
  {/* TaskCard */}
</motion.div>
```

## 実装のポイント
- `AnimatePresence` を使用してリストアイテムの追加/削除をスムーズに
- `layout` プロパティでレイアウト変更時の自動アニメーション
- アニメーションは控えめに（duration: 0.2〜0.4秒程度）
- パフォーマンスに配慮（transform, opacityのみ使用）

## 注意事項
- 過度なアニメーションは避け、UXを損なわないように
- アクセシビリティ: `prefers-reduced-motion` メディアクエリに対応
```typescript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
```
