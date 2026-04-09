// app/layout.tsx
import Script from "next/script";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

async function getNavbarData() {
  const res = await fetch("http://localhost:1337/api/navbar?populate=*", {
    cache: "no-store",
  });
  const json = await res.json();
  return json.data;
}

// ✅ Add this
async function getFooterData() {
  const res = await fetch("http://localhost:1337/api/footer?populate=*", {
    cache: "no-store",
  });
  const json = await res.json();
  return json.data;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navbarData = await getNavbarData();
  const footerData = await getFooterData(); // ✅ fetch footer data

  return (
    <html lang="en">
      <body className={nunito.className}>
        <Navbar data={navbarData} />
        {children}
        <Footer data={footerData} /> {/* ✅ pass data */}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}