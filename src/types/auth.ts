export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string | null;
  followers?: number;
  following?: number;
  authType?: "google" | "github";
  status?: "active" | "blocked" | "deleted";
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Auth {
  login: boolean;
  isNewUser?: boolean;
  user?: User;
  admin?: User;
}
