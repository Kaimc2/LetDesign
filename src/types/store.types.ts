export interface Store {
  id: string;
  name: string;
  tailorThumbnail?: string;
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

export interface Material {
  id: string;
  name: string;
}

export interface Size {
  id: string;
  name: string;
}

export interface Color {
  id: string;
  name: string;
  hexCode: string;
}
