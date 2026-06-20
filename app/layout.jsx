import { Analytics } from '@vercel/analytics/react'

export const metadata = {
  title: 'Vertex — Discord Security',
  description: 'Antinuke, antiraid, and moderation infrastructure for Discord servers.',
  icons: { icon: '/vertex.png' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}