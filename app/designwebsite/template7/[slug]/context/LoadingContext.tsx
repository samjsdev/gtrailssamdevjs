"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

interface LoadingContextType {
  registerBlockingTask: (id: string) => void;
  completeBlockingTask: (id: string) => void;
  isLoading: boolean;
  blockingTasks: Set<string>;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  // Start with an initialization task to prevent early completion before components mount
  const [blockingTasks, setBlockingTasks] = useState<Set<string>>(new Set(['app-init']));

  useEffect(() => {
    // Clear the initialization task after a brief moment to allow child components (like Hero) 
    // to register their own blocking tasks.
    const timer = setTimeout(() => {
      setBlockingTasks((prev) => {
        const newSet = new Set(prev);
        newSet.delete('app-init');
        return newSet;
      });
    }, 100); // 100ms is enough for React to mount children and run their effects
    return () => clearTimeout(timer);
  }, []);

  const registerBlockingTask = useCallback((id: string) => {
    setBlockingTasks((prev) => {
      const newSet = new Set(prev);
      newSet.add(id);
      return newSet;
    });
  }, []);

  const completeBlockingTask = useCallback((id: string) => {
    setBlockingTasks((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  }, []);

  const value = useMemo(() => ({
    registerBlockingTask,
    completeBlockingTask,
    isLoading: blockingTasks.size > 0,
    blockingTasks
  }), [blockingTasks, registerBlockingTask, completeBlockingTask]);

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}
