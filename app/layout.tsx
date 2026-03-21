import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Fitness Apparels | Lift Heavy",
  description: "Modern fitness apparel and accessories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        {/* TODO: Add logic here for global Context Providers (e.g., Theme, Cart) */}
        
        {/* TODO: Implement <Navbar /> component here inside /components/layout */}
        <header className="w-full border-b border-zinc-200 p-4">
          <nav className="container mx-auto flex justify-between items-center text-sm font-medium tracking-wide">
            <div className="text-xl font-black uppercase tracking-tighter">LIFT.APP</div>
            <div className="hidden md:flex gap-6">
              {/* Placeholder for actual links */}
              <span className="cursor-pointer hover:text-zinc-500 transition-colors">Men</span>
              <span className="cursor-pointer hover:text-zinc-500 transition-colors">Women</span>
              <span className="cursor-pointer hover:text-zinc-500 transition-colors">Accessories</span>
            </div>
            <div>
              {/* TODO: integrate API routes / authentication logic (e.g., NextAuth) */}
              {/* TODO: integrate ecommerce logic / cart drawer trigger */}
              <button className="px-4 py-2 bg-zinc-950 text-white rounded-md text-xs font-bold uppercase tracking-wider hover:bg-zinc-800 transition-colors">
                Cart (0)
              </button>
            </div>
          </nav>
        </header>

        <main className="min-h-screen">
          {children}
        </main>

        {/* TODO: Implement <Footer /> component here inside /components/layout */}
        <footer className="w-full border-t border-zinc-200 p-8 mt-16 text-center text-zinc-500 text-xs">
          © {new Date().getFullYear()} Fitness Ecommerce. All Rights Reserved. Development Boilerplate.
        </footer>
      </body>
    </html>
  );
}
