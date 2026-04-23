import "./globals.css";
import { AnimatedLayout } from "@/Componentes/AnimatedLayout";
import AgendaProvider from "@/ContextosGlobales/AgendaContext";
import { Inter, Playfair_Display, Pinyon_Script } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const pinyonScript = Pinyon_Script({
  subsets: ["latin"],
  variable: "--font-pinyon",
  weight: "400",
});

export const metadataBase = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.avelie.cl");

export const metadata = {
  title: {
    default: "Avelie | Centro Estetico Las Condes",
    template: "%s | Avelie",
  },
  description:
    "Avelie es un centro estetico en Las Condes especializado en depilacion laser, lipo laser, mesoterapia y tratamientos de belleza con tecnologia avanzada y atencion personalizada.",
  keywords: [
    "Avelie",
    "centro estetico Las Condes",
    "depilacion laser Santiago",
    "lipo laser",
    "mesoterapia corporal",
    "tratamientos esteticos",
    "depilacion definitiva",
    "tecnologia trilaser",
    "belleza Las Condes",
    "estetica femenina",
  ],
  authors: [{ name: "Avelie", url: metadataBase.href }],
  publisher: "Avelie",
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
  alternates: {
    canonical: metadataBase.href,
  },
  icons: {
    icon: "/avalielogo1.png",
    shortcut: "/avalielogo1.png",
    apple: "/avalielogo1.png",
  },
  openGraph: {
    title: "Avelie | Centro Estetico Las Condes",
    description:
      "Espacio dedicado a realzar tu belleza con resultados visibles, tecnologia avanzada y una experiencia cercana, elegante y personalizada.",
    url: metadataBase.href,
    siteName: "Avelie",
    locale: "es_CL",
    type: "website",
    images: [{ url: "/avalielogo1.png", width: 512, height: 512, alt: "Avelie Centro Estetico" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Avelie | Centro Estetico Las Condes",
    description: "Depilacion laser, lipo laser y tratamientos esteticos con tecnologia avanzada en Las Condes.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable} ${pinyonScript.variable}`}>
      <body className="min-h-screen bg-white">
        <AnimatedLayout>
          <AgendaProvider>{children}</AgendaProvider>
        </AnimatedLayout>
      </body>
    </html>
  );
}
