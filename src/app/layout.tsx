import type { Metadata } from "next"; 
import { Inter, JetBrains_Mono } from "next/font/google"; 
import "./globals.css"; 
import { ThemeProvider } from "next-themes"; 

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
}); 

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = { 
  title: "Flow Typing", 
  description: "A distraction-free writing environment. Just type.", 
}; 

export default function RootLayout({ 
  children, 
}: Readonly<{ 
  children: React.ReactNode; 
}>) { 
  return ( 
    <html lang="en" suppressHydrationWarning> 
      <body className={`${inter.variable} ${jetbrainsMono.variable} ${inter.className}`}> 
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem> 
          {children} 
        </ThemeProvider> 
      </body> 
    </html> 
  ); 
}