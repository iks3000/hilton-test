"use client";
import { Inter } from "next/font/google";
import { Box, Container, CssBaseline, ThemeProvider } from "@mui/material";
import { AuthProvider } from "@/context/AuthContext";
import '../styles/styles.css';
import theme from "@/styles/theme";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <body className={inter.className}>
            <Container maxWidth='md'>
              {children}
            </Container>
          </body>
        </ThemeProvider>
      </AuthProvider>
    </html>
  );
}
