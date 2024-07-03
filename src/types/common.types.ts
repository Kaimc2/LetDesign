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