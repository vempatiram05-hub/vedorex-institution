"use client";

import { useEffect } from "react";
import Link from "next/link";

const STRAPI_URL = "http://localhost:1337";

interface Stat {
  id: number;
  number: string;
  label: string;
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

interface HeroSliderData {
  __component: "section.hero-slider";
  slider: Slide[];
}

export default function HeroSlider({ data }: { data: HeroSliderData }) {

  useEffect(() => {
    if (typeof window !== "undefined") {
      const interval = setInterval(() => {
        if ((window as any).bootstrap) {
          const carouselEl = document.getElementById("heroCarousel");
          if (carouselEl) {
            const existing = (window as any).bootstrap.Carousel.getInstance(carouselEl);
            if (existing) existing.dispose();

            const carousel = new (window as any).bootstrap.Carousel(carouselEl, {
              interval: 4000,
              ride: "carousel",
              wrap: true,
              pause: "hover",
            });

            carouselEl.addEventListener("mouseenter", () => carousel.pause());
            carouselEl.addEventListener("mouseleave", () => carousel.cycle());
          }
          clearInterval(interval);
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, []);

  return (
    <section>
      <div
        style={{
          maxWidth: "1920px",
          margin: "0 auto",
          width: "100%",
          overflow: "hidden",
          boxSizing: "border-box",
          backgroundColor: "#cbcbcb",
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
            {data.slider.map((_, index) => (
              <button
                key={index}
                type="button"
                data-bs-target="#heroCarousel"
                data-bs-slide-to={index}
                className={index === 0 ? "active" : ""}
                aria-current={index === 0 ? "true" : undefined}
                style={{
                  width: "12px",          // ✅ equal width & height = circle
                  height: "12px",
                  borderRadius: "50%",    // ✅ makes it round
                  backgroundColor: "#fff",
                  border: "none",
                  opacity: index === 0 ? "1" : "0.5",  // active = full, inactive = faded
                  transition: "opacity 0.3s ease",
                }}
              />
            ))}
          </div>

          {/* Slides */}
          <div className="carousel-inner">
            {data.slider.map((slide, index) => (
              <div
                key={slide.id}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <div
                  style={{
                    padding: "30px clamp(16px, 6vw, 50px)",
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Decorative bubbles */}
                  <div style={{
                    position: "absolute", borderRadius: "50%",
                    width: 320, height: 320,
                    background: "rgba(92, 68, 216, 0.12)",
                    top: "-80px", left: "-60px",
                    pointerEvents: "none",
                  }} />
                  <div style={{
                    position: "absolute", borderRadius: "50%",
                    width: 200, height: 200,
                    background: "rgba(168, 85, 247, 0.1)",
                    top: "20px", left: "180px",
                    pointerEvents: "none",
                  }} />
                  <div style={{
                    position: "absolute", borderRadius: "50%",
                    width: 150, height: 150,
                    background: "rgba(92, 68, 216, 0.08)",
                    bottom: "-40px", left: "30%",
                    pointerEvents: "none",
                  }} />
                  <div style={{
                    position: "absolute", borderRadius: "50%",
                    width: 250, height: 250,
                    background: "rgba(168, 85, 247, 0.07)",
                    bottom: "-60px", right: "-40px",
                    pointerEvents: "none",
                  }} />

                  <div className="row align-items-center w-100 g-3" style={{ position: "relative", zIndex: 1 }}>

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
                              maxHeight: "350px",
                              objectFit: "cover",
                              width: "100%",
                              display: "block",
                            }}
                          />
                          {slide.stats.length > 0 && (
                            <div
                              className="position-absolute bottom-0 start-0 end-0 d-flex"
                              style={{
                                background: "rgba(30, 20, 60, 0.92)",
                                borderTop: "1px solid rgba(168, 85, 247, 0.3)",
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
                                  <div className="fw-bold text-white" style={{ fontSize: "22px" }}>
                                    {stat.number}
                                  </div>
                                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.8)" }}>
                                    {stat.label}
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
          <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev"
            style={{
              position: "absolute",
              top: "50%",
              left: "12px",
              transform: "translateY(-50%)",
              width: "48px",
              height: "48px",
              backgroundColor: "rgba(0,0,0,0.4)",
              borderRadius: "50%",

            }}>
            <span className="carousel-control-prev-icon" />
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next"
            style={{
              position: "absolute",
              top: "50%",
              right: "12px",
              left: "auto",
              transform: "translateY(-50%)",
              width: "48px",
              height: "48px",
              backgroundColor: "rgba(0,0,0,0.4)",
              borderRadius: "50%",
            }}>
            <span className="carousel-control-next-icon" />
          </button>

        </div>
      </div>
    </section>
  );
}