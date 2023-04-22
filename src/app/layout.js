import './globals.css'

export const metadata = {
  title: 'ResearchReader',
  description: 'An app for reading and annotating research papers online',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
