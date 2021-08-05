import { User } from "./auth";

export type File = {
  name: string;
  files: string[];
  folder?: Files[];
};

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
  createdAt?: string;
  updatedAt?: string;
}

export interface Instance {
  id: string;
  name: string;
  description?: string;
  keywords?: string;
  subdomain?:string;
  isPriavte?: boolean;
  fork?: boolean;
  files: Files;
  autosave?: boolean;
  autopreview?: boolean;
  views?: number;
  likes?: number;
  shares?: number;
  forks?: number;
  deletedAt?: string;
  status?: boolean;
  UserId?: string;
  User?: User;
  createdAt?: string;
  updatedAt?: string;
  lastEditied?: string;
}

export interface InstanceMetaData {
  id: string;
  name: string;
  description?: string;
  keywords?: string;
  autosave?: boolean;
  autopreview?: boolean;
}
