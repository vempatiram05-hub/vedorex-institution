"use client";

import Link from "next/link";

const STRAPI_URL = "http://localhost:1337";

interface FeatureCard {
  id: number;
  name: string;
  description: string;
  duration: string;
  link_label: string;
  link_url: string;
  icon: { url: string; alternativeText: string | null } | null;
}

interface WhyChooseUsData {
  __component: "section.why-choose-us";
  id: number;
  title: string;
  subtitle: string;
  featurecard: FeatureCard[];
}

export default function WhyChooseUs({ data }: { data: WhyChooseUsData }) {
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
        {/* Header */}
        <div className=" mb-5">
          <h2 className="fw-bold mb-2" style={{ color: "#5C44D8" }}>{data.title}</h2>
          <p className="text-secondary mb-0">{data.subtitle}</p>
        </div>

        {/* Cards */}
        <div className="row g-4 justify-content-center">
          {data.featurecard.map((card) => (
            <div key={card.id} className="col-sm-6 col-lg-3">
              <div
                className="h-100 p-4 rounded-4 d-flex flex-column justify-content-center align-items-center text-center"
                style={{
                  backgroundColor: "#fff",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(92,68,216,0.15)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)";
                }}
              >
                {/* Icon */}
                <div
                  className="mb-3 d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: 60, height: 60,
                    background: "linear-gradient(135deg, #5C44D8, #a855f7)",
                    flexShrink: 0,
                  }}
                >
                  {card.icon?.url ? (
                    <img
                      src={`${STRAPI_URL}${card.icon.url}`}
                      alt={card.icon.alternativeText || card.name}
                      width={30}
                      height={30}
                      style={{
                        objectFit: "contain",
                        filter: "brightness(0) invert(1)",
                      }}
                    />
                  ) : (
                    <span style={{ color: "#fff", fontSize: 22 }}>★</span>
                  )}
                </div>

                {/* Name */}
                <h5 className="fw-bold mb-2">{card.name}</h5>

                {/* Description */}
                <p
                  className="text-secondary mb-4"
                  style={{ fontSize: 14, lineHeight: 1.6, flexGrow: 1 }}
                >
                  {card.description}
                </p>

                {/* Footer: duration + link */}
                <div className="d-flex flex-row gap-5">

                  {/* Duration - separate div */}
                  <div>
                    <span style={{ fontSize: 13, color: "#5C44D8", fontWeight: 600 }}>
                      {card.duration}
                    </span>
                  </div>

                  {/* Link - separate div */}
                  <div>
                    <Link
                      href={card.link_url}
                      className="text-decoration-none d-flex align-items-center gap-1"
                      style={{ fontSize: 13, color: "#5C44D8", fontWeight: 600 }}
                    >
                      {card.link_label} <span>→</span>
                    </Link>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section >
  );
}