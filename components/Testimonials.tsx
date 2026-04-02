"use client";

import { useEffect } from "react";

const STRAPI_URL = "http://localhost:1337";

interface TestimonialCard {
  id: number;
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatar: { url: string; alternativeText: string | null } | null;
}

interface TestimonialsData {
  __component: "section.testimonials";
  id: number;
  title: string;
  TestimonialsCard: TestimonialCard[];
}

export default function Testimonials({ data }: { data: TestimonialsData }) {

  useEffect(() => {
    if (typeof window !== "undefined") {
      const interval = setInterval(() => {
        if ((window as any).bootstrap) {
          const el = document.getElementById("testimonialsCarousel");
          if (el) {
            const existing = (window as any).bootstrap.Carousel.getInstance(el);
            if (existing) existing.dispose();
            new (window as any).bootstrap.Carousel(el, {
              interval: 5000,
              ride: "carousel",
              wrap: true,
              pause: "hover",
            });
          }
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, []);

  // Group cards into chunks of 3
  const chunks = [];
  for (let i = 0; i < data.TestimonialsCard.length; i += 3) {
    chunks.push(data.TestimonialsCard.slice(i, i + 3));
  }

  return (
    <section>
      <div
        style={{
          maxWidth: "1920px",
          margin: "0 auto",
          width: "100%",
          overflow: "hidden",
          boxSizing: "border-box",
          backgroundColor: "#d1d5db",
          padding: "20px clamp(16px, 4vw, 50px)",
        }}
      >
        {/* Title */}
        <div className="mb-5">
          <h2 className="fw-bold" style={{ color: "#5C44D8" }}>{data.title}</h2>
        </div>

        {/* Carousel */}
        <div
          id="testimonialsCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="5000"
        >
          {/* Indicators */}
          {chunks.length > 1 && (
            <div className="carousel-indicators" style={{ bottom: "-40px" }}>
              {chunks.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  data-bs-target="#testimonialsCarousel"
                  data-bs-slide-to={i}
                  className={i === 0 ? "active" : ""}
                  style={{
                    width: 8, height: 8,
                    borderRadius: "50%",
                    backgroundColor: "#5C44D8",
                    border: "none",
                    opacity: i === 0 ? 1 : 0.3,
                  }}
                />
              ))}
            </div>
          )}

          {/* Slides - 3 cards per slide inside ONE big card */}
          <div className="carousel-inner pb-5">
            {chunks.map((chunk, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                {/* ✅ Single outer card wrapping all 3 */}
                <div
                  className="rounded-4 p-4"
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid rgba(92,68,216,0.2)",
                    boxShadow: "0 4px 24px rgba(92,68,216,0.08)",
                  }}
                >
                  <div className="row g-0">
                    {chunk.map((card, cardIndex) => (
                      <div
                        key={card.id}
                        className="col-lg-4"
                        style={{
                          // ✅ Divider between cards
                          borderRight: cardIndex < chunk.length - 1
                            ? "1px solid rgba(92,68,216,0.15)"
                            : "none",
                          padding: "0 24px",
                        }}
                      >
                        <div className="text-center h-100 d-flex flex-column">

                          {/* Avatar */}
                          <div className="d-flex justify-content-center mb-3">
                            {card.avatar?.url ? (
                              <img
                                src={`${STRAPI_URL}${card.avatar.url}`}
                                alt={card.avatar.alternativeText || card.name}
                                width={72}
                                height={72}
                                style={{
                                  borderRadius: "50%",
                                  objectFit: "cover",
                                  border: "3px solid #5C44D8",
                                }}
                              />
                            ) : (
                              <div
                                style={{
                                  width: 72, height: 72,
                                  borderRadius: "50%",
                                  background: "linear-gradient(135deg, #5C44D8, #a855f7)",
                                  display: "flex", alignItems: "center",
                                  justifyContent: "center",
                                  color: "#fff", fontSize: 24, fontWeight: 700,
                                }}
                              >
                                {card.name.charAt(0)}
                              </div>
                            )}
                          </div>

                          {/* Stars */}
                          <div className="mb-3">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span
                                key={i}
                                style={{
                                  color: i < card.rating ? "#f59e0b" : "#d1d5db",
                                  fontSize: 20,
                                }}
                              >
                                ★
                              </span>
                            ))}
                          </div>

                          {/* Quote */}
                          <p
                            className="mb-4 flex-grow-1"
                            style={{
                              fontSize: 14, lineHeight: 1.8,
                              color: "#374151", fontStyle: "italic",
                            }}
                          >
                            "{card.quote}"
                          </p>

                          {/* Name & Role */}
                          <p className="fw-bold mb-1" style={{ color: "#111827" }}>
                            {card.name}
                          </p>
                          <p className="text-secondary mb-0" style={{ fontSize: 13 }}>
                            {card.role}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Prev / Next */}
          {chunks.length > 1 && (
            <>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#testimonialsCarousel"
                data-bs-slide="prev"
                style={{ width: 40, left: "-50px" }}
              >
                <span
                  className="carousel-control-prev-icon"
                  style={{ filter: "invert(30%) sepia(80%) saturate(500%) hue-rotate(220deg)" }}
                />
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#testimonialsCarousel"
                data-bs-slide="next"
                style={{ width: 40, right: "-50px" }}
              >
                <span
                  className="carousel-control-next-icon"
                  style={{ filter: "invert(30%) sepia(80%) saturate(500%) hue-rotate(220deg)" }}
                />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}