const STRAPI_URL = "http://localhost:1337";

interface MapData {
  id: number;
  heading: string;
  map_url: string | null;
  background_image: {
    url: string;
    alternativeText: string | null;
  } | null;
}

export default function Mapsection({ data }: { data: MapData }) {
  return (
    <section className="py-5" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container">

        {/* Heading */}
        <div className="text-center mb-4">
          <h2 className="fw-bold" style={{ fontSize: "clamp(24px, 3vw, 40px)" }}>
            {data.heading}
          </h2>
          <div
            style={{
              width: "60px", height: "3px",
              backgroundColor: "#5C44D8",
              margin: "12px auto 0",
              borderRadius: "2px",
            }}
          />
        </div>

        {/* ✅ Full width map image */}
        {data.background_image?.url && (
          <div className="rounded-4 overflow-hidden shadow">
            <img
              src={`${STRAPI_URL}${data.background_image.url}`}
              alt={data.background_image.alternativeText || "Map"}
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
                display: "block",
               }}
            />
          </div>
        )}

        {/* ✅ Google Map iframe if url exists */}
        {data.map_url && (
          <div className="rounded-4 overflow-hidden shadow mt-4">
            <iframe
              src={data.map_url}
              width="100%"
              height="400px"
              allowFullScreen
              loading="lazy"
              style={{ border: 0, display: "block" }}
              title="Google Map"
            />
          </div>
        )}

        {/* ✅ Fallback if both null */}
        {!data.background_image?.url && !data.map_url && (
          <div
            className="rounded-4 d-flex align-items-center justify-content-center"
            style={{ height: "400px", backgroundColor: "#e9ecef", color: "#6c757d" }}
          >
            📍 Map coming soon
          </div>
        )}

      </div>
    </section>
  );
}