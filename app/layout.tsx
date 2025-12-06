import type { Metadata } from 'next';
import "./globals.css";

export const metadata: Metadata = {
  title: 'Nike Store · Next.js Demo',
  description: 'Tienda demo de zapatillas Nike con Next.js, TypeScript y TailwindCSS.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-slate-950 text-slate-50 antialiased">
        {children}
      </body>
    </html>
  );
}
