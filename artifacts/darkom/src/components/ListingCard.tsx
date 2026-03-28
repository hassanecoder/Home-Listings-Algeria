import { Link } from "wouter";
import { MapPin, BedDouble, Bath, Square, Star, ShieldCheck } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import type { Listing } from "@workspace/api-client-react";
import { motion } from "framer-motion";

interface ListingCardProps {
  listing: Listing;
  index?: number;
}

export function ListingCard({ listing, index = 0 }: ListingCardProps) {
  // Use first image or fallback
  {/* fallback real estate interior */}
  const defaultImage = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80";
  const imageUrl = listing.images && listing.images.length > 0 ? listing.images[0] : defaultImage;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 flex flex-col h-full"
    >
      <Link href={`/listings/${listing.id}`} className="block relative aspect-[4/3] overflow-hidden">
        <img 
          src={imageUrl} 
          alt={listing.title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <span className="px-3 py-1 bg-secondary text-white text-xs font-bold rounded-lg shadow-lg">
            {listing.type === 'sell' ? 'À Vendre' : 'À Louer'}
          </span>
          {listing.featured && (
            <span className="px-3 py-1 bg-primary text-white text-xs font-bold rounded-lg shadow-lg flex items-center gap-1">
              <Star className="w-3 h-3 fill-current" /> En Vedette
            </span>
          )}
        </div>
        
        <div className="absolute bottom-3 right-3 px-3 py-1.5 bg-background/90 backdrop-blur-sm text-foreground text-sm font-semibold rounded-lg shadow-lg">
          {formatPrice(listing.price)}
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <div className="text-sm text-primary font-medium mb-2">{listing.categoryName}</div>
        
        <Link href={`/listings/${listing.id}`}>
          <h3 className="font-display font-bold text-lg text-foreground leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
            {listing.title}
          </h3>
        </Link>
        
        <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-4">
          <MapPin className="w-4 h-4 shrink-0" />
          <span className="truncate">{listing.city}, {listing.wilayaName}</span>
        </div>

        {/* Features Row */}
        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between text-sm text-muted-foreground">
          {(listing.bedrooms !== undefined || listing.area !== undefined) ? (
            <div className="flex items-center gap-4">
              {listing.bedrooms !== undefined && (
                <div className="flex items-center gap-1.5">
                  <BedDouble className="w-4 h-4 text-primary/70" />
                  <span>{listing.bedrooms}</span>
                </div>
              )}
              {listing.bathrooms !== undefined && (
                <div className="flex items-center gap-1.5">
                  <Bath className="w-4 h-4 text-primary/70" />
                  <span>{listing.bathrooms}</span>
                </div>
              )}
              {listing.area !== undefined && (
                <div className="flex items-center gap-1.5">
                  <Square className="w-4 h-4 text-primary/70" />
                  <span>{listing.area} m²</span>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-xs">
              <span className="px-2 py-1 bg-secondary/5 rounded-md">
                État: {listing.condition === 'new' ? 'Neuf' : listing.condition === 'good' ? 'Bon état' : 'Occasion'}
              </span>
            </div>
          )}
          
          {listing.verified && (
            <Tooltip text="Vendeur Vérifié">
              <ShieldCheck className="w-5 h-5 text-green-500" />
            </Tooltip>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Simple internal tooltip for the card
function Tooltip({ children, text }: { children: React.ReactNode, text: string }) {
  return (
    <div className="group/tooltip relative flex items-center justify-center">
      {children}
      <div className="absolute bottom-full mb-2 hidden group-hover/tooltip:block w-max px-2 py-1 bg-secondary text-white text-xs rounded shadow-lg pointer-events-none">
        {text}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-secondary"></div>
      </div>
    </div>
  );
}
