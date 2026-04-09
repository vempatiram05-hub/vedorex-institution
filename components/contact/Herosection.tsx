const STRAPI_URL = "http://localhost:1337";

interface HeroData {
  id: number;
  heading: string;
  subheading: string;
  overlay_Color: string;
  background_image: {
    url: string;
    alternativeText: string | null;
  };
}

export default function Herosection({ data }: { data: HeroData }) {
  return (
    <section
      style={{
        backgroundImage: `url(${STRAPI_URL}${data.background_image.url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        width: "100%",
        height: "400px",          // ← Screenshot లో చూపించిన height
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: data.overlay_Color,
        }}
      />

      {/* Content */}
      <div
        className="text-white text-center px-3"
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* Subheading */}
        <p
          className="text-uppercase mb-2"
          style={{
            letterSpacing: "4px",
            fontSize: "14px",
            fontWeight: 500,
            opacity: 0.9,
          }}
        >
          {data.subheading}
        </p>

        {/* Main Heading */}
        <h1
          className="fw-bold text-uppercase mb-0"
          style={{
            fontSize: "clamp(24px, 4vw, 48px)",
            letterSpacing: "2px",
          }}
        >
          {data.heading}
        </h1>
      </div>
    </section>
  );
}
  
