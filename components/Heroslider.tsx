"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STRAPI_URL = "http://localhost:1337";

interface Stat {
  id: number;
  number: string;
  lable: string;
}

interface Slide {
  id: number;
  title: string;
  highlighted_text: string;
  description: string;
  primary_btn_label: string;
  primary_btn_url: string;
  secondary_btn_label: string;
  secondary_btn_url: string;
  image: {
    url: string;
    alternativeText: string | null;
  };
  stats: Stat[];
}

interface HeroSlider {
  __component: "section.hero-slider";
  slider: Slide[];
}

async function getHeroData(): Promise<HeroSlider> {
  const res = await fetch("http://localhost:1337/api/home-page", {
    cache: "no-store",
  });
  const json = await res.json();
  const sections = json.data.sections;
  return sections.find((s: any) => s.__component === "section.hero-slider");
}

export default function HeroSlider() {
  const [hero, setHero] = useState<HeroSlider | null>(null);

  useEffect(() => {
    getHeroData().then(setHero);
  }, []);

 useEffect(() => {
  if (hero && typeof window !== "undefined") {
    const interval = setInterval(() => {
      if ((window as any).bootstrap) {
        const carouselEl = document.getElementById("heroCarousel");
        if (carouselEl) {
          // Destroy existing instance first
          const existing = (window as any).bootstrap.Carousel.getInstance(carouselEl);
          if (existing) existing.dispose();

          // Create new instance
          const carousel = new (window as any).bootstrap.Carousel(carouselEl, {
            interval: 4000,
            ride: "carousel",
            wrap: true,
            pause: "hover",
          });

          // Hover events
          carouselEl.addEventListener("mouseenter", () => carousel.pause());
          carouselEl.addEventListener("mouseleave", () => carousel.cycle());
        }
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }
}, [hero]);


  if (!hero) return null;

  return (
    <section>
  <div
    style={{
       maxWidth: "1920px",
      margin: "0 auto",
      width: "100%",
      overflow: "hidden",
      boxSizing: "border-box",
                backgroundColor: "#e5e7eb",

    }}
  >
    <div
      id="heroCarousel"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="4000"
    >
        {/* Indicators */}
        <div className="carousel-indicators">
          {hero.slider.map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#heroCarousel"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : undefined}
            />
          ))}
        </div>

        {/* Slides */}
        <div className="carousel-inner">
          {hero.slider.map((slide, index) => (
            <div
              key={slide.id}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
            >
              <div
                style={{
                  padding: "50px clamp(16px, 4vw, 50px)",
                  minHeight: "550px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div className="row align-items-center w-100 g-4">

                  {/* Left Content */}
                  <div className="col-lg-6">
                    <h1
                      className="fw-bold mb-3"
                      style={{ fontSize: "clamp(28px, 4vw, 52px)", lineHeight: "1.2" }}
                    >
                      {slide.title}{" "}
                      <span style={{ color: "#5C44D8" }}>
                        {slide.highlighted_text}
                      </span>
                    </h1>
                    <p
                      className="text-secondary mb-4"
                      style={{ fontSize: "16px", lineHeight: "1.7" }}
                    >
                      {slide.description}
                    </p>
                    <div className="d-flex gap-3 flex-wrap">
                      <Link
                        href={slide.primary_btn_url}
                        className="btn btn-primary rounded-pill px-4 py-2"
                        style={{ backgroundColor: "#5C44D8", border: "none" }}
                      >
                        {slide.primary_btn_label}
                      </Link>
                      <Link
                        href={slide.secondary_btn_url}
                        className="btn btn-outline-secondary rounded-pill px-4 py-2"
                      >
                        {slide.secondary_btn_label}
                      </Link>
                    </div>
                  </div>

                  {/* Right Image with Stats Overlay */}
                  <div className="col-lg-6 text-center">
                    {slide.image?.url && (
                      <div className="position-relative d-inline-block w-100">
                        <img
                          src={`${STRAPI_URL}${slide.image.url}`}
                          alt={slide.image.alternativeText || slide.title}
                          className="img-fluid rounded-4"
                          style={{
                            maxHeight: "400px",
                            objectFit: "cover",
                            width: "100%",
                          }}
                        />

                        {/* Stats overlay on image */}
                        {slide.stats.length > 0 && (
                          <div
                            className="position-absolute bottom-0 start-0 end-0 d-flex"
                            style={{
                              borderRadius: "0 0 16px 16px",
                              overflow: "hidden",
                            }}
                          >
                            {slide.stats.map((stat) => (
                              <div
                                key={stat.id}
                                className="flex-fill text-center py-3"
                                style={{
                                  backgroundColor: "rgba(30, 20, 80, 0.75)",
                                  backdropFilter: "blur(4px)",
                                  borderRight: "1px solid rgba(255,255,255,0.1)",
                                }}
                              >
                                <div
                                  className="fw-bold text-white"
                                  style={{ fontSize: "22px" }}
                                >
                                  {stat.number}
                                </div>
                                <div
                                  style={{
                                    fontSize: "12px",
                                    color: "rgba(255,255,255,0.8)",
                                  }}
                                >
                                  {stat.lable}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" />
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#heroCarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" />
        </button>

      </div>
    </div>
    </section>
  );
}