"use client";

import { useState, useEffect, useMemo } from "react";
import { useTaskStore } from "@/store/useTaskStore";
import { useNotification } from "@/hooks/useNotification";
import { Header } from "@/components/layout/Header";
import { TaskList } from "@/components/tasks/TaskList";
import { TaskModal } from "@/components/tasks/TaskModal";
import { WelcomeDialog } from "@/components/WelcomeDialog";
import { Task } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FilterType = "all" | "active" | "completed";
type SortType = "dueDate" | "createdAt" | "priority";

export function HomePage() {
  const [userName, setUserName] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<FilterType>("all");
  const [sortBy, setSortBy] = useState<SortType>("dueDate");

  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);
  const updateTask = useTaskStore((state) => state.updateTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const toggleComplete = useTaskStore((state) => state.toggleComplete);

  // 通知フックの初期化
  useNotification();

  // ユーザー名の確認
  useEffect(() => {
    const savedName = localStorage.getItem("user-name");
    if (savedName) {
      setUserName(savedName);
    } else {
      setShowWelcome(true);
    }
  }, []);

  const handleWelcomeComplete = (name: string) => {
    localStorage.setItem("user-name", name);
    setUserName(name);
    setShowWelcome(false);
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setShowTaskModal(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setShowTaskModal(true);
  };

  const handleSaveTask = (task: Task) => {
    if (editingTask) {
      updateTask(task.id, task);
    } else {
      addTask(task);
    }
  };

  const handleDeleteTask = (id: string) => {
    if (confirm("このタスクを削除しますか？")) {
      deleteTask(id);
    }
  };

  // フィルタリングとソート
  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks;

    // フィルター適用
    if (filter === "active") {
      filtered = tasks.filter((task) => !task.isCompleted);
    } else if (filter === "completed") {
      filtered = tasks.filter((task) => task.isCompleted);
    }

    // ソート適用
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "dueDate":
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case "createdAt":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "priority": {
          const priorityOrder = { high: 0, medium: 1, low: 2 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        default:
          return 0;
      }
    });

    return sorted;
  }, [tasks, filter, sortBy]);

  if (!userName) {
    return (
      <WelcomeDialog open={showWelcome} onComplete={handleWelcomeComplete} />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header userName={userName} onAddTask={handleAddTask} />

      <main className="container mx-auto px-4 py-8 md:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">表示:</span>
              <Select
                value={filter}
                onValueChange={(value) => setFilter(value as FilterType)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">すべて</SelectItem>
                  <SelectItem value="active">未完了</SelectItem>
                  <SelectItem value="completed">完了済み</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">並び順:</span>
              <Select
                value={sortBy}
                onValueChange={(value) => setSortBy(value as SortType)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dueDate">期限日時</SelectItem>
                  <SelectItem value="createdAt">作成日時</SelectItem>
                  <SelectItem value="priority">優先度</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            {filteredAndSortedTasks.length}件のタスク
          </div>
        </div>

        <TaskList
          tasks={filteredAndSortedTasks}
          onToggleComplete={toggleComplete}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />
      </main>

      <TaskModal
        open={showTaskModal}
        task={editingTask}
        onClose={() => setShowTaskModal(false)}
        onSave={handleSaveTask}
      />
    </div>
  );
}
