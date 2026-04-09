"use client";

import Link from "next/link";
import Image from "next/image";

const STRAPI_URL = "http://localhost:1337";

interface Icon {
  url: string;
  alternativeText: string | null;
}

interface CategoryCard {
  id: number;
  name: string;
  description: string;
  stat_lable_price: string;
  stat_url: string;
  icon: Icon;
}

interface CourseCategoriesData {
  __component: "section.course-categories";
  id: number;
  title: string;
  subtitle: string;
  CategoryCard: CategoryCard[];
}

export default function CourseCategories({
  data,
}: {
  data: CourseCategoriesData;
}) {
  return (
    <section>
      <div
        style={{
          padding: "20px clamp(16px, 4vw, 50px)",
          maxWidth: "1920px",
          margin: "0 auto",
          boxSizing: "border-box",
          backgroundColor: "#d1d5db",
        }}
      >
        {/* Header */}
        <div className=" mb-5">
          <h2 className="fw-bold mb-2" style={{ color: "#5C44D8" }}>
            {data.title}
          </h2>
          <p className="text-secondary mb-0">{data.subtitle}</p>
        </div>

        {/* Cards */}
        <div className="row g-4 justify-content-center">
          {data.CategoryCard.map((card) => (
            <div key={card.id} className="col-sm-6 col-lg-3">
              <div
                className="h-100 p-4 rounded-4 d-flex flex-column"
                style={{ backgroundColor: "#fff",  }}
              
                 
              >
                {/* Icon */}
                <div
                  className="mb-3 d-flex align-items-center justify-content-center rounded-3"
                  style={{
                    width: 52,
                    height: 52,
                    background: "linear-gradient(135deg, #5C44D8, #a855f7)",
                    flexShrink: 0,
                  }}
                >
<img
  src={
    card.icon?.url
      ? `${STRAPI_URL}${card.icon.url}`
      : "https://img.icons8.com/pastel-glyph/64/FFFFFF/code--v1.png"
  }
  width={30}
  height={30}
/>             </div>

                {/* Name */}
                <h5 className="fw-bold mb-2">{card.name}</h5>

                {/* Description */}
                <p
                  className="text-secondary mb-4"
                  style={{ fontSize: 14, lineHeight: 1.6, flexGrow: 1 }}
                >
                  {card.description}
                </p>

                {/* Stat link */}
                <Link
                  href={card.stat_url}
                  className="d-flex align-items-center justify-content-between rounded-3 px-3 py-2 text-decoration-none"
                  style={{
                    backgroundColor: "#d1d5db",
                    color: "#5C44D8",
                    fontSize: 14,
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <span>{card.stat_lable_price}</span>
                  <span style={{ color: "#5C44D8", fontWeight: 600 }}>›</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
