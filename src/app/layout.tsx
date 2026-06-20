import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Vertex — Discord Security",
  description: "Antinuke and antiraid protection for Discord servers.",
  metadataBase: new URL("https://vtebot.xyz"),
  openGraph: {
    title: "Vertex",
    description: "Antinuke and antiraid protection for Discord servers.",
    url: "https://vtebot.xyz",
    siteName: "Vertex",
    type: "website",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <Providers session={session}>
          <Nav />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
