"use client";

import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { Calendar, Clock, Edit2, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Task, Priority } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const priorityConfig: Record<
  Priority,
  { label: string; className: string }
> = {
  low: { label: "低", className: "bg-green-100 text-green-800 hover:bg-green-100" },
  medium: { label: "中", className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" },
  high: { label: "高", className: "bg-red-100 text-red-800 hover:bg-red-100" },
};

export function TaskCard({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
}: TaskCardProps) {
  const priorityStyle = priorityConfig[task.priority];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: task.isCompleted ? 0.6 : 1,
        y: 0
      }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
    >
      <Card
        className={cn(
          "transition-all",
          task.isCompleted && "opacity-60"
        )}
      >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-start gap-3 flex-1">
            <Checkbox
              checked={task.isCompleted}
              onCheckedChange={() => onToggleComplete(task.id)}
              className="mt-1"
            />
            <div className="flex-1 min-w-0">
              <h3
                className={cn(
                  "text-base font-semibold break-words",
                  task.isCompleted && "line-through text-muted-foreground"
                )}
              >
                {task.title}
              </h3>
              {task.description && (
                <p className="mt-1 text-sm text-muted-foreground break-words">
                  {task.description}
                </p>
              )}
            </div>
          </div>
          <Badge className={priorityStyle.className}>
            {priorityStyle.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{format(task.dueDate, "M月d日(E) HH:mm", { locale: ja })}</span>
          </div>
          {task.remindBeforeMinutes > 0 && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{task.remindBeforeMinutes}分前に通知</span>
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(task)}
            className="flex-1 gap-2"
          >
            <Edit2 className="h-3 w-3" />
            編集
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(task.id)}
            className="flex-1 gap-2 text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            <Trash2 className="h-3 w-3" />
            削除
          </Button>
        </div>
      </CardContent>
    </Card>
    </motion.div>
  );
}
