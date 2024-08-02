export interface CommissionType {
  id: string;
  designId: string;
  designName: string;
  tailorId: string;
  tailorName: string;
  designOwnerId: string;
  designOwnerName: string;
  options: string;
  total: number;
  status: number;
  startDate: string;
  endDate?: string;
}

export interface CommissionInput {
  designId: string;
  tailorId: string;
  options: string;
  status: number;
  startDate: string;
  endDate?: string;
}

export enum CommissionStatus {
  REVIEWING = 1,
  IN_PROGRESS = 2, 
  DELIVERING = 3,
  COMPLETED = 4,
  REJECTED = 5,
}

export interface CommissionOptions {
  material: string;
  color: string;
  size: SizeInput | SizeInput[];
}

export interface SizeInput {
  name: string;
  qty: number;
}
