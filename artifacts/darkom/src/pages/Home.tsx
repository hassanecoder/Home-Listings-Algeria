import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Search, MapPin, Building, Home as HomeIcon, Sofa, ArrowRight, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";
import { useGetListings, useGetCategories, useGetWilayas, useGetStats } from "@workspace/api-client-react";
import { ListingCard } from "@/components/ListingCard";
import { formatNumber } from "@/lib/utils";

export default function Home() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedWilaya, setSelectedWilaya] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const { data: stats } = useGetStats();
  const { data: categories } = useGetCategories();
  const { data: wilayas } = useGetWilayas();
  const { data: featuredListings, isLoading: isLoadingFeatured } = useGetListings({ featured: true, limit: 6 });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.append("search", searchQuery);
    if (selectedWilaya) params.append("wilayaId", selectedWilaya);
    if (selectedType) params.append("type", selectedType);
    setLocation(`/listings?${params.toString()}`);
  };

  return (
    <main className="flex-1 w-full bg-background overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`} 
            alt="Modern Algerian Home" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/70 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary font-bold tracking-wide text-sm mb-6 backdrop-blur-md border border-primary/30">
                #1 Marketplace en Algérie
              </span>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-6">
                Trouvez la maison <br className="hidden md:block"/>
                <span className="text-primary">idéale</span> aujourd'hui.
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl font-light">
                De l'appartement moderne au centre d'Alger jusqu'aux meubles artisanaux pour votre salon. Tout est sur Darkom.
              </p>
            </motion.div>

            {/* Search Box */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/10 backdrop-blur-xl p-3 md:p-4 rounded-3xl border border-white/20 shadow-2xl"
            >
              <form onSubmit={handleSearch} className="bg-white rounded-2xl flex flex-col md:flex-row overflow-hidden shadow-inner">
                <div className="flex-1 flex items-center px-4 py-3 md:py-0 border-b md:border-b-0 md:border-r border-border focus-within:bg-secondary/5 transition-colors">
                  <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                  <input 
                    type="text" 
                    placeholder="Que cherchez-vous ?" 
                    className="w-full bg-transparent border-none outline-none px-3 py-3 text-foreground placeholder:text-muted-foreground"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex-1 flex items-center px-4 py-3 md:py-0 border-b md:border-b-0 md:border-r border-border focus-within:bg-secondary/5 transition-colors">
                  <MapPin className="w-5 h-5 text-muted-foreground shrink-0" />
                  <select 
                    className="w-full bg-transparent border-none outline-none px-3 py-3 text-foreground cursor-pointer appearance-none"
                    value={selectedWilaya}
                    onChange={(e) => setSelectedWilaya(e.target.value)}
                  >
                    <option value="">Toutes les wilayas</option>
                    {wilayas?.map(w => (
                      <option key={w.id} value={w.id}>{w.code} - {w.name}</option>
                    ))}
                  </select>
                </div>

                <div className="flex-1 flex items-center px-4 py-3 md:py-0 focus-within:bg-secondary/5 transition-colors">
                  <Building className="w-5 h-5 text-muted-foreground shrink-0" />
                  <select 
                    className="w-full bg-transparent border-none outline-none px-3 py-3 text-foreground cursor-pointer appearance-none"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                  >
                    <option value="">Vente ou Location</option>
                    <option value="sell">À Vendre</option>
                    <option value="rent">À Louer</option>
                  </select>
                </div>

                <button type="submit" className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-4 md:py-0 transition-colors flex items-center justify-center gap-2">
                  <span>Rechercher</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-white border-b border-border relative z-20 -mt-10 mx-4 md:mx-auto max-w-5xl rounded-2xl shadow-xl p-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border">
          <div className="text-center px-4">
            <div className="text-3xl font-display font-bold text-secondary mb-1">
              {stats ? formatNumber(stats.totalListings) : "15K+"}
            </div>
            <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Annonces</div>
          </div>
          <div className="text-center px-4">
            <div className="text-3xl font-display font-bold text-secondary mb-1">
              {stats ? formatNumber(stats.wilayas) : "48"}
            </div>
            <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Wilayas</div>
          </div>
          <div className="text-center px-4">
            <div className="text-3xl font-display font-bold text-secondary mb-1">
              {stats ? formatNumber(stats.totalSellers) : "8K+"}
            </div>
            <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Vendeurs</div>
          </div>
          <div className="text-center px-4">
            <div className="text-3xl font-display font-bold text-primary mb-1">
              +{stats ? stats.newToday : "120"}
            </div>
            <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Aujourd'hui</div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-background bg-pattern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-4">Explorer par catégorie</h2>
              <p className="text-muted-foreground max-w-2xl">Que vous cherchiez un bien immobilier ou du mobilier pour l'aménager, nous avons ce qu'il vous faut.</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories?.map((cat, i) => (
              <Link key={cat.id} href={`/listings?categoryId=${cat.id}`}>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card rounded-2xl p-6 text-center border border-border hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-16 h-16 mx-auto bg-secondary/5 group-hover:bg-primary/10 rounded-full flex items-center justify-center mb-4 transition-colors">
                    {cat.icon === 'home' ? <HomeIcon className="w-8 h-8 text-secondary group-hover:text-primary transition-colors" /> : 
                     cat.icon === 'sofa' ? <Sofa className="w-8 h-8 text-secondary group-hover:text-primary transition-colors" /> :
                     <Building className="w-8 h-8 text-secondary group-hover:text-primary transition-colors" />}
                  </div>
                  <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{cat.name}</h3>
                  <p className="text-xs text-muted-foreground font-serif">{cat.nameAr}</p>
                  <div className="mt-3 text-xs font-semibold px-2 py-1 bg-secondary/5 rounded-full inline-block text-secondary">
                    {formatNumber(cat.listingCount)} annonces
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-4">Annonces à la Une</h2>
              <p className="text-muted-foreground max-w-2xl">Découvrez les meilleures opportunités sélectionnées pour vous cette semaine.</p>
            </div>
            <Link href="/listings" className="hidden md:flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all">
              Voir tout <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {isLoadingFeatured ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1,2,3].map(i => (
                <div key={i} className="h-96 bg-muted animate-pulse rounded-2xl"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredListings?.listings.map((listing, i) => (
                <ListingCard key={listing.id} listing={listing} index={i} />
              ))}
            </div>
          )}
          
          <div className="mt-10 text-center md:hidden">
            <Link href="/listings" className="inline-flex items-center gap-2 text-primary font-bold bg-primary/10 px-6 py-3 rounded-xl">
              Voir toutes les annonces <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Value Prop Section */}
      <section className="py-24 bg-secondary text-white overflow-hidden relative">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/20 blur-3xl rounded-full"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Pourquoi choisir Darkom ?</h2>
            <p className="text-white/70 text-lg">La plateforme la plus complète et sécurisée pour vos transactions immobilières et mobilières en Algérie.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Vendeurs Vérifiés</h3>
              <p className="text-white/60">Nous vérifions l'identité des agences et professionnels pour vous garantir des transactions sûres.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                <MapPin className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">48 Wilayas Couvertes</h3>
              <p className="text-white/60">De la capitale au grand sud, trouvez des offres pertinentes partout en Algérie.</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6">
                <Clock className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Support Réactif</h3>
              <p className="text-white/60">Notre équipe est disponible 7j/7 pour vous accompagner dans vos démarches.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
