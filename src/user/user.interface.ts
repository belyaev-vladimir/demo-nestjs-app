
export interface UserResponse {
  email: string;
}

export interface AuthResponse extends UserResponse {
  token?: string;
  error?: string;
}

export interface AuthPayload {
  email: string;
}
