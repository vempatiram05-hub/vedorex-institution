"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";  // ← add this

interface NavLink {
  id: number;
  label: string;
  url: string;
  isButton: boolean;
}

interface Logo {
  url: string;
  width: number;
  height: number;
  alternativeText: string | null;
}

interface NavbarData {
  logo: Logo;
  nav_links: NavLink[];
}

async function getNavbarData(): Promise<NavbarData> {
  const res = await fetch("http://localhost:1337/api/navbar?populate=*", {
    cache: "no-store",
  });
  const json = await res.json();
  return json.data;
}


export default function Navbar() {
  const [navbar, setNavbar] = useState<NavbarData | null>(null);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  

  useEffect(() => {
    getNavbarData()
      .then(setNavbar)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const STRAPI_URL = "http://localhost:1337";

  if (loading) {
    return (
      <nav className="navbar navbar-expand-lg navbar-light sticky-top" 
             style={{ backgroundColor: "#e5e7eb" }}
             >

        <div className="container px-4">
          <span className="navbar-brand placeholder-glow">
            <span className="placeholder col-4"></span>
          </span>
        </div>
      </nav>
    );
  }

  if (!navbar) return null;

  return (
    <nav
      className={`navbar navbar-expand-lg  sticky-top ${scrolled ? "shadow" : ""}`}
      style={{
        transition: " box-shadow 0.3s ease",
        backgroundColor: "#e5e7eb",
      }}
    >
      <div
        className="container-fluid"
        style={{
          padding: "0 clamp(16px, 4vw, 50px)",
          maxWidth: "1920px",
          margin: "0 auto",
           backgroundColor: "#e5e7eb"
        }}
      >
        {/* Logo */}
        <Link href="/" className="navbar-brand">
          {navbar.logo?.url && (
            <img
              src={`${STRAPI_URL}${navbar.logo.url}`}
              alt={navbar.logo.alternativeText || "Logo"}
              style={{ width: "150px", height: "40px", objectFit: "contain" }}
            />
          )}
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center" style={{ gap: "8px" }}>
            {navbar.nav_links.map((link) => (
              <li className="nav-item" key={link.id}>
                {link.isButton ? (
                  <Link
                    href={link.url}
                    className="btn btn-primary rounded-pill"
                    style={{ padding: "8px 24px" }}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <Link
                    href={link.url}
                    className="nav-link"
                    style={{ padding: "8px 16px" }}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

      </div>
    </nav>
  );
}