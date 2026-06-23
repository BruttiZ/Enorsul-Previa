import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Enorsul 2026 | Engenharia, Operacao e Inteligencia em Saneamento",
  description:
    "Solucoes inteligentes em saneamento: operacao, engenharia, automacao, GIS, telemetria e controle operacional para todo o Brasil.",
  keywords: [
    "Enorsul",
    "saneamento",
    "engenharia sanitaria",
    "telemetria",
    "GIS",
    "reducao de perdas",
    "automacao"
  ],
  openGraph: {
    title: "Enorsul 2026",
    description:
      "Engenharia, operacao e inteligencia aplicadas ao saneamento brasileiro.",
    type: "website",
    locale: "pt_BR"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
