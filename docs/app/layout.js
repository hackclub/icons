import "./globals.css";

export const metadata = {
  title: "@hackclub/icons",
  description:
    "Hack Club's iconset as React components, published on npm as @hackclub/icons.",
  metadataBase: new URL("https://icons.hackclub.com"),
  openGraph: {
    title: "@hackclub/icons",
    description:
      "Hack Club's iconset as React components, published on npm as @hackclub/icons.",
    url: "https://icons.hackclub.com",
    siteName: "@hackclub/icons",
    type: "website",
  },
  twitter: {
    title: "@hackclub/icons",
    description:
      "Hack Club's iconset as React components, published on npm as @hackclub/icons.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
