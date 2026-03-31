"use client";

import Link from "next/link";

const STRAPI_URL = "http://localhost:1337";

interface CourseCard {
  id: number;
  name: string;
  lessons: number;
  students: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  rating: number;
  course_btn: string;
  courese_url: string;
  thumbnail: { url: string; alternativeText: string | null } | null;
}

interface TopCoursesData {
  __component: "section.top-courses";
  id: number;
  title: string;
  subtitle: string;
  coursecard: CourseCard[];
}

const LEVEL_COLORS: Record<string, string> = {
  Beginner: "#10b981",
  Intermediate: "#f59e0b",
  Advanced: "#ef4444",
};

export default function TopCourses({ data }: { data: TopCoursesData }) {
  return (
    <section style={{ padding: "60px clamp(16px, 6vw, 80px)", backgroundColor: "#e5e7eb" }}>

      {/* Header */}
      <div className="text-center mb-5">
        <h2 className="fw-bold mb-2" style={{ color: "#5C44D8" }}>{data.title}</h2>
        <p className="text-secondary mb-0" style={{ maxWidth: 560, margin: "0 auto" }}>
          {data.subtitle}
        </p>
      </div>

      {/* Cards */}
      <div className="row g-4 justify-content-center">
        {data.coursecard.map((card) => (
          <div key={card.id} className="col-sm-6 col-lg-4">
            <div
              className="h-100 rounded-4 d-flex flex-column overflow-hidden"
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
              {/* Thumbnail */}
              <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
                {card.thumbnail?.url ? (
                  <img
                    src={`${STRAPI_URL}${card.thumbnail.url}`}
                    alt={card.thumbnail.alternativeText || card.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%", height: "100%",
                      background: "linear-gradient(135deg, #5C44D8, #a855f7)",
                      display: "flex", alignItems: "center",
                      justifyContent: "center", color: "#fff", fontSize: 14,
                    }}
                  >
                    No Image
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-3 d-flex flex-column flex-grow-1">
                {/* Title */}
                <h6
                  className="fw-bold mb-3"
                  style={{
                    fontSize: 14, lineHeight: 1.4,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {card.name}
                </h6>

                {/* Meta: lessons, students, level */}
                <div
                  className="d-flex align-items-center gap-3 mb-3"
                  style={{ fontSize: 12, color: "#6b7280" }}
                >
                  <span>🖥 Lesson: {card.lessons}</span>
                  <span>👤 Student: {card.students}</span>
                  <span style={{ color: LEVEL_COLORS[card.level] }}>
                    🏆 {card.level}
                  </span>
                </div>

                {/* Button + Rating */}
                <div className="d-flex align-items-center justify-content-between mt-auto">
                  <Link
                    href={card.courese_url}
                    className="btn rounded-pill px-3 py-1 text-decoration-none"
                    style={{
                      background: "linear-gradient(135deg, #5C44D8, #a855f7)",
                      color: "#fff",
                      fontSize: 13,
                      border: "none",
                    }}
                  >
                    {card.course_btn} →
                  </Link>
                  <div
                    className="d-flex align-items-center gap-1 rounded-pill px-2 py-1"
                    style={{
                      backgroundColor: "#fef9c3",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#92400e",
                    }}
                  >
                    {card.rating} <span style={{ color: "#f59e0b" }}>★</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}