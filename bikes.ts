// Mountain Bike Configurator Data

export interface BikeFrame {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  image: string;
  description: string;
  colors: string[];
  compatibility: {
    forkType: string;
    wheelSize: string;
    brakeType: string;
  };
}

export interface BikePart {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  compatibility: string[];
  marketplaceLinks: {
    name: string;
    url: string;
  }[];
}

export const bikeFrames: BikeFrame[] = [
  {
    id: "enduro-carbon",
    name: "Enduro Carbon Pro",
    category: "Enduro",
    basePrice: 2299,
    image: "/api/placeholder/400/300",
    description: "High-performance carbon enduro frame built for aggressive trail riding",
    colors: ["matte-black", "electric-blue", "forest-green", "burnt-orange"],
    compatibility: {
      forkType: "160mm-travel",
      wheelSize: "29-inch",
      brakeType: "disc"
    }
  },
  {
    id: "xc-aluminum",
    name: "XC Aluminum Elite",
    category: "Cross Country",
    basePrice: 899,
    image: "/api/placeholder/400/300",
    description: "Lightweight aluminum frame perfect for cross-country racing",
    colors: ["silver", "red", "blue", "black"],
    compatibility: {
      forkType: "100mm-travel",
      wheelSize: "29-inch",
      brakeType: "disc"
    }
  },
  {
    id: "trail-carbon",
    name: "Trail Carbon",
    category: "Trail",
    basePrice: 1899,
    image: "/api/placeholder/400/300",
    description: "Versatile carbon trail frame for all-mountain adventures",
    colors: ["stealth-black", "sky-blue", "lime-green"],
    compatibility: {
      forkType: "140mm-travel",
      wheelSize: "29-inch",
      brakeType: "disc"
    }
  },
  {
    id: "downhill-steel",
    name: "Downhill Steel Beast",
    category: "Downhill",
    basePrice: 1599,
    image: "/api/placeholder/400/300",
    description: "Robust steel frame designed for downhill racing and bike parks",
    colors: ["raw-steel", "powder-blue", "neon-yellow"],
    compatibility: {
      forkType: "200mm-travel",
      wheelSize: "27.5-inch",
      brakeType: "disc"
    }
  },
  {
    id: "gravel-titanium",
    name: "Gravel Titanium",
    category: "Gravel",
    basePrice: 3299,
    image: "/api/placeholder/400/300",
    description: "Premium titanium frame for gravel grinding and adventure riding",
    colors: ["titanium", "midnight-blue", "copper"],
    compatibility: {
      forkType: "rigid",
      wheelSize: "700c",
      brakeType: "disc"
    }
  },
  {
    id: "fat-bike-aluminum",
    name: "Fat Bike Aluminum",
    category: "Fat Bike",
    basePrice: 1299,
    image: "/api/placeholder/400/300",
    description: "Wide-tire capable aluminum frame for snow and sand riding",
    colors: ["arctic-white", "sunset-orange", "deep-purple"],
    compatibility: {
      forkType: "fat-fork",
      wheelSize: "fat-tire",
      brakeType: "disc"
    }
  },
  {
    id: "hardtail-carbon",
    name: "Hardtail Carbon Race",
    category: "Hardtail",
    basePrice: 1499,
    image: "/api/placeholder/400/300",
    description: "Stiff carbon hardtail frame for racing and fast trail riding",
    colors: ["carbon-weave", "electric-red", "forest-camo"],
    compatibility: {
      forkType: "120mm-travel",
      wheelSize: "29-inch",
      brakeType: "disc"
    }
  },
  {
    id: "e-bike-aluminum",
    name: "E-Bike Aluminum",
    category: "E-Bike",
    basePrice: 2799,
    image: "/api/placeholder/400/300",
    description: "Electric-ready aluminum frame with integrated battery mount",
    colors: ["charcoal", "electric-blue", "olive-green"],
    compatibility: {
      forkType: "150mm-travel",
      wheelSize: "29-inch",
      brakeType: "disc"
    }
  }
];

export const bikeParts: Record<string, BikePart[]> = {
  fork: [
    {
      id: "rockshox-pike",
      name: "RockShox Pike Ultimate",
      category: "fork",
      price: 899,
      image: "/api/placeholder/200/150",
      compatibility: ["160mm-travel", "140mm-travel"],
      marketplaceLinks: [
        { name: "Chain Reaction Cycles", url: "https://chainreactioncycles.com" },
        { name: "Wiggle", url: "https://wiggle.com" }
      ]
    },
    {
      id: "fox-36",
      name: "Fox 36 Factory",
      category: "fork",
      price: 1299,
      image: "/api/placeholder/200/150",
      compatibility: ["160mm-travel"],
      marketplaceLinks: [
        { name: "Chain Reaction Cycles", url: "https://chainreactioncycles.com" }
      ]
    }
  ],
  wheels: [
    {
      id: "dt-swiss-wheels",
      name: "DT Swiss XM 1700",
      category: "wheels",
      price: 649,
      image: "/api/placeholder/200/150",
      compatibility: ["29-inch"],
      marketplaceLinks: [
        { name: "Chain Reaction Cycles", url: "https://chainreactioncycles.com" }
      ]
    }
  ],
  drivetrain: [
    {
      id: "sram-gx-eagle",
      name: "SRAM GX Eagle 12-Speed",
      category: "drivetrain",
      price: 449,
      image: "/api/placeholder/200/150",
      compatibility: ["160mm-travel", "140mm-travel", "100mm-travel"],
      marketplaceLinks: [
        { name: "Chain Reaction Cycles", url: "https://chainreactioncycles.com" },
        { name: "Wiggle", url: "https://wiggle.com" }
      ]
    }
  ],
  brakes: [
    {
      id: "shimano-xt-brakes",
      name: "Shimano XT M8100",
      category: "brakes",
      price: 299,
      image: "/api/placeholder/200/150",
      compatibility: ["disc"],
      marketplaceLinks: [
        { name: "Chain Reaction Cycles", url: "https://chainreactioncycles.com" }
      ]
    }
  ]
};

export interface BikeConfig {
  frame: BikeFrame | null;
  frameColor: string;
  parts: Record<string, BikePart | null>;
  totalPrice: number;
}

export const getCompatibleParts = (frame: BikeFrame, category: string): BikePart[] => {
  const parts = bikeParts[category] || [];
  return parts.filter(part => 
    part.compatibility.some(compat => 
      Object.values(frame.compatibility).includes(compat)
    )
  );
};