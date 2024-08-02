export const CANVAS_WIDTH = 675;
export const CANVAS_HEIGHT = 670;

export interface FormData {
  username: string;
  email: string;
  number: string;
  password: string;
  confirmPassword: string;
}

export interface Errors {
  username?: string;
  email?: string;
  number?: string;
  password?: string;
  confirmPassword?: string;
}

export interface StatusNotificationResponse {
  message: string;
  status: string;
}

export interface PageMeta {
  currentPage: number;
  from: number;
  lastPage: number;
  perPage: number;
  to: number;
  total: number;
}

export const DefaultPageMeta = {
  currentPage: 1,
  from: 1,
  lastPage: 1,
  perPage: 1,
  to: 1,
  total: 1,
};
