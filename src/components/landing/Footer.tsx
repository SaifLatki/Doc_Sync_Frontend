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
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span className="font-semibold text-xl text-white">DocSync</span>
            </Link>
            <p className="text-sm mb-6">
              Real-time document collaboration for modern teams. Create, share, and collaborate seamlessly.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
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
              <h3 className="text-white font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-12 bg-gray-800" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            © {new Date().getFullYear()} DocSync. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="hover:text-white transition-colors">Status</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
            <a href="#" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail className="h-4 w-4" />
              support@docsync.io
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
