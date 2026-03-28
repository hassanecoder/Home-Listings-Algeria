import { Link, useLocation } from "wouter";
import { Search, PlusCircle, Menu, X, Home, Building2, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Accueil", labelAr: "الرئيسية" },
    { href: "/listings", label: "Annonces", labelAr: "إعلانات" },
    { href: "/about", label: "À propos", labelAr: "معلومات عنا" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
          isScrolled || isMobileMenuOpen
            ? "bg-background/95 backdrop-blur-md border-border shadow-sm py-3"
            : "bg-transparent border-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-amber-400 flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300 group-hover:-translate-y-0.5">
                <Home className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="font-display font-bold text-2xl leading-none text-foreground">
                  Darkom <span className="text-primary font-sans text-xl ml-1">دارك</span>
                </h1>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "group relative font-medium transition-colors",
                    location === link.href ? "text-primary" : "text-foreground/80 hover:text-primary"
                  )}
                >
                  <span className="flex flex-col items-center">
                    <span>{link.label}</span>
                    <span className="text-[10px] opacity-70 group-hover:opacity-100 transition-opacity -mt-1 font-serif">
                      {link.labelAr}
                    </span>
                  </span>
                  {location === link.href && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary rounded-full"
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/listings"
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-secondary/5 text-foreground transition-colors"
              >
                <Search className="w-5 h-5" />
              </Link>
              <Link
                href="/post"
                className="flex items-center gap-2 px-5 py-2.5 bg-secondary text-white rounded-xl font-semibold hover:bg-secondary/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Déposer une annonce</span>
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 -mr-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background pt-24 px-4 pb-6 md:hidden flex flex-col"
          >
            <div className="flex flex-col gap-4 flex-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between p-4 rounded-2xl text-lg font-medium",
                    location === link.href ? "bg-primary/10 text-primary" : "bg-secondary/5 text-foreground"
                  )}
                >
                  <span>{link.label}</span>
                  <span className="font-serif">{link.labelAr}</span>
                </Link>
              ))}
              
              <div className="mt-auto pt-6 border-t border-border">
                <Link
                  href="/post"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 p-4 bg-primary text-white rounded-2xl font-bold text-lg"
                >
                  <PlusCircle className="w-6 h-6" />
                  <span>Déposer une annonce</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
