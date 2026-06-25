import Products from '@/components/home/Products';
import React from 'react';

export const metadata = {
  metadataBase: new URL("https://hero-kidz-seven-theta.vercel.app/"),

  title: {
    default: "Kids Learning Toys - Educational Toys for Smart Learning",
    template: "%s | Kids Learning Toys",
  },

  description:
    "Discover educational toys, learning boards, puzzles, STEM kits, Montessori toys, and creative learning products designed to make learning fun and engaging for children.",

  keywords: [
    "Educational Toys",
    "Learning Toys",
    "Kids Learning Board",
    "Montessori Toys",
    "STEM Toys",
    "Math Learning Toys",
    "Puzzle Toys",
    "Children Education",
    "Kids Toy Shop Bangladesh",
    "Learning Through Play",
  ],

  authors: [
    {
      name: "Mehedi Hasan",
    },
  ],

  creator: "Mehedi Hasan",
  publisher: "Kids Learning Toys",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Kids Learning Toys - Educational Toys for Smart Learning",
    description:
      "Shop educational toys, learning boards, puzzles, and STEM kits that help children learn while having fun.",
    url: "https://hero-kidz-seven-theta.vercel.app/",
    siteName: "Kids Learning Toys",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kids Learning Toys",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Kids Learning Toys",
    description:
      "Educational toys, puzzles, STEM kits, and learning boards for children.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },

  category: "E-Commerce",
};


const ProductPage = () => {
    return (
        <div>
            <Products/>
        </div>
    );
};

export default ProductPage;