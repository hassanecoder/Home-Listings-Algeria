import { useParams } from "wouter";
import { useGetListingById, useContactSeller } from "@workspace/api-client-react";
import { MapPin, BedDouble, Bath, Square, Calendar, User, Phone, CheckCircle2, ChevronLeft, ChevronRight, Map as MapIcon, ShieldCheck } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";
import useEmblaCarousel from 'embla-carousel-react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const contactSchema = z.object({
  name: z.string().min(2, "Le nom est requis"),
  phone: z.string().min(8, "Numéro de téléphone invalide"),
  email: z.string().email("Email invalide").optional().or(z.literal("")),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères")
});

export default function ListingDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: listing, isLoading, error } = useGetListingById(id || "");
  const contactMutation = useContactSeller();
  
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [contactSuccess, setContactSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: { message: "Bonjour, je suis intéressé par votre annonce. Est-elle toujours disponible ?" }
  });

  const onSubmitContact = async (data: z.infer<typeof contactSchema>) => {
    if (!id) return;
    try {
      await contactMutation.mutateAsync({ id, data });
      setContactSuccess(true);
      reset();
      setTimeout(() => setContactSuccess(false), 5000);
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return <div className="min-h-screen pt-24 flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (error || !listing) {
    return <div className="min-h-screen pt-24 flex items-center justify-center text-xl font-bold">Annonce introuvable</div>;
  }

  {/* fallback realistic house */}
  const images = listing.images?.length ? listing.images : ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80"];

  return (
    <div className="min-h-screen bg-background pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Area */}
        <div className="mb-6 flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-lg uppercase tracking-wider">
                {listing.type === 'sell' ? 'Vente' : 'Location'}
              </span>
              <span className="text-primary font-medium">{listing.categoryName}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-2">{listing.title}</h1>
            <div className="flex items-center gap-4 text-muted-foreground text-sm">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {listing.city}, {listing.wilayaName}</span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Publié le {new Date(listing.createdAt).toLocaleDateString('fr-DZ')}</span>
            </div>
          </div>
          <div className="text-3xl md:text-4xl font-display font-bold text-primary">
            {formatPrice(listing.price)}
          </div>
        </div>

        {/* Gallery */}
        <div className="relative mb-12 rounded-3xl overflow-hidden bg-secondary/5 h-[400px] md:h-[600px]">
          <div className="overflow-hidden h-full" ref={emblaRef}>
            <div className="flex h-full">
              {images.map((img, idx) => (
                <div className="flex-[0_0_100%] min-w-0 relative" key={idx}>
                  <img src={img} alt={`Photo ${idx+1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
          {images.length > 1 && (
            <>
              <button onClick={() => emblaApi?.scrollPrev()} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white text-secondary transition-all shadow-lg">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={() => emblaApi?.scrollNext()} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white text-secondary transition-all shadow-lg">
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main Content */}
          <div className="flex-1 space-y-10">
            {/* Quick Features */}
            {(listing.bedrooms !== undefined || listing.area !== undefined || listing.furnished !== undefined) && (
              <div className="bg-card border border-border rounded-2xl p-6 flex flex-wrap gap-8 shadow-sm">
                {listing.bedrooms !== undefined && (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center"><BedDouble className="w-6 h-6 text-primary" /></div>
                    <div>
                      <div className="text-sm text-muted-foreground">Chambres</div>
                      <div className="font-bold text-lg">{listing.bedrooms}</div>
                    </div>
                  </div>
                )}
                {listing.bathrooms !== undefined && (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center"><Bath className="w-6 h-6 text-primary" /></div>
                    <div>
                      <div className="text-sm text-muted-foreground">Salles de bain</div>
                      <div className="font-bold text-lg">{listing.bathrooms}</div>
                    </div>
                  </div>
                )}
                {listing.area !== undefined && (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center"><Square className="w-6 h-6 text-primary" /></div>
                    <div>
                      <div className="text-sm text-muted-foreground">Surface</div>
                      <div className="font-bold text-lg">{listing.area} m²</div>
                    </div>
                  </div>
                )}
                {listing.furnished !== undefined && (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center"><CheckCircle2 className="w-6 h-6 text-primary" /></div>
                    <div>
                      <div className="text-sm text-muted-foreground">Ameublement</div>
                      <div className="font-bold text-lg">{listing.furnished ? "Meublé" : "Non Meublé"}</div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Description */}
            <div>
              <h2 className="text-2xl font-display font-bold mb-4">Description</h2>
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                  {listing.description}
                </p>
              </div>
            </div>

            {/* Amenities if any */}
            {listing.amenities && listing.amenities.length > 0 && (
              <div>
                <h2 className="text-2xl font-display font-bold mb-4">Commodités</h2>
                <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {listing.amenities.map(amenity => (
                      <div key={amenity} className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Map Placeholder */}
            <div>
              <h2 className="text-2xl font-display font-bold mb-4">Localisation</h2>
              <div className="bg-card border border-border rounded-2xl p-2 shadow-sm h-64 relative overflow-hidden flex items-center justify-center bg-secondary/5">
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=80')] opacity-30 object-cover bg-center"></div>
                 <div className="relative z-10 bg-white/90 backdrop-blur px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 font-bold text-secondary">
                   <MapIcon className="w-6 h-6 text-primary" />
                   {listing.city}, {listing.wilayaName}
                 </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-96 shrink-0">
            <div className="sticky top-28 space-y-6">
              
              {/* Seller Card */}
              <div className="bg-card border border-border rounded-2xl p-6 shadow-lg shadow-black/5">
                <h3 className="font-display font-bold text-xl mb-6">Contacter l'annonceur</h3>
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center overflow-hidden shrink-0">
                    {listing.sellerAvatar ? (
                      <img src={listing.sellerAvatar} alt={listing.sellerName} className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-8 h-8 text-secondary/50" />
                    )}
                  </div>
                  <div>
                    <div className="font-bold text-lg">{listing.sellerName}</div>
                    <div className="text-sm text-muted-foreground">{listing.sellerType === 'agency' ? 'Agence Immobilière' : 'Particulier'}</div>
                    {listing.verified && <div className="text-xs text-green-600 font-bold flex items-center gap-1 mt-1"><ShieldCheck className="w-3 h-3" /> Profil Vérifié</div>}
                  </div>
                </div>

                <div className="w-full bg-secondary/5 border border-secondary/10 rounded-xl p-4 flex items-center justify-center gap-3 mb-6">
                  <Phone className="w-5 h-5 text-secondary" />
                  <span className="font-bold text-xl text-secondary tracking-wide" dir="ltr">{listing.sellerPhone}</span>
                </div>

                <form onSubmit={handleSubmit(onSubmitContact)} className="space-y-4">
                  <div>
                    <input 
                      {...register("name")}
                      placeholder="Votre nom" 
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                    {errors.name && <span className="text-xs text-destructive mt-1">{errors.name.message}</span>}
                  </div>
                  <div>
                    <input 
                      {...register("phone")}
                      placeholder="Votre téléphone" 
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    />
                    {errors.phone && <span className="text-xs text-destructive mt-1">{errors.phone.message}</span>}
                  </div>
                  <div>
                    <textarea 
                      {...register("message")}
                      rows={4}
                      placeholder="Votre message..." 
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none custom-scrollbar"
                    />
                    {errors.message && <span className="text-xs text-destructive mt-1">{errors.message.message}</span>}
                  </div>
                  
                  {contactSuccess ? (
                    <div className="bg-green-50 text-green-700 p-4 rounded-xl flex items-center justify-center gap-2 font-bold">
                      <CheckCircle2 className="w-5 h-5" /> Message Envoyé
                    </div>
                  ) : (
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary/90 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Envoi en cours..." : "Envoyer un message"}
                    </button>
                  )}
                </form>
              </div>

              {/* Safety Tips */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-amber-900 text-sm">
                <h4 className="font-bold flex items-center gap-2 mb-2">
                  <ShieldCheck className="w-5 h-5 text-amber-600" /> Conseils de sécurité
                </h4>
                <ul className="space-y-2 list-disc pl-5 opacity-80">
                  <li>Ne payez jamais d'avance sans avoir visité le bien.</li>
                  <li>Rencontrez le vendeur dans un lieu public.</li>
                  <li>Vérifiez toujours les documents officiels.</li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
