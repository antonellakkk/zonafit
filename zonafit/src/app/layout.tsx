import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ZonaFit | Entrená y Movéte desde Casa',
  description: 'Ejercicios, rutinas, calendario, seguimiento y perfil para jóvenes que quieren entrenar desde casa sin necesidad de gimnasio.',
  keywords: 'ejercicios en casa, rutinas fitness, resistencia, fuerza, vida activa, calendario fitness, calistenia, zonafit',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className="min-h-screen bg-[#0a0a0c] text-slate-100 antialiased selection:bg-[#e50914] selection:text-white">
        {children}
      </body>
    </html>
  );
}
