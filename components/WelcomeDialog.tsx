"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface WelcomeDialogProps {
  open: boolean;
  onComplete: (name: string) => void;
}

export function WelcomeDialog({ open, onComplete }: WelcomeDialogProps) {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (trimmedName) {
      onComplete(trimmedName);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">ようこそ！</DialogTitle>
          <DialogDescription>
            表示名を入力してタスク管理を始めましょう
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">表示名</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="山田太郎"
              maxLength={20}
              required
              autoFocus
            />
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full">
              開始
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
