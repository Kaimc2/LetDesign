export interface Store {
  id: string;
  name: string;
  tailorThumbnail?: string | File;
  description: string;
  address: string;
  email: string;
  ownerId: string;
  ownerName: string;
  phoneNumber: string;
  materials: Material[];
  colors: Color[];
  sizes: Size[];
  updatedAt: string;
}

export interface StoreInput {
  name: string;
  description: string;
  tailorThumbnail?: string | File;
  address: string;
  email: string;
  phoneNumber: string;
  ownerId: string;
}

export interface StoreAPIInput {
  name: string;
  description: string;
  address: string;
  phone_number: string;
  email: string;
  owner_id: number;
  tailor_thumbnail?: File;
}

export interface Material {
  id: string;
  name: string;
  price?: number;
}

export interface Size {
  id: string;
  name: string;
  price?: number;
}

export interface Color {
  id: string;
  name: string;
  hexCode: string;
  price?: number;
}
