import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { CheckCircle2, ArrowRight, ArrowLeft, Upload, Building, Sofa, Home as HomeIcon } from "lucide-react";
import { useCreateListing, useGetCategories, useGetWilayas, type CreateListingInput } from "@workspace/api-client-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Combined Zod Schema for the entire multi-step form
const formSchema = z.object({
  title: z.string().min(5, "Le titre doit faire au moins 5 caractères"),
  description: z.string().min(20, "La description doit faire au moins 20 caractères"),
  price: z.coerce.number().min(1, "Prix invalide"),
  type: z.enum(["sell", "rent"], { required_error: "Sélectionnez un type" }),
  categoryId: z.string().min(1, "Catégorie requise"),
  wilayaId: z.string().min(1, "Wilaya requise"),
  city: z.string().min(2, "Ville requise"),
  address: z.string().optional(),
  bedrooms: z.coerce.number().optional(),
  bathrooms: z.coerce.number().optional(),
  area: z.coerce.number().optional(),
  furnished: z.boolean().optional(),
  condition: z.enum(["new", "good", "used", "needs_repair"]).optional(),
  sellerName: z.string().min(2, "Nom requis"),
  sellerPhone: z.string().min(8, "Téléphone requis"),
  sellerType: z.enum(["individual", "agency"]),
  agencyName: z.string().optional(),
  images: z.array(z.string()).default(["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"]) // Mocking upload
});

type FormValues = z.infer<typeof formSchema>;

export default function PostListing() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  
  const { data: categories } = useGetCategories();
  const { data: wilayas } = useGetWilayas();
  const createMutation = useCreateListing();

  const { register, control, handleSubmit, watch, trigger, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "sell",
      sellerType: "individual",
      furnished: false,
    }
  });

  const watchType = watch("type");
  const watchSellerType = watch("sellerType");
  const watchCategory = watch("categoryId");
  
  // Is this property (real estate) or furniture? Based on generic assumption, but let's just show extra fields if needed
  // For simplicity, we'll show beds/baths/area in step 2.

  const handleNext = async () => {
    let fieldsToValidate: any[] = [];
    if (step === 1) fieldsToValidate = ["type", "categoryId", "title", "description"];
    if (step === 2) fieldsToValidate = ["price", "wilayaId", "city", "area", "bedrooms", "condition"];
    
    const isValid = await trigger(fieldsToValidate as any);
    if (isValid) {
      setStep(s => Math.min(s + 1, totalSteps));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      // In real life, images would be uploaded first and URLs collected.
      const res = await createMutation.mutateAsync({ data: data as CreateListingInput });
      setLocation(`/listings/${res.id}`);
    } catch (err) {
      console.error(err);
      alert("Une erreur est survenue lors de la création.");
    }
  };

  const renderStepIndicator = () => (
    <div className="mb-10">
      <div className="flex justify-between relative">
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 bg-muted -z-10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-500 ease-out" 
            style={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>
        {[1, 2, 3, 4].map(num => (
          <div 
            key={num} 
            className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 shadow-sm",
              step >= num ? "bg-primary text-white" : "bg-card text-muted-foreground border-2 border-muted"
            )}
          >
            {step > num ? <CheckCircle2 className="w-5 h-5" /> : num}
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-3 text-xs md:text-sm font-medium text-muted-foreground px-1">
        <span className={step >= 1 ? "text-primary" : ""}>Essentiel</span>
        <span className={step >= 2 ? "text-primary text-center -ml-4" : "text-center -ml-4"}>Détails</span>
        <span className={step >= 3 ? "text-primary text-center ml-2" : "text-center ml-2"}>Photos</span>
        <span className={step >= 4 ? "text-primary text-right" : "text-right"}>Contact</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background pt-24 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-3">Déposer une annonce</h1>
          <p className="text-muted-foreground">Publiez votre annonce rapidement et atteignez des milliers d'acheteurs en Algérie.</p>
        </div>

        {renderStepIndicator()}

        <form onSubmit={handleSubmit(onSubmit)} className="bg-card border border-border rounded-3xl p-6 md:p-10 shadow-xl shadow-black/5">
          <AnimatePresence mode="wait">
            
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <h2 className="text-2xl font-bold border-b border-border pb-4 mb-6">Informations Essentielles</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <label className={cn("cursor-pointer border-2 rounded-xl p-4 text-center transition-all", watchType === 'sell' ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/50 text-muted-foreground")}>
                    <input type="radio" value="sell" {...register("type")} className="sr-only" />
                    <Building className="w-8 h-8 mx-auto mb-2" />
                    <div className="font-bold">À Vendre</div>
                  </label>
                  <label className={cn("cursor-pointer border-2 rounded-xl p-4 text-center transition-all", watchType === 'rent' ? "border-primary bg-primary/5 text-primary" : "border-border hover:border-primary/50 text-muted-foreground")}>
                    <input type="radio" value="rent" {...register("type")} className="sr-only" />
                    <HomeIcon className="w-8 h-8 mx-auto mb-2" />
                    <div className="font-bold">À Louer</div>
                  </label>
                </div>
                {errors.type && <p className="text-destructive text-sm mt-1">{errors.type.message}</p>}

                <div>
                  <label className="block text-sm font-bold mb-2">Catégorie</label>
                  <select {...register("categoryId")} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                    <option value="">Sélectionnez une catégorie</option>
                    {categories?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                  {errors.categoryId && <p className="text-destructive text-sm mt-1">{errors.categoryId.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Titre de l'annonce</label>
                  <input {...register("title")} placeholder="Ex: Bel appartement F3 vue mer" className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  {errors.title && <p className="text-destructive text-sm mt-1">{errors.title.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Description</label>
                  <textarea {...register("description")} rows={5} placeholder="Décrivez votre bien en détail..." className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none custom-scrollbar" />
                  {errors.description && <p className="text-destructive text-sm mt-1">{errors.description.message}</p>}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <h2 className="text-2xl font-bold border-b border-border pb-4 mb-6">Localisation et Détails</h2>
                
                <div>
                  <label className="block text-sm font-bold mb-2">Prix (DZD)</label>
                  <input type="number" {...register("price")} placeholder="Ex: 15000000" className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  {errors.price && <p className="text-destructive text-sm mt-1">{errors.price.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2">Wilaya</label>
                    <select {...register("wilayaId")} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                      <option value="">Sélectionnez</option>
                      {wilayas?.map(w => <option key={w.id} value={w.id}>{w.code} - {w.name}</option>)}
                    </select>
                    {errors.wilayaId && <p className="text-destructive text-sm mt-1">{errors.wilayaId.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Ville / Commune</label>
                    <input {...register("city")} placeholder="Ex: Bab Ezzouar" className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                    {errors.city && <p className="text-destructive text-sm mt-1">{errors.city.message}</p>}
                  </div>
                </div>

                {/* Specific Details based on assumed selection - Showing all for completeness */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4 border-t border-border">
                  <div>
                    <label className="block text-sm font-bold mb-2">Surface (m²)</label>
                    <input type="number" {...register("area")} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Chambres</label>
                    <input type="number" {...register("bedrooms")} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Salles de bain</label>
                    <input type="number" {...register("bathrooms")} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">État du bien</label>
                  <select {...register("condition")} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary">
                    <option value="">Sélectionnez</option>
                    <option value="new">Neuf</option>
                    <option value="good">Bon état</option>
                    <option value="used">État d'usage</option>
                    <option value="needs_repair">À rénover</option>
                  </select>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <h2 className="text-2xl font-bold border-b border-border pb-4 mb-6">Photos</h2>
                
                <div className="border-2 border-dashed border-border hover:border-primary bg-secondary/5 rounded-2xl p-10 text-center cursor-pointer transition-colors group">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                    <Upload className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Cliquez pour uploader vos photos</h3>
                  <p className="text-muted-foreground text-sm max-w-md mx-auto">
                    (Mode simulation : Une image par défaut sera utilisée pour cet exemple)
                  </p>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <h2 className="text-2xl font-bold border-b border-border pb-4 mb-6">Vos Coordonnées</h2>
                
                <div className="flex gap-6 mb-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" value="individual" {...register("sellerType")} className="w-5 h-5 text-primary focus:ring-primary" />
                    <span className="font-bold">Particulier</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="radio" value="agency" {...register("sellerType")} className="w-5 h-5 text-primary focus:ring-primary" />
                    <span className="font-bold">Agence Pro</span>
                  </label>
                </div>

                {watchSellerType === 'agency' && (
                  <div>
                    <label className="block text-sm font-bold mb-2">Nom de l'agence</label>
                    <input {...register("agencyName")} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-bold mb-2">Votre Nom</label>
                  <input {...register("sellerName")} className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  {errors.sellerName && <p className="text-destructive text-sm mt-1">{errors.sellerName.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Téléphone</label>
                  <input {...register("sellerPhone")} dir="ltr" placeholder="0555..." className="w-full bg-background border border-border rounded-xl px-4 py-3 text-right focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
                  {errors.sellerPhone && <p className="text-destructive text-sm mt-1">{errors.sellerPhone.message}</p>}
                </div>
              </motion.div>
            )}

          </AnimatePresence>

          <div className="mt-10 flex items-center justify-between pt-6 border-t border-border">
            {step > 1 ? (
              <button type="button" onClick={() => setStep(s => s - 1)} className="px-6 py-3 font-bold text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors">
                <ArrowLeft className="w-5 h-5" /> Retour
              </button>
            ) : <div></div>}

            {step < totalSteps ? (
              <button type="button" onClick={handleNext} className="bg-secondary text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-secondary/90 transition-all hover:-translate-y-0.5 shadow-lg">
                Suivant <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button type="submit" disabled={createMutation.isPending} className="bg-primary text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-primary/90 transition-all hover:-translate-y-0.5 shadow-lg disabled:opacity-50">
                {createMutation.isPending ? "Publication..." : "Publier l'annonce"} <CheckCircle2 className="w-5 h-5" />
              </button>
            )}
          </div>
        </form>

      </div>
    </div>
  );
}

