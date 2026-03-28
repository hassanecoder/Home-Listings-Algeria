import { Link } from "wouter";
import { Home, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Home className="text-white w-6 h-6" />
              </div>
              <h2 className="font-display font-bold text-3xl">
                Darkom <span className="text-primary font-sans">دارك</span>
              </h2>
            </Link>
            <p className="text-secondary-foreground/70 leading-relaxed">
              Le premier portail immobilier et mobilier en Algérie. Trouvez la maison de vos rêves ou meublez votre espace en quelques clics.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-xl mb-6">Liens Rapides</h3>
            <ul className="space-y-4">
              <li><Link href="/" className="text-secondary-foreground/70 hover:text-primary transition-colors">Accueil</Link></li>
              <li><Link href="/listings" className="text-secondary-foreground/70 hover:text-primary transition-colors">Toutes les annonces</Link></li>
              <li><Link href="/post" className="text-secondary-foreground/70 hover:text-primary transition-colors">Déposer une annonce</Link></li>
              <li><Link href="/about" className="text-secondary-foreground/70 hover:text-primary transition-colors">À propos de nous</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-display font-bold text-xl mb-6">Catégories</h3>
            <ul className="space-y-4">
              <li><Link href="/listings?type=sell" className="text-secondary-foreground/70 hover:text-primary transition-colors">Vente Immobilier</Link></li>
              <li><Link href="/listings?type=rent" className="text-secondary-foreground/70 hover:text-primary transition-colors">Location Immobilier</Link></li>
              <li><Link href="/listings" className="text-secondary-foreground/70 hover:text-primary transition-colors">Meubles & Déco</Link></li>
              <li><Link href="/listings" className="text-secondary-foreground/70 hover:text-primary transition-colors">Électroménager</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-bold text-xl mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-secondary-foreground/70">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>Centre des Affaires, Bab Ezzouar, Alger, Algérie</span>
              </li>
              <li className="flex items-center gap-3 text-secondary-foreground/70">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span dir="ltr">+213 (0) 555 12 34 56</span>
              </li>
              <li className="flex items-center gap-3 text-secondary-foreground/70">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>contact@darkom.dz</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-secondary-foreground/50">
          <p>© {new Date().getFullYear()} Darkom Algérie. Tous droits réservés.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Conditions d'utilisation</a>
            <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
