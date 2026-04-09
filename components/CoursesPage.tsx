"use client";

import { useEffect, useState } from "react";
import styles from "./CoursesPage.module.css";
// ✅ removed unused import

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

// ✅ matches exact Strapi field names
interface Course {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  level: string;
  category: string;         // ✅ lowercase
  instuctor: string | null; // ✅ matches Strapi typo
  duration: string;
  students: number;
  rating: number;
  badge: string | null;
  topics: string[];
  ispublic: boolean;
  price: number;
  is_featured: boolean | null;
}

// ✅ matches exact Strapi field names
interface HeroData {
  Hero_Heading: string;
  hero_Subheading: string;
  herodescription: string;
  heroctalable: string;
  statStudent: string;
  staprojects: string;
  staCourses: string;
  statrating: number;
  heroimage: { url: string }[];
  larningpath: {
    id: number;
    title: string;
    routepath: {
      id: number;
      title: string;
    }[];
  }[];
}

export default function CoursesPage() {
  const [hero, setHero] = useState<HeroData | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selected, setSelected] = useState<Course | null>(null);

 useEffect(() => {
  Promise.all([
    fetch(`${STRAPI_URL}/api/courses-page`).then((r) => r.json()), // ✅ no populate needed
    fetch(`${STRAPI_URL}/api/coursespages`).then((r) => r.json()),
  ])
    .then(([pageRes, coursesRes]) => {
      setHero(pageRes.data);
      setCourses(coursesRes.data);
      setSelected(coursesRes.data[0]);
    })
    .catch((err) => console.error("Fetch error:", err));
}, []);

  if (!hero || courses.length === 0) return <p>Loading...</p>;

  return (
    <div>
      <section
        className={styles.hero}
        style={{
          // ✅ heroimage is array
          backgroundImage: hero.heroimage?.[0]?.url
            ? `url(${STRAPI_URL}${hero.heroimage[0].url})`
            : undefined,
        }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          {/* ✅ all correct field names */}
          <h1 className={styles.heroTitle}>{hero.Hero_Heading}</h1>
          <h2 className={styles.heroSubtitle}>{hero.hero_Subheading}</h2>
          <p className={styles.heroDescription}>{hero.herodescription}</p>
          <div className={styles.stats}>
            <div>
              <strong>{hero.staCourses}</strong>
              <span>Courses</span>
            </div>
            <div>
              <strong>{hero.statStudent}</strong>
              <span>Students</span>
            </div>
            <div>
              <strong>{hero.staprojects}</strong>
              <span>Projects</span>
            </div>
            <div>
              <strong>{hero.statrating}⭐</strong>
              <span>Rating</span>
            </div>
          </div>
          <button className={styles.ctaBtn}>{hero.heroctalable}</button>
        </div>
      </section>
      {/* LEARNING PATH SECTION */}
{hero.larningpath?.length > 0 && (
  <section className={styles.learningPath}>
    <h2>{hero.larningpath[0].title}</h2>
    <div className={styles.routepath}>
      {hero.larningpath[0].routepath.map((step, index) => (
        <div key={step.id} className={styles.routeStep}>
        
          <span className={styles.stepTitle}>{step.title}</span>
          {/* arrow between steps */}
          {index < hero.larningpath[0].routepath.length - 1 && (
            <span className={styles.arrow}>→</span>
          )}
        </div>
      ))}
    </div>
  </section>
)}

      {/* COURSES SECTION */}
      <section className={styles.coursesSection}>
        {/* LEFT — course list */}
        <div className={styles.sidebar}>
          {courses.map((course) => (
            <div
              key={course.id}
              className={`${styles.card} ${selected?.id === course.id ? styles.active : ""}`}
              onClick={() => setSelected(course)}
            >
              <div className={styles.cardTop}>
                {/* ✅ lowercase category */}
                <span className={styles.category}>{course.category}</span>
                {course.badge && (
                  <span className={styles.badge}>{course.badge}</span>
                )}
              </div>
              <h3>{course.title}</h3>
              <div className={styles.cardMeta}>
                <span>{course.level}</span>
                <span>{course.duration}</span>
                <span>👥 {course.students}</span>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT — course detail */}
        {selected && (
          <div className={styles.detail}>
            <div className={styles.detailHeader}>
              {/* ✅ lowercase category */}
              <span className={styles.category}>{selected.category}</span>
              {selected.badge && (
                <span className={styles.badge}>{selected.badge}</span>
              )}
            </div>
            <h2>{selected.title}</h2>
            <p>{selected.description}</p>
            <div className={styles.detailMeta}>
              <span>📊 {selected.level}</span>
              <span>⏱ {selected.duration}</span>
              <span>👥 {selected.students} students</span>
                <span>{selected.price === 0 ? "🆓 Free" : `💰 ₹${selected.price}`}</span>

              <span>⭐ {selected.rating}</span>
            </div>
            <h4>What you'll learn</h4>
            <ul className={styles.topics}>
              {selected.topics?.map((topic, i) => (
                <li key={i}>✅ {topic}</li>
              ))}
            </ul>
            <button className={styles.enrollBtn}>Enroll Now →</button>
          </div>
        )}
      </section>
    </div>
  );
}