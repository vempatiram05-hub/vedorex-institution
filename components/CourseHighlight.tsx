import Link from "next/link";

const STRAPI_URL = "http://localhost:1337";

interface Feature {
  id: number;
  label: string;
  icon: {
    url: string;
    alternativeText: string | null;
  };
}

interface CourseHighlightData {
  __component: "section.course-highlight";
  tag: string;
  title: string;
  description: string;
  image: {
    url: string;
    alternativeText: string | null;
  };
  feature: Feature[];
}

export default function CourseHighlight({ data }: { data: CourseHighlightData }) {
  return (
    <section>
      <div
        style={{
          padding: "20px clamp(16px, 4vw, 50px)",
          maxWidth: "1920px",
          margin: "0 auto",
          boxSizing: "border-box",
          backgroundColor: "#e5e7eb",

        }}
      >
        <div className="row align-items-center g-2">

          {/* Left Image */}
          <div className="col-lg-6">
            {data.image?.url && (
              <img
                src={`${STRAPI_URL}${data.image.url}`}
                alt={data.image.alternativeText || data.title}
                className="img-fluid rounded-4"
                style={{ width: "80%", height: "auto", objectFit: "cover", display: "block", margin: "0 auto" }}
              />
            )}
          </div>

          {/* Right Content */}
          <div className="col-lg-6">
            {/* Tag */}
            <p
              className="fw-semibold mb-2"
              style={{ color: "#5C44D8", fontSize: "26px", lineHeight: "1.6" }}
            >
              {data.tag}
            </p>

            {/* Title */}
            <h2 className="fw-bold mb-3" style={{ fontSize: "clamp(24px, 3vw, 36px)" }}>
              {data.title}
            </h2>

            {/* Description */}
            <p className="3" style={{ fontSize: "15px", lineHeight: "1.7" }}>
              {data.description}
            </p>

            {/* Features */}
            <div className="row g-3">
              {data.feature.map((item) => (
                <div className="col-4" key={item.id}>
                  <div
                    className="text-center p-3 rounded-3"
                    style={{
                      backgroundColor: "#e5e7eb",
                      border: "1px solid #fff",
                    }}
                  >
                    {item.icon?.url && (
                      <div
                        className="mx-auto mb-2 d-flex align-items-center justify-content-center rounded-3"
                        style={{
                          width: "42px",
                          height: "42px",
                          backgroundColor: "#f0eeff",
                        }}
                      >
                        <img
                          src={`${STRAPI_URL}${item.icon.url}`}
                          alt={item.label}
                          style={{ width: "28px", height: "28px", objectFit: "contain" }}
                        />
                      </div>
                    )}
                    <p className="mb-0" style={{ fontSize: "13px", fontWeight: "500" }}>
                      {item.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}