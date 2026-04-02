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
          <h2 className="fw-bold mb-2" style={{ color: "#5C44D8" }}>
            {data.title}
          </h2>
          <p className="text-secondary mb-0" style={{  margin: "0 auto" }}>
            {data.subtitle}
          </p>
        </div>

        {/* Cards */}
        <div className="row g-4 justify-content-center py-2">
          {data.coursecard.map((card) => {
            const circumference = 2 * Math.PI * 45;
            const strokeDasharray = `${(card.rating / 5) * circumference} ${circumference}`;

            return (
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
                        style={{ width: "100%", height: "100%", objectFit: "cover", padding: "10px" }}
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
                  <div className="p-3 d-flex flex-column grow py-1">

                    {/* Title */}
                    <h6
                      className="fw-bold mb-3"
                      style={{
                        fontSize: 15, lineHeight: 1.5,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {card.name}
                    </h6>

                    {/* Meta */}
                    <div
                      className="d-flex align-items-center gap-5 mb-3"
                      style={{ fontSize: 12, color: "#6b7280" }}
                    >
                      <span>🖥 Lesson: {card.lessons}</span>
                      <span>👤 Student: {card.students}</span>
                      <span style={{ color: LEVEL_COLORS[card.level] }}>
                        🏆 {card.level}
                      </span>
                    </div>

                    {/* Button + Rating */}
                    <div className="d-flex align-items-center justify-content-between mt-auto gap-2">

                      {/* Button */}
                      <Link
                        href={card.courese_url}
                        className="btn rounded text-decoration-none  d-flex align-items-center justify-content-between px-4"
                        style={{
                          background: "linear-gradient(80deg, #5C44D8, #a855f7)",
                          color: "#fff",
                          fontSize: 13,
                          border: "none",
                          padding: "10px 16px",
                          gap: 8,
                        }}
                      >
                        <span>{card.course_btn}</span>
                        <span style={{ fontSize: 16 }}>&#8250;</span>
                      </Link>

                      {/* Rating Circle with glow */}
                      <div style={{
                        position: "relative",
                        width: "70px",
                        height: "70px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}>
                        {/* Yellow glow background */}
                        <div style={{
                          position: "absolute",
                          width: "54px",
                          height: "54px",
                          borderRadius: "50%",
                          backgroundColor: "#fef9c3",
                        }} />

                        <svg
                          style={{ position: "absolute", width: "100%", height: "100%", transform: "rotate(-90deg)" }}
                          viewBox="0 0 100 100"
                        >
                          <circle cx="50" cy="50" r="40" fill="none" stroke="#fde68a" strokeWidth="6" />
                          <defs>
                            <linearGradient id={`grad-${card.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                              <stop offset="0%" stopColor="#fde5d0" />
                              <stop offset="100%" stopColor="#f9a825" />
                            </linearGradient>
                          </defs>
                          <circle
                            cx="50" cy="50" r="40"
                            fill="none"
                            stroke={`url(#grad-${card.id})`}
                            strokeWidth="6"
                            strokeLinecap="round"
                            strokeDasharray={strokeDasharray}
                          />
                        </svg>

                        {/* Number */}
                        <span style={{ fontSize: "16px", fontWeight: "700", color: "#111", zIndex: 1 }}>
                          {card.rating}
                        </span>
                        {/* Star */}
                        <div style={{ position: "absolute", top: "2px", right: "0px" }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="#f9a825">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}