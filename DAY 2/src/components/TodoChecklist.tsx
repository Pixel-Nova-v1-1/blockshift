"use client";

import React, { useState } from "react";
import { useFocusTimer } from "../context/FocusTimerContext";
import { useAudioEffects } from "../hooks/useAudioEffects";
import { useGlitchScramble } from "../hooks/useGlitchScramble";
import { Plus, Check, Trash2, Skull } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

const INITIAL_TASKS: Task[] = [
  { id: "t-1", text: "Survive the quiet study room", completed: false },
  { id: "t-2", text: "Do not stare into the window shadows", completed: false },
  { id: "t-3", text: "Analyze anomalous memory leak #404", completed: true },
  { id: "t-4", text: "Keep eyes glued to the chalkboard slate", completed: false },
];

export const TodoChecklist: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [inputText, setInputText] = useState("");
  const { effectiveTier } = useFocusTimer();
  const { playChalkClick } = useAudioEffects();

  const handleToggle = (id: string) => {
    playChalkClick();
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    playChalkClick();
    const newTask: Task = {
      id: `t-${Date.now()}`,
      text: inputText.trim(),
      completed: false,
    };
    setTasks((prev) => [...prev, newTask]);
    setInputText("");
  };

  const handleDeleteTask = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    playChalkClick();
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleClearCompleted = () => {
    playChalkClick();
    setTasks((prev) => prev.filter((t) => !t.completed));
  };

  return (
    <div className="flex flex-col h-full text-[#dad7ce] select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 border-b border-white/10 mb-3">
        <div className="flex items-center gap-2">
          <Skull className="w-4 h-4 text-[#ff3b14] animate-pulse" />
          <h2 className="font-chalk text-2xl tracking-wide chalk-text">
            Ritual Objectives
          </h2>
        </div>
        <span className="text-xs font-mono text-neutral-400">
          {tasks.filter((t) => t.completed).length}/{tasks.length} Cleared
        </span>
      </div>

      {/* Input row styled like chalk writing on dark slate */}
      <form onSubmit={handleAddTask} className="relative mb-4">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="+ Scratch new task on dark slate..."
          className="w-full bg-black/40 border-b-2 border-red-950/60 focus:border-[#ff3b14] px-3 py-1.5 font-chalk text-xl text-[#dad7ce] placeholder:text-neutral-600 placeholder:font-chalk placeholder:text-lg focus:outline-none transition-colors"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          aria-label="Add task"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-white/50 hover:text-[#ff3b14] disabled:opacity-0 transition-opacity cursor-pointer"
        >
          <Plus className="w-5 h-5" />
        </button>
      </form>

      {/* Tasks List */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-2.5 max-h-[310px]">
        <AnimatePresence initial={false}>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={handleToggle}
              onDelete={handleDeleteTask}
              tier={effectiveTier}
            />
          ))}
        </AnimatePresence>

        {tasks.length === 0 && (
          <div className="text-center py-8 font-chalk text-2xl text-neutral-500">
            Slate wiped completely clean. What haunts your thoughts next?
          </div>
        )}
      </div>

      {/* Footer / Eraser Action */}
      {tasks.some((t) => t.completed) && (
        <div className="pt-2.5 border-t border-white/10 mt-auto flex justify-end">
          <button
            onClick={handleClearCompleted}
            className="flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-[#ff3b14] transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Purge Completed</span>
          </button>
        </div>
      )}
    </div>
  );
};

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string, e: React.MouseEvent) => void;
  tier: number;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, tier }) => {
  const displayText = useGlitchScramble(task.text, tier as any);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      onClick={() => onToggle(task.id)}
      className={`group flex items-start justify-between gap-3 p-2 rounded cursor-pointer transition-all hover:bg-red-950/20 ${
        task.completed ? "opacity-50" : "opacity-100"
      }`}
    >
      {/* Chalk Checkbox */}
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <div
          className={`w-5 h-5 mt-0.5 rounded border flex items-center justify-center transition-all ${
            task.completed
              ? "bg-[#ff3b14] border-[#ff1133] shadow-[0_0_10px_rgba(255,59,20,0.8)]"
              : "border-red-950/80 group-hover:border-[#ff3b14] bg-black/40"
          }`}
        >
          {task.completed && <Check className="w-3.5 h-3.5 text-black stroke-[3]" />}
        </div>

        {/* Task Text */}
        <span
          className={`font-chalk text-xl leading-snug break-words flex-1 transition-all ${
            task.completed
              ? "chalk-strike chalk-text-dim text-neutral-400"
              : "chalk-text text-[#dad7ce]"
          } ${tier >= 2 ? "font-terminal tracking-tighter text-[#ff3b14]" : ""}`}
        >
          {displayText}
        </span>
      </div>

      {/* Delete button */}
      <button
        onClick={(e) => onDelete(task.id, e)}
        aria-label="Delete task"
        className="opacity-0 group-hover:opacity-100 p-1 text-neutral-500 hover:text-red-400 transition-opacity cursor-pointer"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
};
