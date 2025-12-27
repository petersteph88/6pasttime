import type { Metadata } from "next";
import "./globals.css";
import NextAuthSessionProvider from "@/components/SessionProvider";

export const metadata: Metadata = {
  title: "6 Past Time",
  description: "Your decade wrapped",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthSessionProvider>
          {children}
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}