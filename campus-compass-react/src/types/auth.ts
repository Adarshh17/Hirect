export interface User {
  userId: string;
  email: string;
  role: 'seeker';
  firstName?: string;
  lastName?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpData {
  email: string;
  password: string;
  role: 'seeker';
  firstName?: string;
  lastName?: string;
}