"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface NavLink {
  id: number;
  label: string;
  url: string;
  isExternal: boolean;
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
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: "#ffffff" }}
      >
        {" "}
        <div className="container">
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
      className={`navbar navbar-expand-lg bg-light sticky-top ${
        scrolled ? "py-1 shadow-lg" : "py-3"
      }`}
      data-bs-theme="light"
      style={{ transition: "padding 0.3s ease, box-shadow 0.3s ease" }}
    >
      <div className="container">
        <Link href="/" className="navbar-brand">
          {navbar.logo?.url && (
            <img
              src={`${STRAPI_URL}${navbar.logo.url}`}
              alt="Logo"
              style={{ width: "150px", height: "40px", objectFit: "contain" }}
            />
          )}
        </Link>

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

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-2">
            {navbar.nav_links.map((link) => (
              <li className="nav-item" key={link.id}>
                <Link
                  href={link.url}
                  className={
                    link.isButton
                      ? "btn btn-primary rounded-pill px-4"
                      : "nav-link px-3"
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
