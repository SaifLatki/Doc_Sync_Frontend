import './globals.css';

export const metadata = {
  title: 'DocSync - Real-Time Collaborative Document Editor',
  description: 'Create, edit, and collaborate on documents with your team seamlessly.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
