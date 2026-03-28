import { MapPin, ShieldCheck, TrendingUp, Users } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-24">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-secondary mb-6">
          À propos de <span className="text-primary">Darkom</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Née de la volonté de simplifier et sécuriser l'accès à l'immobilier et à l'équipement de maison en Algérie, Darkom est aujourd'hui la plateforme de référence pour des milliers de foyers.
        </p>
      </section>

      {/* Image */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
          <img 
            src={`${import.meta.env.BASE_URL}images/about-team.png`} 
            alt="L'équipe Darkom" 
            className="w-full h-auto object-cover"
          />
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-24 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold text-secondary">Nos Valeurs Fondamentales</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-background p-8 rounded-2xl border border-border text-center hover:shadow-xl hover:border-primary/30 transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-3">Confiance</h3>
              <p className="text-muted-foreground text-sm">Des processus de vérification rigoureux pour des transactions en toute sérénité.</p>
            </div>
            
            <div className="bg-background p-8 rounded-2xl border border-border text-center hover:shadow-xl hover:border-primary/30 transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-3">Proximité</h3>
              <p className="text-muted-foreground text-sm">Une présence et des offres couvrant l'ensemble des 48 wilayas du pays.</p>
            </div>

            <div className="bg-background p-8 rounded-2xl border border-border text-center hover:shadow-xl hover:border-primary/30 transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-3">Communauté</h3>
              <p className="text-muted-foreground text-sm">Au centre de notre démarche : bâtir une communauté d'acheteurs et vendeurs satisfaits.</p>
            </div>

            <div className="bg-background p-8 rounded-2xl border border-border text-center hover:shadow-xl hover:border-primary/30 transition-all">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-3">Innovation</h3>
              <p className="text-muted-foreground text-sm">L'utilisation des meilleures technologies pour simplifier votre recherche.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 text-center">
        <div className="bg-secondary rounded-3xl p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('../public/images/pattern-bg.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-display font-bold text-white mb-4">Rejoignez l'aventure</h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">
              Vous avez un bien à vendre ou à louer ? Créez votre compte et publiez votre première annonce dès aujourd'hui.
            </p>
            <a href="/post" className="inline-block bg-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-white hover:text-primary transition-colors shadow-lg">
              Commencer maintenant
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
