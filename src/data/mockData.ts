export interface Camera {
  id: string;
  brand: string;
  model: string;
  year: number;
  megapixels: number;
  sensorType: string;
  image: string;
  description: string;
}

export interface Photo {
  id: string;
  cameraId: string;
  url: string;
  caption: string;
  user: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  location: string;
  bio: string;
  avatarUrl: string;
  ownedCameraIds: string[];
  wishlistCameraIds: string[];
}

export const CAMERAS: Camera[] = [
  {
    id: "canon-ixus-70",
    brand: "Canon",
    model: "IXUS 70",
    year: 2007,
    megapixels: 7.1,
    sensorType: "CCD",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800",
    description: "A cult classic known for its sharp lens and beautiful CCD colors. The ultimate pocket companion."
  },
  {
    id: "sony-cybershot-t700",
    brand: "Sony",
    model: "Cyber-shot T700",
    year: 2008,
    megapixels: 10.1,
    sensorType: "CCD",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&q=80&w=800",
    description: "Ultra-slim design with a massive touchscreen for its time. Perfect for that early 2000s aesthetic."
  },
  {
    id: "nikon-coolpix-s210",
    brand: "Nikon",
    model: "Coolpix S210",
    year: 2008,
    megapixels: 8.0,
    sensorType: "CCD",
    image: "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?auto=format&fit=crop&q=80&w=800",
    description: "Simple, reliable, and produces those nostalgic, slightly grainy shots we all love."
  },
  {
    id: "olympus-mju-mini",
    brand: "Olympus",
    model: "Stylus Verve / µ-mini",
    year: 2004,
    megapixels: 4.0,
    sensorType: "CCD",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800",
    description: "The most whimsical design of the era. Weather-proof and incredibly stylish."
  }
];

export const MOCK_USERS: User[] = [
  {
    id: "u1",
    username: "pixel_queen",
    email: "queen@digidream.com",
    location: "Tokyo, JP",
    bio: "Collecting CCD sensors and chasing that early 2000s aesthetic. Canon IXUS enthusiast. ✨",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=pixel_queen",
    ownedCameraIds: ["canon-ixus-70", "olympus-mju-mini"],
    wishlistCameraIds: ["sony-cybershot-t700"],
  },
  {
    id: "u2",
    username: "retro_boy",
    email: "retro@digidream.com",
    location: "London, UK",
    bio: "Nikon Coolpix fan. The grainier, the better.",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=retro_boy",
    ownedCameraIds: ["nikon-coolpix-s210"],
    wishlistCameraIds: ["canon-ixus-70", "olympus-mju-mini"],
  }
];

export const PHOTOS: Photo[] = [
  {
    id: "p1",
    cameraId: "canon-ixus-70",
    url: "https://images.unsplash.com/photo-1552168324-d612d77725e3?auto=format&fit=crop&q=80&w=800",
    caption: "Golden hour in the city",
    user: "pixel_queen"
  },
  {
    id: "p2",
    cameraId: "sony-cybershot-t700",
    url: "https://images.unsplash.com/photo-1566275529824-cca6d008f3da?auto=format&fit=crop&q=80&w=800",
    caption: "Flash photography vibes",
    user: "retro_boy"
  },
  {
    id: "p3",
    cameraId: "canon-ixus-70",
    url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800",
    caption: "Portrait of a friend",
    user: "ccd_lover"
  }
];