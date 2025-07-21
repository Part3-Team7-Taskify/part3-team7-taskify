'use client';

import { createContext, useContext } from 'react';
import { useRouter } from 'next/navigation';

interface RouterContextType {
  router: ReturnType<typeof useRouter>;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export const RouterProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  return <RouterContext.Provider value={{ router }}>{children}</RouterContext.Provider>;
};

export const useRouterContext = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouterContext must be used within a RouterProvider');
  }
  return context;
};
