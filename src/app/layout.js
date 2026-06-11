import "./globals.css";

export const metadata = {
  title: "Design X Interior | Premium Luxury & Minimalist Interior Design",
  description: "Design X Interior is a premium luxury interior design studio specializing in modern, minimalist, and elegant residential, commercial, and turnkey design projects.",
  keywords: "luxury interior design, modern luxury design, minimalist home interiors, high-end residential interior, premium commercial interior, modular kitchen, bespoke furniture, Design X Interior",
  authors: [{ name: "Design X Interior" }],
  openGraph: {
    title: "Design X Interior | Premium Luxury Interior Design Studio",
    description: "Crafting timeless luxury interiors with a modern minimalist aesthetic. Explore our residential, commercial, and turnkey projects.",
    type: "website",
    url: "https://designxinterior.com",
    images: [
      {
        url: "/images/hero_luxury_living.png",
        width: 1200,
        height: 630,
        alt: "Design X Interior Luxury Living Room",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Design X Interior | Premium Luxury Interior Design Studio",
    description: "Crafting timeless luxury interiors with a modern minimalist aesthetic. Explore our residential, commercial, and turnkey projects.",
    images: ["/images/hero_luxury_living.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* FontAwesome Icon Library */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
