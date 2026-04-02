import Link from "next/link";

interface FooterLink {
  id: number;
  label: string;
  url: string | null;
}

interface LinkGroup {
  id: number;
  label: string;
  link_groups: FooterLink[];
}

interface ContactInfo {
  address: string;
  phoneNumber: string;
  Email: string;
}

interface Logo {
  url: string;
  alternativeText: string | null;
}

interface FooterData {
  logo: Logo;
  description: string;
  copyright: string;
  link_group: LinkGroup[];
  ContactInfo: ContactInfo;
}

async function getFooterData(): Promise<FooterData> {
  const res = await fetch(
    "http://localhost:1337/api/footer?populate[0]=logo&populate[1]=link_group.link_groups&populate[2]=ContactInfo",
    { cache: "no-store" }
  );
  const json = await res.json();
  return json.data;
}

const STRAPI_URL = "http://localhost:1337";

export default async function Footer() {
  const footer = await getFooterData();

  if (!footer) return null;

return (
  <footer className="border-top" style={{ backgroundColor: "#cbcbcb" }}>
      <div
        style={{
          padding: "60px clamp(16px, 4vw, 50px)",
          margin: "0 auto",
          boxSizing: "border-box",
          maxWidth: "1920px",

        }}
      >
<div className="row g-4 justify-content-between">
          
          <div className="col-lg-4 col-md-6">
            {footer.logo?.url && (
              <img
                src={`${STRAPI_URL}${footer.logo.url}`}
                alt={footer.logo.alternativeText || "Logo"}
                style={{ width: "130px", objectFit: "contain" }}
                className="mb-3"
              />
            )}
            <p className="text-secondary" style={{ fontSize: "14px", lineHeight: "1.7" }}>
              {footer.description}
            </p>
          </div>

          {/* Link Groups */}
          {footer.link_group.map((group) => (
            <div className="col-lg-2 col-md-6" key={group.id}>
              <h6 className="fw-semibold mb-3">{group.label}</h6>
              <ul className="list-unstyled">
                {group.link_groups.map((link) => (
                  <li key={link.id} className="mb-2">
                    <Link
                      href={link.url || "#"}
                      className="text-secondary text-decoration-none"
                      style={{ fontSize: "14px" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div className="col-lg-3 col-md-6">
            <h6 className="fw-semibold mb-3">Contact Info</h6>
            <ul className="list-unstyled">
              <li className="d-flex align-items-start gap-2 mb-2">
                <span style={{ color: "#5C44D8" }}>📍</span>
                <span className="text-secondary" style={{ fontSize: "14px" }}>
                  {footer.ContactInfo.address}
                </span>
              </li>
              <li className="d-flex align-items-center gap-2 mb-2">
                <span style={{ color: "#5C44D8" }}>📞</span>
                <span className="text-secondary" style={{ fontSize: "14px" }}>
                  {footer.ContactInfo.phoneNumber}
                </span>
              </li>
              <li className="d-flex align-items-center gap-2">
                <span style={{ color: "#5C44D8" }}>✉️</span>
                <span className="text-secondary" style={{ fontSize: "14px" }}>
                  {footer.ContactInfo.Email}
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider + Copyright */}
        <hr className="mt-4" />
        <p className="text-center text-secondary mb-0" style={{ fontSize: "13px" }}>
          {footer.copyright}
        </p>

      </div>
    </footer>
  );
}