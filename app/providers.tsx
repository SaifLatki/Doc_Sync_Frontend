'use client';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from '@/context/AppContext';
import { AnimatePresence } from 'framer-motion';

// Landing Page Component
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ArrowRight, Play, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { pricingPlans, testimonials, faqs } from '@/lib/data';
import LandingNavbar from '@/components/landing/LandingNavbar';
import Footer from '@/components/landing/Footer';
import { FileText, Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useState, useMemo, useEffect, Suspense } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Highlight from '@tiptap/extension-highlight';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';
import { Wifi, WifiOff, Save, MessageSquare, Search, Grid, List, Plus, Users, MoreVertical, Trash2, Share2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Document } from '@/types';
import { EditorMenuBar } from '@/components/editor/EditorMenuBar';
import { EditorToolbar } from '@/components/editor/EditorToolbar';
import { StatusBar } from '@/components/editor/StatusBar';
import { RightSidebar } from '@/components/editor/RightSidebar';
import { CollaboratorCursor } from '@/components/editor/CollaboratorCursor';
import { mockComments, mockVersions, mockActivities } from '@/lib/data';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

// Features data
const features = [
  { title: 'Real-Time Collaboration', description: 'Work together with your team in real-time.' },
  { title: 'Smart Sharing', description: 'Share documents with specific permissions.' },
  { title: 'Auto-Save', description: 'Never lose your work again.' },
  { title: 'Version History', description: 'Track every change with version history.' },
  { title: 'Rich Formatting', description: 'Format your documents with a powerful editor.' },
  { title: 'Enterprise Security', description: 'Bank-grade encryption protects your documents.' },
];

// Landing Page
function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50/50" />
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge className="bg-blue-100 text-blue-700 mb-6 px-4 py-1.5">
              <Star className="h-3 w-3 mr-1 fill-current" />
              Trusted by 50,000+ teams
            </Badge>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Collaborate on documents<br />
            <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">in real-time</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Create, edit, and collaborate on documents with your team seamlessly.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-xl">
                Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg rounded-xl">
              <Play className="mr-2 h-5 w-5" /> Watch Demo
            </Button>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="relative max-w-5xl mx-auto mt-16">
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
            <div className="h-8 bg-gray-100 flex items-center px-4 gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" /><div className="w-3 h-3 rounded-full bg-yellow-400" /><div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <img src="https://images.unsplash.com/photo-1586281380349-632531da7ad3?w=1200&h=500&fit=crop" alt="DocSync Editor" className="w-full h-auto" />
          </div>
        </motion.div>
      </section>

      <section className="py-24 px-4" id="features">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything you need</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">Powerful features designed for modern teams.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <motion.div key={feature.title} whileHover={{ y: -5 }} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-gray-50" id="pricing">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple pricing</h2>
            <p className="text-xl text-gray-600">Choose the right plan for you.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <motion.div key={plan.id} whileHover={{ y: -5 }} className={`rounded-2xl p-8 ${plan.isPopular ? 'bg-blue-600 text-white shadow-xl scale-105' : 'bg-white border border-gray-200'}`}>
                {plan.isPopular && <Badge className="bg-white text-blue-600 mb-4">Most Popular</Badge>}
                <h3 className={`text-xl font-semibold mb-2 ${plan.isPopular ? '' : 'text-gray-900'}`}>{plan.name}</h3>
                <div className="mb-6">
                  <span className={`text-4xl font-bold ${plan.isPopular ? '' : 'text-gray-900'}`}>${plan.price}</span>
                  <span className={plan.isPopular ? 'text-blue-100' : 'text-gray-500'}>/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.slice(0, 5).map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className={`h-5 w-5 flex-shrink-0 ${plan.isPopular ? 'text-blue-200' : 'text-blue-600'}`} />
                      <span className={plan.isPopular ? 'text-blue-100' : 'text-gray-600'}>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className={`w-full ${plan.isPopular ? 'bg-white text-blue-600 hover:bg-blue-50' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}>{plan.buttonText}</Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4" id="testimonials">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16"><h2 className="text-4xl font-bold text-gray-900 mb-4">Loved by teams everywhere</h2></div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <Card key={t.id}>
                <CardContent className="p-8">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => <Star key={i} className={`h-5 w-5 ${i < t.rating ? 'text-yellow-400 fill-current' : 'text-gray-200'}`} />)}
                  </div>
                  <p className="text-gray-600 mb-6 italic">&quot;{t.content}&quot;</p>
                  <div className="flex items-center gap-3">
                    <img src={t.avatar} alt={t.author} className="w-12 h-12 rounded-full" />
                    <div><div className="font-semibold text-gray-900">{t.author}</div><div className="text-sm text-gray-500">{t.role}</div></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-4 bg-gray-50" id="faq">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16"><h2 className="text-4xl font-bold text-gray-900 mb-4">FAQ</h2></div>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="py-24 px-4 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to get started?</h2>
          <p className="text-xl text-blue-100 mb-10">Join thousands of teams using DocSync.</p>
          <Link to="/signup">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg">Get Started Free <ArrowRight className="ml-2 h-5 w-5" /></Button>
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}

// Login Page
function LoginPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setIsLoading(false);
    toast({ title: 'Welcome back!' });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center"><FileText className="h-6 w-6 text-white" /></div>
              <span className="font-bold text-2xl">DocSync</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h1>
            <p className="text-gray-600">Sign in to continue</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="pl-10" required />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between"><Label>Password</Label><Link to="/forgot" className="text-sm text-blue-600">Forgot?</Link></div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="pl-10 pr-10" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'} {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
            </Button>
            <div className="relative"><Separator /><span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-gray-500">or</span></div>
            <Button type="button" variant="outline" className="w-full py-6">Continue with Google</Button>
          </form>
          <p className="text-center text-gray-600 mt-8">No account? <Link to="/signup" className="text-blue-600 font-medium">Sign up</Link></p>
        </motion.div>
      </div>
      <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800" />
    </div>
  );
}

// Signup Page
function SignupPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setIsLoading(false);
    toast({ title: 'Account created!' });
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800" />
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center"><FileText className="h-6 w-6 text-white" /></div>
              <span className="font-bold text-2xl">DocSync</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Create account</h1>
            <p className="text-gray-600">Start your free trial</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label>Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="pl-10" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="pl-10" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="pl-10" required />
              </div>
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Account'} {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
            </Button>
          </form>
          <p className="text-center text-gray-600 mt-8">Have an account? <Link to="/login" className="text-blue-600 font-medium">Sign in</Link></p>
        </motion.div>
      </div>
    </div>
  );
}

// Dashboard Page
function DashboardPage() {
  const { documents, user, createDocument, setCurrentDocument, toggleFavorite, deleteDocument } = useApp();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const filter = searchParams.get('filter') || 'owned';
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<Document | null>(null);

  const filteredDocuments = useMemo(() => {
    let filtered = documents.filter(d => !d.isTrashed);
    if (filter === 'shared') filtered = filtered.filter(d => d.isShared);
    else if (filter === 'favorites') filtered = filtered.filter(d => d.isFavorite);
    else if (filter === 'owned') filtered = filtered.filter(d => d.owner.id === user?.id);
    if (searchQuery) filtered = filtered.filter(d => d.title.toLowerCase().includes(searchQuery.toLowerCase()));
    return filtered;
  }, [documents, filter, searchQuery, user]);

  const handleNewDocument = () => {
    const newDoc = createDocument();
    setCurrentDocument(newDoc);
    navigate(`/editor/${newDoc.id}`);
  };

  const stats = [
    { icon: FileText, label: 'Documents', value: documents.filter(d => !d.isTrashed).length, color: 'blue' },
    { icon: Share2, label: 'Shared', value: documents.filter(d => d.isShared).length, color: 'green' },
  ];

  const colorClasses: Record<string, string> = { blue: 'bg-blue-50 text-blue-600', green: 'bg-green-50 text-green-600' };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl p-6 border border-gray-100">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${colorClasses[stat.color]}`}><Icon className="h-5 w-5" /></div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>
      <div className="flex justify-between items-center">
        <div><h1 className="text-2xl font-bold text-gray-900">My Documents</h1><p className="text-gray-600">{filteredDocuments.length} documents</p></div>
        <div className="flex items-center gap-3">
          <div className="relative"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" /><Input placeholder="Search" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 w-64" /></div>
          <Button onClick={handleNewDocument} className="bg-blue-600 hover:bg-blue-700 text-white"><Plus className="h-4 w-4 mr-2" />New</Button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredDocuments.map((doc, i) => (
          <motion.div key={doc.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Link to={`/editor/${doc.id}`}>
              <Card className="group hover:shadow-lg hover:border-blue-200 transition-all">
                <div className="h-32 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center relative">
                  <FileText className="h-12 w-12 text-blue-300" />
                  {doc.isFavorite && <Star className="absolute top-2 right-2 h-4 w-4 text-yellow-400 fill-current" />}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium text-gray-900 truncate">{doc.title}</h3>
                  <p className="text-sm text-gray-500">{new Date(doc.updatedAt).toLocaleDateString()}</p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Delete Document</DialogTitle><DialogDescription>Delete &quot;{documentToDelete?.title}&quot;?</DialogDescription></DialogHeader>
          <DialogFooter><Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button><Button variant="destructive" onClick={() => { if (documentToDelete) { deleteDocument(documentToDelete.id); setDeleteDialogOpen(false); } }}>Delete</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Editor Page
function EditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { documents, setCurrentDocument, updateDocument } = useApp();
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);
  const [isSaved, setIsSaved] = useState(true);
  const [lastSaved, setLastSaved] = useState(new Date());
  const [zoom, setZoom] = useState(100);

  const document = documents.find(d => d.id === id);

  const editor = useEditor({
    extensions: [StarterKit, Highlight, Underline, TextAlign, TextStyle, Color, Image, Placeholder.configure({ placeholder: 'Start typing...' })],
    content: document?.content || '',
    onUpdate: ({ editor }) => {
      setIsSaved(false);
      setTimeout(() => { setIsSaved(true); setLastSaved(new Date()); if (document) updateDocument(document.id, { content: editor.getHTML(), updatedAt: new Date() }); }, 1000);
    },
  });

  useEffect(() => { if (document) setCurrentDocument(document); }, [document, setCurrentDocument]);

  if (!document) return <div className="min-h-screen flex items-center justify-center"><h2 className="text-2xl font-bold">Document not found</h2><Button onClick={() => navigate('/dashboard')}>Go to Dashboard</Button></div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <EditorMenuBar document={document} />
      <EditorToolbar editor={editor} />
      <div className="flex-1 flex">
        <div className="flex-1 overflow-auto bg-white">
          <div style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}>
            <EditorContent editor={editor} className="min-h-[calc(100vh-200px)] p-16" />
          </div>
        </div>
        <RightSidebar isOpen={rightSidebarOpen} activeTab="comments" onTabChange={() => {}} onClose={() => setRightSidebarOpen(false)} comments={mockComments} versions={mockVersions} activities={mockActivities} />
      </div>
      <StatusBar connectionStatus="connected" isSaved={isSaved} lastSaved={lastSaved} wordCount={document.wordCount} characterCount={document.characterCount} zoom={zoom} onZoomChange={setZoom} />
      {!rightSidebarOpen && <button onClick={() => setRightSidebarOpen(true)} className="fixed right-4 top-1/2 bg-blue-600 text-white p-3 rounded-lg"><MessageSquare className="h-5 w-5" /></button>}
    </div>
  );
}

// Profile Page
function ProfilePage() {
  const { user } = useApp();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between">
        <div><h1 className="text-2xl font-bold text-gray-900">Profile</h1><p className="text-gray-600">Manage your info</p></div>
        <Button onClick={() => setIsEditing(!isEditing)} className="bg-blue-600">{isEditing ? 'Save' : 'Edit'}</Button>
      </div>
      <Card>
        <CardContent className="p-8">
          <div className="flex items-center gap-6">
            <Avatar className="w-24 h-24"><AvatarImage src={user?.avatar} /><AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback></Avatar>
            <div><h2 className="text-2xl font-bold">{user?.name}</h2><p className="text-gray-600">{user?.email}</p></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Settings Page
function SettingsPage() {
  const [theme, setTheme] = useState('light');
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
      <Card>
        <CardHeader><CardTitle>Appearance</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between"><span>Theme</span><Select value={theme} onValueChange={setTheme}><SelectTrigger className="w-32"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="light">Light</SelectItem><SelectItem value="dark">Dark</SelectItem></SelectContent></Select></div>
        </CardContent>
      </Card>
    </div>
  );
}

// Main App
export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/editor/:id" element={<EditorPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </AppProvider>
  );
}
