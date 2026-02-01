"use client";

import { useState, useEffect } from "react";
import { Task, Priority } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TaskModalProps {
  open: boolean;
  task: Task | null;
  onClose: () => void;
  onSave: (task: Task) => void;
}

export function TaskModal({ open, task, onClose, onSave }: TaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [remindBeforeMinutes, setRemindBeforeMinutes] = useState("15");
  const [priority, setPriority] = useState<Priority>("medium");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      // Date to datetime-local format
      const date = new Date(task.dueDate);
      const offset = date.getTimezoneOffset();
      const localDate = new Date(date.getTime() - offset * 60 * 1000);
      setDueDate(localDate.toISOString().slice(0, 16));
      setRemindBeforeMinutes(task.remindBeforeMinutes.toString());
      setPriority(task.priority);
    } else {
      // Reset for new task
      setTitle("");
      setDescription("");
      // Default to 1 hour from now
      const defaultDate = new Date();
      defaultDate.setHours(defaultDate.getHours() + 1);
      const offset = defaultDate.getTimezoneOffset();
      const localDate = new Date(defaultDate.getTime() - offset * 60 * 1000);
      setDueDate(localDate.toISOString().slice(0, 16));
      setRemindBeforeMinutes("15");
      setPriority("medium");
    }
  }, [task, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    const taskData: Task = {
      id: task?.id || crypto.randomUUID(),
      title: title.trim(),
      description: description.trim() || undefined,
      dueDate: new Date(dueDate),
      remindBeforeMinutes: parseInt(remindBeforeMinutes),
      priority,
      isCompleted: task?.isCompleted || false,
      isNotified: task?.isNotified || false,
      createdAt: task?.createdAt || new Date(),
    };

    onSave(taskData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {task ? "タスクを編集" : "新しいタスク"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">
              タスク名 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="例: プロジェクトの資料を作成"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">説明</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="タスクの詳細（任意）"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate">
              期限 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="dueDate"
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="remindBefore">リマインド</Label>
            <Select
              value={remindBeforeMinutes}
              onValueChange={setRemindBeforeMinutes}
            >
              <SelectTrigger id="remindBefore">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">通知しない</SelectItem>
                <SelectItem value="5">5分前</SelectItem>
                <SelectItem value="15">15分前</SelectItem>
                <SelectItem value="60">1時間前</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">優先度</Label>
            <Select
              value={priority}
              onValueChange={(value) => setPriority(value as Priority)}
            >
              <SelectTrigger id="priority">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">低</SelectItem>
                <SelectItem value="medium">中</SelectItem>
                <SelectItem value="high">高</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              キャンセル
            </Button>
            <Button type="submit">{task ? "更新" : "追加"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
