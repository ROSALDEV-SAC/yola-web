import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "YOLA - Hive Mind AI",
    description: "Inteligencia de Enjambre Neuronal Distribuida. No tires tu laptop vieja, conviértela en el lóbulo temporal de tu IA.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body>{children}</body>
        </html>
    );
}
