const travelCase = {
  name: "Luxury Travel Case",
  image: "/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-luxury-travel-case-lifestyle.webp",
};

const x1Contents = [
  travelCase,
  {
    name: "Charging Dock",
    image: "/assets_ref/x/gallery/miroooo-x1-charging-dock.webp",
  },
  {
    name: "2 Free Heads",
    image: "/assets_ref/x/gallery/miroooo-x1-replacement-brush-heads-beside-retail-carton.webp",
  },
];

export type BrushBoxItem = { name: string; image: string; alt?: string };

export const x2FreeBrushHeads = {
  name: "Free Brush Heads",
  image: "/assets_ref/gifts/miroooo-x2-sonic-electric-toothbrush-free-replacement-brush-heads.webp",
  alt: "MIROOOO X2 sonic toothbrush replacement head with blue, white and yellow bristles",
};

export const brushBoxContents: Record<string, BrushBoxItem[]> = {
  "miroooo-x": x1Contents,
  "miroooo-x1": x1Contents,
  "miroooo-x2": [
    travelCase,
    {
      name: "Wall Mounted",
      image: "/assets_ref/x2/gallery/miroooo-x2-sonic-electric-toothbrush-wall-mounted-dock-storage.webp",
    },
    x2FreeBrushHeads,
  ],
};
