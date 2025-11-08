// src/types.ts

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  photo?: string;
  countryCode?: string;
}

export interface Profile {
  name: string;
  email: string;
  phone?: string;
  bio?: string;
  photo?: string;
  countryCode?: string;
}

export interface Country {
  code: string;
  name: string;
  phoneLengths?: number[];
}

// Props pour le formulaire d'édition
export interface EditUserFormProps {
  user: User;
  onClose: () => void;
  onUpdate: (updatedUser: User) => void;
}

// Props pour le formulaire de création
export interface ProfileFormProps {
  editingUser?: User | null;
}

// Toast
export type ToastSeverity = 'success' | 'error';
export interface ToastProps {
  open: boolean;
  message: string;
  severity: ToastSeverity;
  onClose: () => void;
}
