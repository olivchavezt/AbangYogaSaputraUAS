'use client';

import { Toaster as Sonner } from 'sonner';

export function Toaster() {
  return (
    <Sonner
      position="top-right"
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast: 'group-[.toaster]:bg-background group-[.toaster]:text-foreground',
          description: 'group-[.toast]:text-muted-foreground',
        },
      }}
    />
  );
}