import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ahmed Khaled | Senior Frontend Developer',
  description: 'Senior Frontend Developer with 4 years of experience in Angular and React. Building scalable ERP dashboards and e-commerce web applications.',
  keywords: ['Frontend Developer', 'Angular', 'React', 'TypeScript', 'Cairo', 'Egypt'],
  authors: [{ name: 'Ahmed Khaled' }],
  openGraph: {
    title: 'Ahmed Khaled | Senior Frontend Developer',
    description: 'Building scalable web applications with Angular & React.',
    type: 'website',
  },
  icons: { icon: '/logo.svg' }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="noise-overlay">
        {children}
      </body>
    </html>
  )
}
