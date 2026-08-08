import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { TooltipProvider } from '@/components/ui/tooltip';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AgentOS — Player Intelligence & Transfer Operations',
  description: 'AI-powered player intelligence and transfer operations platform for professional football agencies.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <body className="bg-[#0B0D0F] text-[#F3F4F6] antialiased selection:bg-[#B8F35A] selection:text-[#0B0D0F]">
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
