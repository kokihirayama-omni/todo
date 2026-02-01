import { useEffect, useRef } from 'react';
import { useTaskStore } from '@/store/useTaskStore';
import { Task } from '@/lib/types';

export function useNotification() {
  const tasks = useTaskStore((state) => state.tasks);
  const markAsNotified = useTaskStore((state) => state.markAsNotified);
  const hasRequestedPermission = useRef(false);

  // 通知許可のリクエスト
  useEffect(() => {
    if (!hasRequestedPermission.current && 'Notification' in window) {
      if (Notification.permission === 'default') {
        Notification.requestPermission();
      }
      hasRequestedPermission.current = true;
    }
  }, []);

  // リマインダー監視
  useEffect(() => {
    if (!('Notification' in window) || Notification.permission !== 'granted') {
      return;
    }

    const checkReminders = () => {
      const now = new Date();

      tasks.forEach((task: Task) => {
        // 完了済みまたは既に通知済みのタスクはスキップ
        if (task.isCompleted || task.isNotified) {
          return;
        }

        // remindAt時刻を計算
        const remindAt = new Date(task.dueDate);
        remindAt.setMinutes(remindAt.getMinutes() - task.remindBeforeMinutes);

        // 現在時刻がremindAtを過ぎているかチェック
        if (now >= remindAt) {
          showNotification(task);
          markAsNotified(task.id);
        }
      });
    };

    // 初回チェック
    checkReminders();

    // 30秒ごとにチェック
    const intervalId = setInterval(checkReminders, 30000);

    return () => {
      clearInterval(intervalId);
    };
  }, [tasks, markAsNotified]);

  const showNotification = (task: Task) => {
    const notification = new Notification('タスクリマインダー', {
      body: `"${task.title}" の期限が近づいています`,
      icon: '/favicon.ico',
      tag: task.id,
      requireInteraction: false,
    });

    // 通知をクリックした時の処理
    notification.onclick = () => {
      window.focus();
      notification.close();
    };
  };

  return {
    isSupported: 'Notification' in window,
    permission: 'Notification' in window ? Notification.permission : 'denied',
  };
}
