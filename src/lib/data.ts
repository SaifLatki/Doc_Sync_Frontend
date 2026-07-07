import { User, Document, Comment, Version, Activity, PricingPlan, Testimonial, FAQ } from '@/types';

export const currentUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  createdAt: new Date('2024-01-15'),
};

export const mockUsers: User[] = [
  currentUser,
  {
    id: '2',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b59330?w=150&h=150&fit=crop&crop=face',
    createdAt: new Date('2024-02-20'),
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    createdAt: new Date('2024-03-10'),
  },
  {
    id: '4',
    name: 'Emily Johnson',
    email: 'emily@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    createdAt: new Date('2024-04-05'),
  },
];

export const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Project Proposal - Q4 Launch',
    content: '<p>Project Proposal for Q4...</p>',
    createdAt: new Date('2024-06-01'),
    updatedAt: new Date('2024-06-15'),
    owner: currentUser,
    collaborators: [
      { user: mockUsers[1], role: 'editor', cursorPosition: 120, lastActive: new Date() },
      { user: mockUsers[2], role: 'viewer', lastActive: new Date(Date.now() - 3600000) },
    ],
    isFavorite: true,
    isShared: true,
    isTrashed: false,
    lastOpened: new Date(),
    wordCount: 1245,
    characterCount: 7823,
  },
  {
    id: '2',
    title: 'Meeting Notes - Team Sync',
    content: '<p>Meeting notes from today...</p>',
    createdAt: new Date('2024-06-10'),
    updatedAt: new Date('2024-06-14'),
    owner: currentUser,
    isFavorite: false,
    isShared: false,
    isTrashed: false,
    lastOpened: new Date(Date.now() - 86400000),
    wordCount: 532,
    characterCount: 3421,
  },
  {
    id: '3',
    title: 'Marketing Strategy 2024',
    content: '<p>Our marketing strategy...</p>',
    createdAt: new Date('2024-05-20'),
    updatedAt: new Date('2024-06-12'),
    owner: mockUsers[1],
    collaborators: [{ user: currentUser, role: 'editor' }],
    isFavorite: true,
    isShared: true,
    isTrashed: false,
    wordCount: 2134,
    characterCount: 14532,
  },
  {
    id: '4',
    title: 'Product Requirements Document',
    content: '<p>PRD for new feature...</p>',
    createdAt: new Date('2024-06-05'),
    updatedAt: new Date('2024-06-15'),
    owner: currentUser,
    collaborators: [
      { user: mockUsers[1], role: 'editor' },
      { user: mockUsers[2], role: 'editor' },
      { user: mockUsers[3], role: 'viewer' },
    ],
    isFavorite: false,
    isShared: true,
    isTrashed: false,
    lastOpened: new Date(Date.now() - 172800000),
    wordCount: 3421,
    characterCount: 23456,
  },
  {
    id: '5',
    title: 'Employee Handbook',
    content: '<p>Welcome to the team...</p>',
    createdAt: new Date('2024-04-01'),
    updatedAt: new Date('2024-05-30'),
    owner: currentUser,
    isFavorite: false,
    isShared: false,
    isTrashed: false,
    wordCount: 8234,
    characterCount: 54321,
  },
  {
    id: '6',
    title: 'Old Draft - Delete Me',
    content: '<p>Old content...</p>',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-02-15'),
    owner: currentUser,
    isFavorite: false,
    isShared: false,
    isTrashed: true,
    wordCount: 234,
    characterCount: 1234,
  },
];

export const mockComments: Comment[] = [
  {
    id: '1',
    documentId: '1',
    content: 'This section needs more clarity on the timeline.',
    author: mockUsers[1],
    createdAt: new Date(Date.now() - 3600000),
    resolved: false,
  },
  {
    id: '2',
    documentId: '1',
    content: 'Great work on the budget breakdown!',
    author: mockUsers[2],
    createdAt: new Date(Date.now() - 7200000),
    resolved: true,
  },
  {
    id: '3',
    documentId: '1',
    content: 'Should we add more details about the risk assessment?',
    author: mockUsers[3],
    createdAt: new Date(Date.now() - 14400000),
    resolved: false,
  },
];

export const mockVersions: Version[] = [
  {
    id: '1',
    documentId: '1',
    content: '<p>Version 1...</p>',
    createdAt: new Date(Date.now() - 86400000 * 3),
    author: currentUser,
    description: 'Initial draft',
  },
  {
    id: '2',
    documentId: '1',
    content: '<p>Version 2...</p>',
    createdAt: new Date(Date.now() - 86400000 * 2),
    author: mockUsers[1],
    description: 'Added budget section',
  },
  {
    id: '3',
    documentId: '1',
    content: '<p>Version 3...</p>',
    createdAt: new Date(Date.now() - 86400000),
    author: currentUser,
    description: 'Final review changes',
  },
];

export const mockActivities: Activity[] = [
  {
    id: '1',
    documentId: '1',
    action: 'edited',
    user: mockUsers[1],
    timestamp: new Date(Date.now() - 600000),
    details: 'Updated the introduction section',
  },
  {
    id: '2',
    documentId: '1',
    action: 'commented',
    user: mockUsers[2],
    timestamp: new Date(Date.now() - 1800000),
  },
  {
    id: '3',
    documentId: '1',
    action: 'shared',
    user: currentUser,
    timestamp: new Date(Date.now() - 3600000),
    details: 'Shared with Sarah Wilson',
  },
  {
    id: '4',
    documentId: '1',
    action: 'created',
    user: currentUser,
    timestamp: new Date(Date.now() - 86400000 * 7),
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    features: [
      'Up to 5 documents',
      'Basic collaboration',
      '100MB storage',
      'Export to PDF',
      'Mobile app access',
    ],
    buttonText: 'Get Started',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 12,
    isPopular: true,
    features: [
      'Unlimited documents',
      'Real-time collaboration',
      '5GB storage',
      'Version history (30 days)',
      'Priority support',
      'Advanced formatting',
      'Custom templates',
    ],
    buttonText: 'Start Free Trial',
  },
  {
    id: 'team',
    name: 'Team',
    price: 29,
    features: [
      'Everything in Pro',
      'Unlimited team members',
      '50GB storage',
      'Unlimited version history',
      'Admin controls',
      'SSO integration',
      'Advanced analytics',
      'Custom branding',
    ],
    buttonText: 'Contact Sales',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    author: 'Alexandra Rivera',
    role: 'Product Manager',
    company: 'TechCorp',
    content: 'DocSync has transformed how our team collaborates. The real-time editing feature is a game-changer for our product documentation.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d65495b?w=150&h=150&fit=crop&crop=face',
    rating: 5,
  },
  {
    id: '2',
    author: 'James Mitchell',
    role: 'Engineering Lead',
    company: 'StartupXYZ',
    content: 'The simplicity and speed of DocSync is unmatched. We switched from Google Docs and have never looked back.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    rating: 5,
  },
  {
    id: '3',
    author: 'Sophie Anderson',
    role: 'Content Director',
    company: 'MediaHub',
    content: 'Perfect for our content team. The commenting and version history features make collaboration seamless.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    rating: 4,
  },
];

export const faqs: FAQ[] = [
  {
    id: '1',
    question: 'How does real-time collaboration work?',
    answer: 'When you share a document, collaborators can edit simultaneously. You will see their cursors and changes in real-time, just like Google Docs.',
  },
  {
    id: '2',
    question: 'Can I export my documents?',
    answer: 'Yes! You can export documents to PDF, Word, or plain text formats. Pro and Team plans also support custom export templates.',
  },
  {
    id: '3',
    question: 'Is my data secure?',
    answer: 'Absolutely. All documents are encrypted at rest and in transit. We use enterprise-grade security and regular backups.',
  },
  {
    id: '4',
    question: 'Can I work offline?',
    answer: 'Yes, DocSync supports offline editing. Changes sync automatically when you reconnect to the internet.',
  },
  {
    id: '5',
    question: 'How do I cancel my subscription?',
    answer: 'You can cancel anytime from your account settings. Your documents will remain accessible, and you will not be charged again.',
  },
  {
    id: '6',
    question: 'Do you offer discounts for nonprofits or education?',
    answer: 'Yes! We offer 50% off for registered nonprofits and educational institutions. Contact our sales team for more information.',
  },
];

export const features = [
  {
    icon: 'Edit3',
    title: 'Real-Time Collaboration',
    description: 'Work together with your team in real-time. See changes as they happen and never worry about version conflicts.',
  },
  {
    icon: 'Users',
    title: 'Smart Sharing',
    description: 'Share documents with specific permissions. Control who can view, edit, or comment on your work.',
  },
  {
    icon: 'Save',
    title: 'Auto-Save',
    description: 'Never lose your work again. DocSync automatically saves every change, so you can focus on writing.',
  },
  {
    icon: 'History',
    title: 'Version History',
    description: 'Track every change with unlimited version history. Restore previous versions with a single click.',
  },
  {
    icon: 'Palette',
    title: 'Rich Formatting',
    description: 'Format your documents with a powerful editor. Add tables, images, code blocks, and more.',
  },
  {
    icon: 'Shield',
    title: 'Enterprise Security',
    description: 'Bank-grade encryption protects your documents. SSO and advanced admin controls for teams.',
  },
];

export const fontFamilies = [
  { value: 'Inter', label: 'Inter' },
  { value: 'Arial', label: 'Arial' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Times New Roman', label: 'Times New Roman' },
  { value: 'Courier New', label: 'Courier New' },
  { value: 'Verdana', label: 'Verdana' },
];

export const fontSizes = [
  { value: '12px', label: '12' },
  { value: '14px', label: '14' },
  { value: '16px', label: '16' },
  { value: '18px', label: '18' },
  { value: '24px', label: '24' },
  { value: '32px', label: '32' },
  { value: '48px', label: '48' },
];
