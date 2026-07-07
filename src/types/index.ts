export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
}

export interface Document {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  owner: User;
  collaborators?: Collaborator[];
  isFavorite: boolean;
  isShared: boolean;
  isTrashed: boolean;
  lastOpened?: Date;
  wordCount: number;
  characterCount: number;
}

export interface Collaborator {
  user: User;
  role: 'owner' | 'editor' | 'viewer';
  cursorPosition?: number;
  lastActive?: Date;
}

export interface Comment {
  id: string;
  documentId: string;
  content: string;
  author: User;
  createdAt: Date;
  resolved: boolean;
  position?: {
    from: number;
    to: number;
  };
}

export interface Version {
  id: string;
  documentId: string;
  content: string;
  createdAt: Date;
  author: User;
  description?: string;
}

export interface Activity {
  id: string;
  documentId: string;
  action: 'created' | 'edited' | 'shared' | 'commented' | 'renamed';
  user: User;
  timestamp: Date;
  details?: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  isPopular?: boolean;
  buttonText: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  message: string;
  read: boolean;
  timestamp: Date;
  documentId?: string;
}
