import { useState, useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import { Search, Filter, SlidersHorizontal, MapPin, Building, LayoutGrid, List } from "lucide-react";
import { useGetListings, useGetCategories, useGetWilayas, type GetListingsParams } from "@workspace/api-client-react";
import { ListingCard } from "@/components/ListingCard";

export default function Listings() {
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  
  // State from URL or Defaults
  const [params, setParams] = useState<GetListingsParams>({
    categoryId: searchParams.get("categoryId") || undefined,
    wilayaId: searchParams.get("wilayaId") || undefined,
    type: (searchParams.get("type") as any) || undefined,
    search: searchParams.get("search") || undefined,
    minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
    maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
  });

  const [localSearch, setLocalSearch] = useState(params.search || "");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid"|"list">("grid");

  const { data: listingsData, isLoading } = useGetListings(params);
  const { data: categories } = useGetCategories();
  const { data: wilayas } = useGetWilayas();

  const updateParam = (key: keyof GetListingsParams, value: any) => {
    setParams(prev => ({ ...prev, [key]: value || undefined }));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateParam("search", localSearch);
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-secondary mb-2">Toutes les annonces</h1>
            <p className="text-muted-foreground">
              {isLoading ? "Recherche en cours..." : `${listingsData?.total || 0} résultats trouvés`}
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileFiltersOpen(true)}
              className="md:hidden flex-1 flex items-center justify-center gap-2 bg-secondary text-white px-4 py-2.5 rounded-xl font-medium"
            >
              <Filter className="w-4 h-4" /> Filtres
            </button>
            <div className="hidden md:flex bg-card border border-border rounded-xl overflow-hidden p-1">
              <button 
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-secondary/10 text-secondary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-secondary/10 text-secondary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className={`
            fixed inset-0 z-50 bg-background lg:bg-transparent lg:static lg:w-72 shrink-0 transition-transform transform 
            ${isMobileFiltersOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            overflow-y-auto lg:overflow-visible p-4 lg:p-0
          `}>
            <div className="lg:sticky lg:top-28 space-y-6">
              
              <div className="flex items-center justify-between lg:hidden mb-6">
                <h2 className="text-xl font-bold">Filtres</h2>
                <button onClick={() => setIsMobileFiltersOpen(false)} className="p-2 bg-secondary/10 rounded-full">
                  ✕
                </button>
              </div>

              {/* Search */}
              <div className="bg-card p-5 rounded-2xl border border-border shadow-sm">
                <h3 className="font-bold mb-4 flex items-center gap-2"><Search className="w-4 h-4" /> Mots-clés</h3>
                <form onSubmit={handleSearchSubmit}>
                  <input 
                    type="text" 
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    placeholder="Ex: Villa avec piscine..."
                    className="w-full bg-background border border-border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </form>
              </div>

              {/* Location */}
              <div className="bg-card p-5 rounded-2xl border border-border shadow-sm">
                <h3 className="font-bold mb-4 flex items-center gap-2"><MapPin className="w-4 h-4" /> Localisation</h3>
                <select 
                  value={params.wilayaId || ""}
                  onChange={(e) => updateParam("wilayaId", e.target.value)}
                  className="w-full bg-background border border-border rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none"
                >
                  <option value="">Toutes les wilayas</option>
                  {wilayas?.map(w => (
                    <option key={w.id} value={w.id}>{w.code} - {w.name}</option>
                  ))}
                </select>
              </div>

              {/* Type */}
              <div className="bg-card p-5 rounded-2xl border border-border shadow-sm">
                <h3 className="font-bold mb-4 flex items-center gap-2"><Building className="w-4 h-4" /> Type de transaction</h3>
                <div className="flex flex-col gap-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="type" checked={!params.type} onChange={() => updateParam("type", "")} className="w-4 h-4 text-primary focus:ring-primary" />
                    <span>Tout</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="type" checked={params.type === 'sell'} onChange={() => updateParam("type", "sell")} className="w-4 h-4 text-primary focus:ring-primary" />
                    <span>À Vendre</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" name="type" checked={params.type === 'rent'} onChange={() => updateParam("type", "rent")} className="w-4 h-4 text-primary focus:ring-primary" />
                    <span>À Louer</span>
                  </label>
                </div>
              </div>

              {/* Categories */}
              <div className="bg-card p-5 rounded-2xl border border-border shadow-sm">
                <h3 className="font-bold mb-4 flex items-center gap-2"><LayoutGrid className="w-4 h-4" /> Catégorie</h3>
                <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                  <label className="flex items-center gap-3 cursor-pointer py-1">
                    <input type="radio" name="cat" checked={!params.categoryId} onChange={() => updateParam("categoryId", "")} className="w-4 h-4 text-primary focus:ring-primary" />
                    <span>Toutes catégories</span>
                  </label>
                  {categories?.map(cat => (
                    <label key={cat.id} className="flex items-center gap-3 cursor-pointer py-1">
                      <input type="radio" name="cat" checked={params.categoryId === cat.id} onChange={() => updateParam("categoryId", cat.id)} className="w-4 h-4 text-primary focus:ring-primary" />
                      <span>{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="bg-card p-5 rounded-2xl border border-border shadow-sm">
                <h3 className="font-bold mb-4 flex items-center gap-2"><SlidersHorizontal className="w-4 h-4" /> Prix (DZD)</h3>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    placeholder="Min"
                    value={params.minPrice || ""}
                    onChange={(e) => updateParam("minPrice", e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full bg-background border border-border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                  <span>-</span>
                  <input 
                    type="number" 
                    placeholder="Max"
                    value={params.maxPrice || ""}
                    onChange={(e) => updateParam("maxPrice", e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full bg-background border border-border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>

            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {isLoading ? (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="h-80 bg-muted animate-pulse rounded-2xl"></div>
                ))}
              </div>
            ) : listingsData?.listings.length === 0 ? (
              <div className="bg-card border border-border rounded-2xl p-12 text-center flex flex-col items-center">
                <div className="w-20 h-20 bg-secondary/5 rounded-full flex items-center justify-center mb-6">
                  <Search className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Aucune annonce trouvée</h3>
                <p className="text-muted-foreground max-w-md">Nous n'avons trouvé aucune annonce correspondant à vos critères de recherche. Essayez de modifier vos filtres.</p>
                <button 
                  onClick={() => setParams({})}
                  className="mt-6 text-primary font-bold hover:underline"
                >
                  Réinitialiser tous les filtres
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}>
                {listingsData?.listings.map((listing, i) => (
                  viewMode === 'grid' ? (
                    <ListingCard key={listing.id} listing={listing} index={i} />
                  ) : (
                    <div key={listing.id} className="flex flex-col md:flex-row gap-4 bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all p-4">
                      {/* List View Custom Rendering - compact version of card */}
                      <img src={listing.images[0] || "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"} alt={listing.title} className="w-full md:w-64 h-48 md:h-auto object-cover rounded-xl" />
                      <div className="flex-1 flex flex-col py-2">
                        <div className="text-sm text-primary font-medium mb-1">{listing.categoryName}</div>
                        <h3 className="font-display font-bold text-xl mb-2">{listing.title}</h3>
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-4">{listing.description}</p>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="font-bold text-lg text-secondary">{new Intl.NumberFormat('fr-DZ').format(listing.price)} DZD</div>
                          <button onClick={() => window.location.href=`/listings/${listing.id}`} className="px-4 py-2 bg-primary/10 text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-colors">
                            Voir détails
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
