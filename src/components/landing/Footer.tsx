'use client';

import { Link } from 'react-router-dom';
import { FileText, Twitter, Github, Linkedin, Youtube, Mail } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const footerLinks = {
  Product: ['Features', 'Pricing', 'Templates', 'Integrations'],
  Resources: ['Documentation', 'API Reference', 'Blog', 'Community'],
  Company: ['About', 'Careers', 'Press', 'Contact'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR'],
};

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="bg-white text-slate-500 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span className="font-semibold text-xl text-slate-900">DocSync</span>
            </Link>
            <p className="text-sm mb-6 max-w-xs">
              Real-time document collaboration for modern teams. Create, share, and collaborate seamlessly.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-slate-100 border border-slate-200 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-slate-900 font-semibold mb-4">{category}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm hover:text-indigo-600 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-10 sm:my-12 bg-slate-200" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-sm">
            © {new Date().getFullYear()} DocSync. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <a href="#" className="hover:text-indigo-600 transition-colors">Status</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Security</a>
            <a href="#" className="flex items-center gap-2 hover:text-indigo-600 transition-colors">
              <Mail className="h-4 w-4" />
              support@docsync.io
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}