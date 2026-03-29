import { db } from "@workspace/db";
import {
  wilayasTable,
  categoriesTable,
  listingsTable,
  messagesTable,
} from "@workspace/db";

const wilayas = [
  { id: "w01", code: 1, name: "Adrar", nameAr: "أدرار", region: "south" as const },
  { id: "w02", code: 2, name: "Chlef", nameAr: "الشلف", region: "north" as const },
  { id: "w03", code: 3, name: "Laghouat", nameAr: "الأغواط", region: "south" as const },
  { id: "w04", code: 4, name: "Oum El Bouaghi", nameAr: "أم البواقي", region: "east" as const },
  { id: "w05", code: 5, name: "Batna", nameAr: "باتنة", region: "east" as const },
  { id: "w06", code: 6, name: "Béjaïa", nameAr: "بجاية", region: "north" as const },
  { id: "w07", code: 7, name: "Biskra", nameAr: "بسكرة", region: "east" as const },
  { id: "w08", code: 8, name: "Béchar", nameAr: "بشار", region: "west" as const },
  { id: "w09", code: 9, name: "Blida", nameAr: "البليدة", region: "north" as const },
  { id: "w10", code: 10, name: "Bouira", nameAr: "البويرة", region: "center" as const },
  { id: "w11", code: 11, name: "Tamanrasset", nameAr: "تمنراست", region: "south" as const },
  { id: "w12", code: 12, name: "Tébessa", nameAr: "تبسة", region: "east" as const },
  { id: "w13", code: 13, name: "Tlemcen", nameAr: "تلمسان", region: "west" as const },
  { id: "w14", code: 14, name: "Tiaret", nameAr: "تيارت", region: "west" as const },
  { id: "w15", code: 15, name: "Tizi Ouzou", nameAr: "تيزي وزو", region: "north" as const },
  { id: "w16", code: 16, name: "Alger", nameAr: "الجزائر", region: "north" as const },
  { id: "w17", code: 17, name: "Djelfa", nameAr: "الجلفة", region: "south" as const },
  { id: "w18", code: 18, name: "Jijel", nameAr: "جيجل", region: "north" as const },
  { id: "w19", code: 19, name: "Sétif", nameAr: "سطيف", region: "east" as const },
  { id: "w20", code: 20, name: "Saïda", nameAr: "سعيدة", region: "west" as const },
  { id: "w21", code: 21, name: "Skikda", nameAr: "سكيكدة", region: "east" as const },
  { id: "w22", code: 22, name: "Sidi Bel Abbès", nameAr: "سيدي بلعباس", region: "west" as const },
  { id: "w23", code: 23, name: "Annaba", nameAr: "عنابة", region: "east" as const },
  { id: "w24", code: 24, name: "Guelma", nameAr: "قالمة", region: "east" as const },
  { id: "w25", code: 25, name: "Constantine", nameAr: "قسنطينة", region: "east" as const },
  { id: "w26", code: 26, name: "Médéa", nameAr: "المدية", region: "center" as const },
  { id: "w27", code: 27, name: "Mostaganem", nameAr: "مستغانم", region: "west" as const },
  { id: "w28", code: 28, name: "M'Sila", nameAr: "المسيلة", region: "center" as const },
  { id: "w29", code: 29, name: "Mascara", nameAr: "معسكر", region: "west" as const },
  { id: "w30", code: 30, name: "Ouargla", nameAr: "ورقلة", region: "south" as const },
  { id: "w31", code: 31, name: "Oran", nameAr: "وهران", region: "west" as const },
  { id: "w32", code: 32, name: "El Bayadh", nameAr: "البيض", region: "west" as const },
  { id: "w33", code: 33, name: "Illizi", nameAr: "إليزي", region: "south" as const },
  { id: "w34", code: 34, name: "Bordj Bou Arréridj", nameAr: "برج بوعريريج", region: "east" as const },
  { id: "w35", code: 35, name: "Boumerdès", nameAr: "بومرداس", region: "north" as const },
  { id: "w36", code: 36, name: "El Tarf", nameAr: "الطارف", region: "east" as const },
  { id: "w37", code: 37, name: "Tindouf", nameAr: "تندوف", region: "south" as const },
  { id: "w38", code: 38, name: "Tissemsilt", nameAr: "تيسمسيلت", region: "west" as const },
  { id: "w39", code: 39, name: "El Oued", nameAr: "الوادي", region: "south" as const },
  { id: "w40", code: 40, name: "Khenchela", nameAr: "خنشلة", region: "east" as const },
  { id: "w41", code: 41, name: "Souk Ahras", nameAr: "سوق أهراس", region: "east" as const },
  { id: "w42", code: 42, name: "Tipaza", nameAr: "تيبازة", region: "north" as const },
  { id: "w43", code: 43, name: "Mila", nameAr: "ميلة", region: "east" as const },
  { id: "w44", code: 44, name: "Aïn Defla", nameAr: "عين الدفلى", region: "north" as const },
  { id: "w45", code: 45, name: "Naâma", nameAr: "النعامة", region: "west" as const },
  { id: "w46", code: 46, name: "Aïn Témouchent", nameAr: "عين تموشنت", region: "west" as const },
  { id: "w47", code: 47, name: "Ghardaïa", nameAr: "غرداية", region: "south" as const },
  { id: "w48", code: 48, name: "Relizane", nameAr: "غليزان", region: "west" as const },
];

const categories = [
  { id: "cat_apt", name: "Appartements", nameAr: "شقق", icon: "Building2", description: "Appartements à vendre et à louer" },
  { id: "cat_villa", name: "Villas", nameAr: "فيلات", icon: "Home", description: "Villas et maisons individuelles" },
  { id: "cat_house", name: "Maisons", nameAr: "منازل", icon: "House", description: "Maisons traditionnelles" },
  { id: "cat_land", name: "Terrains", nameAr: "أراضي", icon: "MapPin", description: "Terrains constructibles et agricoles" },
  { id: "cat_commercial", name: "Locaux Commerciaux", nameAr: "محلات تجارية", icon: "Store", description: "Bureaux, magasins et entrepôts" },
  { id: "cat_salon", name: "Salons & Canapés", nameAr: "صالونات", icon: "Sofa", description: "Meubles de salon et canapés" },
  { id: "cat_bedroom", name: "Chambres à Coucher", nameAr: "غرف نوم", icon: "Bed", description: "Lits, armoires et meubles de chambre" },
  { id: "cat_kitchen", name: "Cuisine & Électroménager", nameAr: "مطبخ", icon: "UtensilsCrossed", description: "Meubles de cuisine et électroménager" },
  { id: "cat_office", name: "Bureaux & Travail", nameAr: "مكاتب", icon: "Briefcase", description: "Meubles de bureau et équipements" },
  { id: "cat_outdoor", name: "Jardin & Extérieur", nameAr: "حديقة", icon: "Trees", description: "Meubles de jardin et décoration extérieure" },
];

const algImages = {
  apt: [
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80",
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
    "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80",
  ],
  villa: [
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80",
  ],
  house: [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
    "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80",
  ],
  land: [
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80",
    "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?w=800&q=80",
  ],
  commercial: [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    "https://images.unsplash.com/photo-1577412647305-991150c7d163?w=800&q=80",
  ],
  furniture: [
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=80",
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&q=80",
    "https://images.unsplash.com/photo-1616627451515-cbc80e5ece35?w=800&q=80",
    "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&q=80",
    "https://images.unsplash.com/photo-1565183928294-7063f23ce0f8?w=800&q=80",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80",
  ],
};

const sellers = [
  { name: "Mohammed Benali", phone: "0555 123 456", type: "individual" as const, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammed" },
  { name: "Fatima Boudiaf", phone: "0661 234 567", type: "individual" as const, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima" },
  { name: "Karim Hadj", phone: "0770 345 678", type: "individual" as const, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Karim" },
  { name: "Immo Alger Agency", phone: "0560 456 789", type: "agency" as const, avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=ImmoAlger" },
  { name: "Dar Immo Agency", phone: "0661 567 890", type: "agency" as const, avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=DarImmo" },
  { name: "Youcef Meziane", phone: "0555 678 901", type: "individual" as const, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Youcef" },
  { name: "Nadia Khelifi", phone: "0770 789 012", type: "individual" as const, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nadia" },
  { name: "Ahmed Cherif", phone: "0550 890 123", type: "individual" as const, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed" },
  { name: "Oran Prestige Immobilier", phone: "0561 901 234", type: "agency" as const, avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=OranPrestige" },
  { name: "Hamid Belkacem", phone: "0662 012 345", type: "individual" as const, avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hamid" },
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function rand(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const listings = [
  // ALGER - Apartments
  {
    id: "lst_001", title: "Appartement F4 Vue Mer - Bab El Oued", description: "Magnifique appartement de 4 pièces situé au 5ème étage avec une vue imprenable sur la mer Méditerranée. Cuisine équipée, 2 salles de bain, double vitrage, ascenseur. Quartier calme et bien desservi par les transports en commun. Proche de toutes les commodités.",
    price: "12500000", type: "sell" as const, categoryId: "cat_apt", wilayaId: "w16", city: "Alger", address: "Rue Belouizdad, Bab El Oued",
    images: [algImages.apt[0], algImages.apt[1], algImages.apt[2]], bedrooms: 3, bathrooms: 2, area: "135", floor: 5, totalFloors: 8, furnished: true, condition: "good" as const,
    sellerName: sellers[3].name, sellerPhone: sellers[3].phone, sellerAvatar: sellers[3].avatar, sellerType: sellers[3].type, agencyName: "Immo Alger Agency",
    featured: true, verified: true, views: 847, amenities: ["Ascenseur", "Parking", "Gardien", "Vue mer", "Double vitrage"],
    tags: ["vue mer", "meublé", "F4"],
  },
  {
    id: "lst_002", title: "Studio Meublé à Louer - Hydra", description: "Beau studio entièrement meublé dans le quartier résidentiel de Hydra. Idéal pour cadre ou étudiant. Cuisine équipée, connexion internet, climatisation. Charges comprises. Disponible immédiatement.",
    price: "45000", type: "rent" as const, categoryId: "cat_apt", wilayaId: "w16", city: "Alger", address: "Cité Malki, Hydra",
    images: [algImages.apt[3], algImages.apt[4]], bedrooms: 0, bathrooms: 1, area: "45", floor: 2, totalFloors: 6, furnished: true, condition: "good" as const,
    sellerName: sellers[0].name, sellerPhone: sellers[0].phone, sellerAvatar: sellers[0].avatar, sellerType: sellers[0].type, agencyName: undefined,
    featured: true, verified: true, views: 523, amenities: ["Meublé", "Climatisation", "Internet", "Sécurisé"],
    tags: ["studio", "meublé", "hydra"],
  },
  {
    id: "lst_003", title: "Appartement F3 à Vendre - Kouba", description: "Appartement F3 de 95m² au 3ème étage dans résidence sécurisée à Kouba. Séjour spacieux, cuisine semi-équipée, deux chambres. Bon état général. Proche du marché et des écoles.",
    price: "8500000", type: "sell" as const, categoryId: "cat_apt", wilayaId: "w16", city: "Alger", address: "Avenue Khelifi Omar, Kouba",
    images: [algImages.apt[1], algImages.apt[3]], bedrooms: 2, bathrooms: 1, area: "95", floor: 3, totalFloors: 5, furnished: false, condition: "good" as const,
    sellerName: sellers[1].name, sellerPhone: sellers[1].phone, sellerAvatar: sellers[1].avatar, sellerType: sellers[1].type, agencyName: undefined,
    featured: false, verified: true, views: 312, amenities: ["Gardien", "Cave", "Deux entrées"],
    tags: ["F3", "kouba", "résidence"],
  },
  {
    id: "lst_004", title: "F5 Duplex Luxe à Cheraga", description: "Exceptionnel duplex de 220m² dans résidence de standing à Chéraga. 4 chambres, 3 salles de bains, terrasse de 40m², cuisine américaine haut de gamme, salon double. Parking 2 voitures. Prestations de luxe.",
    price: "28000000", type: "sell" as const, categoryId: "cat_apt", wilayaId: "w16", city: "Alger", address: "Cité Soleil, Chéraga",
    images: [algImages.apt[0], algImages.apt[2], algImages.apt[4]], bedrooms: 4, bathrooms: 3, area: "220", floor: 1, totalFloors: 2, furnished: true, condition: "new" as const,
    sellerName: sellers[4].name, sellerPhone: sellers[4].phone, sellerAvatar: sellers[4].avatar, sellerType: sellers[4].type, agencyName: "Dar Immo Agency",
    featured: true, verified: true, views: 1204, amenities: ["Terrasse", "Parking 2 voitures", "Piscine", "Salle de sport", "Gardien 24h", "Digicode"],
    tags: ["duplex", "luxe", "cheraga"],
  },
  {
    id: "lst_005", title: "F2 à Louer - El Harrach", description: "Appartement F2 de 65m² bien entretenu à El Harrach. Salon lumineux, chambre spacieuse, cuisine équipée, balcon. Proche de la gare et du marché. Disponible le 1er du mois prochain.",
    price: "28000", type: "rent" as const, categoryId: "cat_apt", wilayaId: "w16", city: "Alger", address: "Rue Mohamed Boudiaf, El Harrach",
    images: [algImages.apt[2], algImages.apt[1]], bedrooms: 1, bathrooms: 1, area: "65", floor: 2, totalFloors: 4, furnished: false, condition: "good" as const,
    sellerName: sellers[6].name, sellerPhone: sellers[6].phone, sellerAvatar: sellers[6].avatar, sellerType: sellers[6].type, agencyName: undefined,
    featured: false, verified: false, views: 198, amenities: ["Balcon", "Proche transports"],
    tags: ["F2", "el harrach", "location"],
  },

  // ORAN - Villas & Apartments
  {
    id: "lst_006", title: "Villa S+4 avec Piscine - Bir El Djir", description: "Somptueuse villa de 350m² sur terrain de 600m² dans le quartier résidentiel de Bir El Djir, Oran. 4 chambres, 4 salles de bain, salon marocain, piscine chauffée, jardin paysager, cuisine professionnelle. Système domotique.",
    price: "65000000", type: "sell" as const, categoryId: "cat_villa", wilayaId: "w31", city: "Oran", address: "Lotissement Palmiers, Bir El Djir",
    images: [algImages.villa[0], algImages.villa[1], algImages.villa[2]], bedrooms: 4, bathrooms: 4, area: "350", floor: 0, totalFloors: 2, furnished: true, condition: "new" as const,
    sellerName: sellers[8].name, sellerPhone: sellers[8].phone, sellerAvatar: sellers[8].avatar, sellerType: sellers[8].type, agencyName: "Oran Prestige Immobilier",
    featured: true, verified: true, views: 2341, amenities: ["Piscine", "Jardin", "Garage", "Domotique", "Cuisine professionnelle", "Salon marocain", "Pergola"],
    tags: ["villa", "piscine", "bir el djir", "luxe"],
  },
  {
    id: "lst_007", title: "Appartement F3 Centre-Ville Oran", description: "Bel appartement au cœur d'Oran, à 5 minutes à pied de la place du 1er novembre. 3 pièces de 110m², rénové, parquet, cuisine équipée, vue sur la ville. Idéal investissement locatif.",
    price: "7800000", type: "sell" as const, categoryId: "cat_apt", wilayaId: "w31", city: "Oran", address: "Rue Larbi Ben M'Hidi, Centre-ville",
    images: [algImages.apt[0], algImages.apt[4]], bedrooms: 2, bathrooms: 1, area: "110", floor: 4, totalFloors: 7, furnished: false, condition: "good" as const,
    sellerName: sellers[5].name, sellerPhone: sellers[5].phone, sellerAvatar: sellers[5].avatar, sellerType: sellers[5].type, agencyName: undefined,
    featured: false, verified: true, views: 445, amenities: ["Ascenseur", "Vue ville", "Rénové"],
    tags: ["centre-ville", "oran", "F3"],
  },
  {
    id: "lst_008", title: "Maison de Maître - Tlemcen", description: "Ancienne demeure mauresque de 280m² restaurée avec goût au cœur de la médina de Tlemcen. Patio central, fontaine, zellige, boiseries sculptées. 5 pièces, caractère exceptionnel. Idéal maison d'hôtes ou résidence principale.",
    price: "18500000", type: "sell" as const, categoryId: "cat_house", wilayaId: "w13", city: "Tlemcen", address: "Médina, Tlemcen",
    images: [algImages.house[0], algImages.house[1]], bedrooms: 4, bathrooms: 2, area: "280", floor: 0, totalFloors: 2, furnished: false, condition: "good" as const,
    sellerName: sellers[2].name, sellerPhone: sellers[2].phone, sellerAvatar: sellers[2].avatar, sellerType: sellers[2].type, agencyName: undefined,
    featured: true, verified: true, views: 892, amenities: ["Patio", "Fontaine", "Zellige", "Toit-terrasse", "Jardin intérieur"],
    tags: ["maison de maître", "tlemcen", "medina", "riad"],
  },

  // CONSTANTINE
  {
    id: "lst_009", title: "Appartement F4 Résidence Luxe - Constantine", description: "Appartement haut standing de 150m² dans résidence fermée à Constantine El Khroub. Vue panoramique sur les gorges du Rummel. 3 chambres, 2 salles de bain, terrasse, parking souterrain. Ascenseur, gardien 24h.",
    price: "11500000", type: "sell" as const, categoryId: "cat_apt", wilayaId: "w25", city: "Constantine", address: "El Khroub, Constantine",
    images: [algImages.apt[2], algImages.apt[0]], bedrooms: 3, bathrooms: 2, area: "150", floor: 6, totalFloors: 10, furnished: false, condition: "new" as const,
    sellerName: sellers[7].name, sellerPhone: sellers[7].phone, sellerAvatar: sellers[7].avatar, sellerType: sellers[7].type, agencyName: undefined,
    featured: true, verified: true, views: 634, amenities: ["Vue panoramique", "Parking souterrain", "Ascenseur", "Terrasse", "Gardien 24h"],
    tags: ["constantine", "vue gorges", "luxe"],
  },

  // ANNABA
  {
    id: "lst_010", title: "Villa Bord de Mer - Annaba", description: "Rare villa de 200m² à 50 mètres de la plage d'Annaba. 3 chambres, 2 salles de bain, terrasse avec vue mer, jardin 300m², garage. Parfait pour résidence principale ou saisonnière.",
    price: "35000000", type: "sell" as const, categoryId: "cat_villa", wilayaId: "w23", city: "Annaba", address: "Plage Chapuis, Annaba",
    images: [algImages.villa[3], algImages.villa[0]], bedrooms: 3, bathrooms: 2, area: "200", floor: 0, totalFloors: 2, furnished: true, condition: "good" as const,
    sellerName: sellers[9].name, sellerPhone: sellers[9].phone, sellerAvatar: sellers[9].avatar, sellerType: sellers[9].type, agencyName: undefined,
    featured: true, verified: true, views: 1567, amenities: ["Vue mer", "Plage proche", "Garage", "Jardin", "Terrasse"],
    tags: ["bord de mer", "annaba", "villa"],
  },

  // SETIF
  {
    id: "lst_011", title: "Local Commercial 200m² - Centre Sétif", description: "Local commercial de 200m² en rez-de-chaussée d'immeuble moderne au centre de Sétif. Vitrine de 15ml, hauteur 4.50m, climatisation centralisée. Idéal boutique, showroom ou bureau. Libre de suite.",
    price: "6500000", type: "sell" as const, categoryId: "cat_commercial", wilayaId: "w19", city: "Sétif", address: "Boulevard Colonel Amirouche, Sétif",
    images: [algImages.commercial[0], algImages.commercial[1]], bedrooms: 0, bathrooms: 1, area: "200", floor: 0, totalFloors: 1, furnished: false, condition: "new" as const,
    sellerName: sellers[3].name, sellerPhone: sellers[3].phone, sellerAvatar: sellers[3].avatar, sellerType: sellers[3].type, agencyName: "Immo Alger Agency",
    featured: false, verified: true, views: 287, amenities: ["Grande vitrine", "Climatisation", "Parking client", "Alarme"],
    tags: ["local commercial", "setif", "investissement"],
  },

  // TERRAIN
  {
    id: "lst_012", title: "Terrain Constructible 800m² - Tipaza", description: "Terrain de 800m² viabilisé avec titre foncier en règle à Tipaza, à 2km de la mer. Vue dégagée, terrain plat, idéal pour construction villa. Eau, électricité et gaz disponibles.",
    price: "9200000", type: "sell" as const, categoryId: "cat_land", wilayaId: "w42", city: "Tipaza", address: "Zone d'expansion touristique, Tipaza",
    images: [algImages.land[0], algImages.land[1]], bedrooms: 0, bathrooms: 0, area: "800", floor: 0, totalFloors: 0, furnished: false, condition: "new" as const,
    sellerName: sellers[0].name, sellerPhone: sellers[0].phone, sellerAvatar: sellers[0].avatar, sellerType: sellers[0].type, agencyName: undefined,
    featured: false, verified: true, views: 412, amenities: ["Titre foncier", "Viabilisé", "Vue mer", "Terrain plat"],
    tags: ["terrain", "tipaza", "constructible"],
  },

  // FURNITURE
  {
    id: "lst_013", title: "Salon Marocain Complet - Neuf", description: "Magnifique salon marocain traditionnel complet comprenant 12 canapés, 2 tables basses en marqueterie, 4 coussins d'angle. Tissu velours bordeaux avec broderies dorées. Fabrication artisanale tlemcenienne. Non utilisé, acheté pour appartement finalement non habité.",
    price: "280000", type: "sell" as const, categoryId: "cat_salon", wilayaId: "w16", city: "Alger", address: "Bab El Oued, Alger",
    images: [algImages.furniture[0], algImages.furniture[1]], bedrooms: 0, bathrooms: 0, area: undefined, floor: 0, totalFloors: 0, furnished: false, condition: "new" as const,
    sellerName: sellers[1].name, sellerPhone: sellers[1].phone, sellerAvatar: sellers[1].avatar, sellerType: sellers[1].type, agencyName: undefined,
    featured: true, verified: false, views: 734, amenities: [],
    tags: ["salon marocain", "neuf", "artisanat"],
  },
  {
    id: "lst_014", title: "Chambre à Coucher Turque Complète", description: "Chambre à coucher turque de qualité supérieure avec lit 2 places 180x200, armoire 6 portes avec miroir, 2 tables de nuit, coiffeuse avec miroir. Bois massif teinte noyer. Très bon état, quelques années d'usage.",
    price: "180000", type: "sell" as const, categoryId: "cat_bedroom", wilayaId: "w31", city: "Oran", address: "Haï Yasmine, Oran",
    images: [algImages.furniture[2], algImages.furniture[3]], bedrooms: 0, bathrooms: 0, area: undefined, floor: 0, totalFloors: 0, furnished: false, condition: "good" as const,
    sellerName: sellers[5].name, sellerPhone: sellers[5].phone, sellerAvatar: sellers[5].avatar, sellerType: sellers[5].type, agencyName: undefined,
    featured: false, verified: false, views: 289, amenities: [],
    tags: ["chambre", "turc", "bois massif"],
  },
  {
    id: "lst_015", title: "Cuisine Équipée Moderne - Occasion", description: "Cuisine équipée 3.5m linéaires avec plan de travail granit, hotte aspirante intégrée, four encastré, lave-vaisselle, réfrigérateur américain. Démontée proprement suite à déménagement. Marque turque haut de gamme.",
    price: "350000", type: "sell" as const, categoryId: "cat_kitchen", wilayaId: "w25", city: "Constantine", address: "Ali Mendjeli, Constantine",
    images: [algImages.furniture[4], algImages.furniture[5]], bedrooms: 0, bathrooms: 0, area: undefined, floor: 0, totalFloors: 0, furnished: false, condition: "good" as const,
    sellerName: sellers[7].name, sellerPhone: sellers[7].phone, sellerAvatar: sellers[7].avatar, sellerType: sellers[7].type, agencyName: undefined,
    featured: false, verified: false, views: 156, amenities: [],
    tags: ["cuisine", "électroménager", "occasion"],
  },
  {
    id: "lst_016", title: "Bureau Exécutif Professionnel", description: "Bureau exécutif en L avec retour, fauteuil de direction en cuir véritable, bibliothèque 5 étagères assortie. Bois laqué blanc. Parfait état. Idéal pour cabinet médical ou bureau professionnel.",
    price: "95000", type: "sell" as const, categoryId: "cat_office", wilayaId: "w19", city: "Sétif", address: "Centre-ville, Sétif",
    images: [algImages.furniture[6], algImages.furniture[7]], bedrooms: 0, bathrooms: 0, area: undefined, floor: 0, totalFloors: 0, furnished: false, condition: "good" as const,
    sellerName: sellers[2].name, sellerPhone: sellers[2].phone, sellerAvatar: sellers[2].avatar, sellerType: sellers[2].type, agencyName: undefined,
    featured: false, verified: false, views: 87, amenities: [],
    tags: ["bureau", "professionnel", "cuir"],
  },

  // More apartments in various wilayas
  {
    id: "lst_017", title: "Appartement F3 - Béjaïa Front de Mer", description: "F3 de 90m² avec vue sur la mer à Béjaïa. Séjour, 2 chambres, cuisine, salle de bain. Balcon face à la mer. Immeuble récent, ascenseur. À 100m de la plage d'Aokas.",
    price: "9800000", type: "sell" as const, categoryId: "cat_apt", wilayaId: "w06", city: "Béjaïa", address: "Boulevard des Aures, Béjaïa",
    images: [algImages.apt[3], algImages.apt[0]], bedrooms: 2, bathrooms: 1, area: "90", floor: 3, totalFloors: 7, furnished: false, condition: "good" as const,
    sellerName: sellers[6].name, sellerPhone: sellers[6].phone, sellerAvatar: sellers[6].avatar, sellerType: sellers[6].type, agencyName: undefined,
    featured: false, verified: true, views: 567, amenities: ["Vue mer", "Ascenseur", "Balcon", "Proche plage"],
    tags: ["béjaïa", "vue mer", "F3"],
  },
  {
    id: "lst_018", title: "Villa Moderne - Blida Mitidja", description: "Villa neuve de 250m² dans la plaine de la Mitidja. 4 chambres, 3 salles de bain, salon double, cuisine américaine, grande terrasse, jardin 500m². Double garage. Finitions haut de gamme.",
    price: "42000000", type: "sell" as const, categoryId: "cat_villa", wilayaId: "w09", city: "Blida", address: "Chiffa, Blida",
    images: [algImages.villa[1], algImages.villa[3]], bedrooms: 4, bathrooms: 3, area: "250", floor: 0, totalFloors: 2, furnished: false, condition: "new" as const,
    sellerName: sellers[4].name, sellerPhone: sellers[4].phone, sellerAvatar: sellers[4].avatar, sellerType: sellers[4].type, agencyName: "Dar Immo Agency",
    featured: true, verified: true, views: 908, amenities: ["Jardin", "Terrasse", "Double garage", "Sécurisé", "Cuisine américaine"],
    tags: ["villa", "blida", "neuve", "mitidja"],
  },
  {
    id: "lst_019", title: "Appartement F2 à Louer - Tizi Ouzou", description: "Joli appartement F2 de 70m² à louer à Tizi Ouzou centre. Meublé, cuisine équipée, salle de bain moderne. Idéal pour étudiant ou jeune couple. Proche université et commerces.",
    price: "22000", type: "rent" as const, categoryId: "cat_apt", wilayaId: "w15", city: "Tizi Ouzou", address: "Cité Nouvelle, Tizi Ouzou",
    images: [algImages.apt[4], algImages.apt[2]], bedrooms: 1, bathrooms: 1, area: "70", floor: 1, totalFloors: 4, furnished: true, condition: "good" as const,
    sellerName: sellers[0].name, sellerPhone: sellers[0].phone, sellerAvatar: sellers[0].avatar, sellerType: sellers[0].type, agencyName: undefined,
    featured: false, verified: false, views: 143, amenities: ["Meublé", "Cuisine équipée", "Proche université"],
    tags: ["tizi ouzou", "location", "meublé"],
  },
  {
    id: "lst_020", title: "Salon Moderne + Canapé Angle", description: "Canapé d'angle XXL + 2 fauteuils assortis en tissu gris anthracite. Structure bois massif, coussins à déhoussable. Très bon état, 2 ans. Vendu pour cause de déménagement. Couleur tendance, s'adapte à tout intérieur.",
    price: "125000", type: "sell" as const, categoryId: "cat_salon", wilayaId: "w31", city: "Oran", address: "Haï Al Maqari, Oran",
    images: [algImages.furniture[1], algImages.furniture[0]], bedrooms: 0, bathrooms: 0, area: undefined, floor: 0, totalFloors: 0, furnished: false, condition: "good" as const,
    sellerName: sellers[9].name, sellerPhone: sellers[9].phone, sellerAvatar: sellers[9].avatar, sellerType: sellers[9].type, agencyName: undefined,
    featured: false, verified: false, views: 234, amenities: [],
    tags: ["canapé", "salon", "angle"],
  },
  {
    id: "lst_021", title: "Terrain Agricole 2 Hectares - Mascara", description: "Terrain agricole de 2 hectares à Mascara avec puits, clôturé, titre foncier en règle. Sol fertile, idéal vigne ou arboriculture fruitière. Accès chemin carrossable. Eau disponible.",
    price: "3500000", type: "sell" as const, categoryId: "cat_land", wilayaId: "w29", city: "Mascara", address: "Route de Sig, Mascara",
    images: [algImages.land[0]], bedrooms: 0, bathrooms: 0, area: "20000", floor: 0, totalFloors: 0, furnished: false, condition: "good" as const,
    sellerName: sellers[2].name, sellerPhone: sellers[2].phone, sellerAvatar: sellers[2].avatar, sellerType: sellers[2].type, agencyName: undefined,
    featured: false, verified: false, views: 89, amenities: ["Puits", "Clôturé", "Titre foncier"],
    tags: ["terrain agricole", "mascara", "vigne"],
  },
  {
    id: "lst_022", title: "Appartement Standing - Boumerdès", description: "Superbe appartement de 130m² dans résidence de standing à Boumerdès, à 200m de la mer. 3 chambres, 2 salles de bain, grand balcon filant, parquet flottant, cuisine en granit. Immeuble sécurisé, gardiennage 24h.",
    price: "13500000", type: "sell" as const, categoryId: "cat_apt", wilayaId: "w35", city: "Boumerdès", address: "Beni Amrane, Boumerdès",
    images: [algImages.apt[0], algImages.apt[3]], bedrooms: 3, bathrooms: 2, area: "130", floor: 4, totalFloors: 6, furnished: false, condition: "new" as const,
    sellerName: sellers[8].name, sellerPhone: sellers[8].phone, sellerAvatar: sellers[8].avatar, sellerType: sellers[8].type, agencyName: "Oran Prestige Immobilier",
    featured: false, verified: true, views: 478, amenities: ["Proche mer", "Gardien 24h", "Balcon", "Parking"],
    tags: ["boumerdès", "mer", "standing"],
  },
  {
    id: "lst_023", title: "Meubles Jardin Résine Tressée - Neuf", description: "Salon de jardin 7 pièces en résine tressée grise avec coussins imperméables beige. Table rectangulaire 8 personnes, 4 fauteuils, canapé 3 places + méridienne. Jamais utilisé, emballage d'origine. Idéal terrasse ou piscine.",
    price: "85000", type: "sell" as const, categoryId: "cat_outdoor", wilayaId: "w09", city: "Blida", address: "Ain Romana, Blida",
    images: [algImages.furniture[3], algImages.furniture[2]], bedrooms: 0, bathrooms: 0, area: undefined, floor: 0, totalFloors: 0, furnished: false, condition: "new" as const,
    sellerName: sellers[6].name, sellerPhone: sellers[6].phone, sellerAvatar: sellers[6].avatar, sellerType: sellers[6].type, agencyName: undefined,
    featured: false, verified: false, views: 112, amenities: [],
    tags: ["jardin", "terrasse", "résine", "neuf"],
  },
  {
    id: "lst_024", title: "F4 à Louer - Birkhadem Alger", description: "Grand appartement F4 de 120m² à Birkhadem. Séjour, salle à manger, 3 chambres, 2 salles de bain, cuisine équipée. Calme, 3ème étage, vue jardin. Disponible immédiatement. Non meublé.",
    price: "55000", type: "rent" as const, categoryId: "cat_apt", wilayaId: "w16", city: "Alger", address: "Cité Diar El Mahçoul, Birkhadem",
    images: [algImages.apt[1], algImages.apt[4]], bedrooms: 3, bathrooms: 2, area: "120", floor: 3, totalFloors: 5, furnished: false, condition: "good" as const,
    sellerName: sellers[7].name, sellerPhone: sellers[7].phone, sellerAvatar: sellers[7].avatar, sellerType: sellers[7].type, agencyName: undefined,
    featured: false, verified: true, views: 321, amenities: ["Vue jardin", "Calme", "Cuisine équipée"],
    tags: ["birkhadem", "F4", "location"],
  },
  {
    id: "lst_025", title: "Local Professionnel 80m² - Batna", description: "Local professionnel de 80m² idéalement situé sur l'artère principale de Batna. Façade vitrée, hauteur sous plafond 3.20m, 2 bureaux, salle de réunion, kitchenette, WC. Parking devant. Idéal cabinet médical, notaire ou agence.",
    price: "38000", type: "rent" as const, categoryId: "cat_commercial", wilayaId: "w05", city: "Batna", address: "Avenue 1er Novembre, Batna",
    images: [algImages.commercial[1], algImages.commercial[0]], bedrooms: 0, bathrooms: 1, area: "80", floor: 0, totalFloors: 1, furnished: false, condition: "good" as const,
    sellerName: sellers[3].name, sellerPhone: sellers[3].phone, sellerAvatar: sellers[3].avatar, sellerType: sellers[3].type, agencyName: "Immo Alger Agency",
    featured: false, verified: true, views: 195, amenities: ["Façade vitrée", "Parking", "Climatisé"],
    tags: ["local", "batna", "professionnel", "location"],
  },
];

async function seed() {
  const seedMode = process.env.SEED_MODE === "bootstrap" ? "bootstrap" : "reset";
  console.log(`Starting seed in ${seedMode} mode...`);

  if (seedMode === "bootstrap") {
    const existing = await db.select().from(listingsTable).limit(1);
    if (existing.length > 0) {
      console.log("Bootstrap seed skipped; listings already present");
      return;
    }
  }

  if (seedMode === "reset") {
    console.log("Clearing existing data...");
    await db.delete(messagesTable);
    await db.delete(listingsTable);
    await db.delete(categoriesTable);
    await db.delete(wilayasTable);
  }

  // Insert wilayas
  console.log("Inserting wilayas...");
  for (const batch of chunk(wilayas, 10)) {
    await db.insert(wilayasTable).values(batch);
  }
  console.log(`Inserted ${wilayas.length} wilayas`);

  // Insert categories
  console.log("Inserting categories...");
  await db.insert(categoriesTable).values(categories);
  console.log(`Inserted ${categories.length} categories`);

  // Insert listings
  console.log("Inserting listings...");
  for (const listing of listings) {
    await db.insert(listingsTable).values({
      ...listing,
      area: listing.area ?? null,
      agencyName: listing.agencyName ?? null,
    });
  }
  console.log(`Inserted ${listings.length} listings`);

  console.log("Seed completed successfully!");
}

function chunk<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
