import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SidebarProvider } from "@/components/SidebarContext";
import MainContent from "@/components/MainContent";
import { AuthProvider } from "@/contexts/AuthContext";
import ConditionalSidebar from "@/components/ConditionalSidebar";
import PushNotificationInitializer from "@/components/PushNotificationInitializer";

// Bricolage Grotesque for headings
const bricolageGrotesque = Bricolage_Grotesque({
    variable: "--font-heading",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    display: "swap",
});

// Onset Regular for body text (paragraphs, lists, links)
// TODO: Replace with Onset font when files are added to public/fonts/
// For now, using Inter as a temporary fallback
// To use Onset, uncomment the localFont code below and add font files to public/fonts/
const onsetRegular = Inter({
    variable: "--font-body",
    subsets: ["latin"],
    weight: ["400"],
    display: "swap",
});

// Uncomment this when Onset font files are added to public/fonts/ directory:
// const onsetRegular = localFont({
//     src: [
//         {
//             path: "../public/fonts/Onset-Regular.woff2",
//             weight: "400",
//             style: "normal",
//         },
//         {
//             path: "../public/fonts/Onset-Regular.woff",
//             weight: "400",
//             style: "normal",
//         },
//     ],
//     variable: "--font-body",
//     fallback: ["Arial", "Helvetica", "sans-serif"],
//     display: "swap",
// });

export const metadata: Metadata = {
    title: "Diag Wheels - E-Learning Platform",
    description: "Professional automotive technology e-learning platform",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${bricolageGrotesque.variable} ${onsetRegular.variable} antialiased`}
            >
                <AuthProvider>
                    <SidebarProvider>
                        <PushNotificationInitializer />
                        <div className="min-h-screen bg-slate-50 flex flex-col">
                            <Header />
                            <ConditionalSidebar />
                            <MainContent className="flex-1">
                                {children}
                            </MainContent>
                            <Footer />
                        </div>
                    </SidebarProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
