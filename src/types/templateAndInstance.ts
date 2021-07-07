import { User } from "./auth";

export type File = { name: string; files: string[] };

export interface Files {
  name: string;
  files: string[];
  folder?: File[];
}

export interface Template {
  id: string;
  name: string;
  files: Files;
  used: number;
  language: string;
  status: boolean;
}

export interface Instance {
  id: string;
  name: string;
  description?: string;
  keywords?: string;
  isPriavte?: boolean;
  fork?: boolean;
  files: Files;
  autosave?: boolean;
  autopreview?: boolean;
  likes?: number;
  shares?: number;
  forks?: number;
  deletedAt?: Date;
  status?: boolean;
  UserId?: string;
  User?: User;
}
