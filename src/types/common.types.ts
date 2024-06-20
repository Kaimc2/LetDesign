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
