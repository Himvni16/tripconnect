import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'School Trip Interest', description: 'Explore learning trips and register your school’s interest.' };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
