// src/app/page.tsx
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('@/app/login/page');
  return null;
}
