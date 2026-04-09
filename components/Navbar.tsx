"use client"; // keep this only for scroll effect

import { useState, useEffect } from "react";
import Link from "next/link";
import { link } from "fs/promises";

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

// ✅ Receive data as prop instead of fetching
export default function Navbar({ data }: { data: NavbarData }) {
  const [scrolled, setScrolled] = useState(false);
  const STRAPI_URL = "http://localhost:1337";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const normalizeUrl = (url: string) => {
    if (!url) return "/";

    const clean = url.trim().toLowerCase();

    const routeMap: any = {
      "/home-page": "/",
      "/about-us": "/about",
      "/contact-us": "/contact",
      "/courses": "/CoursesPage",
    };

    return routeMap[clean] || clean;
  };

  if (!data) return null;

  return (
    <nav
      className={`navbar navbar-expand-lg sticky-top ${scrolled ? "shadow" : ""}`}
      style={{ transition: "box-shadow 0.3s ease", backgroundColor: "#e5e7eb" }}
    >
      <div
        className="container-fluid"
        style={{
          padding: "0 clamp(16px, 4vw, 50px)",
          maxWidth: "1920px",
          margin: "0 auto",
          backgroundColor: "#e5e7eb",
        }}
      >
        {/* Logo */}
        <Link href="/" className="navbar-brand">
          {data.logo?.url && (
            <img
              src={`${STRAPI_URL}${data.logo.url}`}
              alt={data.logo.alternativeText || "Logo"}
              style={{ width: "150px", height: "70px", objectFit: "contain" }}
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
          <ul
            className="navbar-nav ms-auto align-items-center"
            style={{ gap: "8px" }}
          >
            {data.nav_links?.map((link) => {
              console.log("URL:", link.url);
              console.log("Normalized:", normalizeUrl(link.url));

              return (
                <li className="nav-item" key={link.id}>
                  {link.isButton ? (
                    <Link
                      href={link.url ? normalizeUrl(link.url) : "#"}
                      className="btn rounded-pill text-white px-4 py-2"
                      style={{
                        background: "linear-gradient(135deg, #5C44D8, #a855f7)",
                        border: "none",
                      }}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <Link href={normalizeUrl(link.url)} className="nav-link">
                      {link.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
