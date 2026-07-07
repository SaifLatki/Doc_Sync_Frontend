'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { User, Document, Notification } from '@/types';
import { currentUser, mockDocuments, mockUsers } from '@/lib/data';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  documents: Document[];
  setDocuments: (documents: Document[]) => void;
  currentDocument: Document | null;
  setCurrentDocument: (document: Document | null) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  rightSidebarOpen: boolean;
  setRightSidebarOpen: (open: boolean) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  createDocument: (title?: string) => Document;
  updateDocument: (id: string, updates: Partial<Document>) => void;
  deleteDocument: (id: string) => void;
  toggleFavorite: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(currentUser);
  const [documents, setDocuments] = useState<Document[]>(mockDocuments.filter(d => !d.isTrashed));
  const [currentDocument, setCurrentDocument] = useState<Document | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', type: 'info', message: 'Sarah Wilson is editing "Project Proposal"', read: false, timestamp: new Date() },
    { id: '2', type: 'success', message: 'Document auto-saved', read: true, timestamp: new Date(Date.now() - 60000) },
  ]);

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const newNotification = { ...notification, id: Date.now().toString() };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const createDocument = (title = 'Untitled Document'): Document => {
    const newDoc: Document = {
      id: Date.now().toString(),
      title,
      content: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      owner: user!,
      isFavorite: false,
      isShared: false,
      isTrashed: false,
      wordCount: 0,
      characterCount: 0,
    };
    setDocuments(prev => [newDoc, ...prev]);
    return newDoc;
  };

  const updateDocument = (id: string, updates: Partial<Document>) => {
    setDocuments(prev => prev.map(doc => doc.id === id ? { ...doc, ...updates } : doc));
  };

  const deleteDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  const toggleFavorite = (id: string) => {
    setDocuments(prev => prev.map(doc =>
      doc.id === id ? { ...doc, isFavorite: !doc.isFavorite } : doc
    ));
  };

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      documents,
      setDocuments,
      currentDocument,
      setCurrentDocument,
      sidebarOpen,
      setSidebarOpen,
      rightSidebarOpen,
      setRightSidebarOpen,
      isAuthenticated,
      setIsAuthenticated,
      notifications,
      addNotification,
      removeNotification,
      createDocument,
      updateDocument,
      deleteDocument,
      toggleFavorite,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
