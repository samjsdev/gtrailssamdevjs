"use client";

import React, { createContext, useContext, ReactNode } from 'react';

type TemplateData = any;

interface TemplateContextType {
  data: TemplateData;
  basePath: string;
}

const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

export function TemplateProvider({ 
  children, 
  data, 
  basePath 
}: { 
  children: ReactNode; 
  data: TemplateData; 
  basePath: string; 
}) {
  return (
    <TemplateContext.Provider value={{ data, basePath }}>
      {children}
    </TemplateContext.Provider>
  );
}

export function useTemplateData() {
  const context = useContext(TemplateContext);
  if (context === undefined) {
    throw new Error('useTemplateData must be used within a TemplateProvider');
  }
  return context;
}
