import { Toaster } from "@/components/ui/sonner"

import { ReactNode } from 'react';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      {children}
      <Toaster />
    </>
  )
}