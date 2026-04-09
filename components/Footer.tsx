import styles from "./Footer.module.css";
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export default function Footer({ data }: any) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>

        {/* ✅ Row wrapper */}
        <div className="row">

          {/* Column 1 */}
          <div className="col-12 col-md-3 mb-4 mb-md-0 footerCol">
            {data?.logo?.url && (
             <img
  src={`${STRAPI_URL}${data.logo.url}`}
  alt={data?.logo?.alternativeText || "Logo"}
  className="img-fluid"
  style={{
    maxWidth: "150px",
    height: "70px",
    objectFit: "contain",
  }}
/>
            )}

            <p className={styles.description}>
              We provide high quality services and solutions for your business.
            </p>
          </div>

          {/* Column 2 */}
          <div className="col-12 col-md-3 footerCol">
            <h6 className={styles.heading}>Quick Links</h6>
            <a href="#" className={styles.link}>Home</a>
            <a href="#" className={styles.link}>About</a>
            <a href="#" className={styles.link}>Courses</a>
            <a href="#" className={styles.link}>Contact</a>
          </div>

          {/* Column 3 */}
          <div className="col-12 col-md-3 footerCol">
            <h6 className={styles.heading}>Services</h6>
            <a href="#" className={styles.link}>Web Development</a>
            <a href="#" className={styles.link}>UI/UX Design</a>
            <a href="#" className={styles.link}>Marketing</a>
          </div>

          {/* Column 4 */}
          <div className="col-12 col-md-3 footerCol">
            <h6 className={styles.heading}>Contact</h6>

            <div className={styles.contactItem}>
              <span className={styles.icon}>📍</span>
              <span className={styles.text}>Hyderabad, India</span>
            </div>

            <div className={styles.contactItem}>
              <span className={styles.icon}>📞</span>
              <span className={styles.text}>+91 9876543210</span>
            </div>

            <div className={styles.contactItem}>
              <span className={styles.icon}>✉️</span>
              <span className={styles.text}>info@email.com</span>
            </div>
          </div>

        </div>

        <hr className={styles.divider} />

        <p className={styles.copy}>
          © 2026 Your Company. All rights reserved.
        </p>

      </div>
    </footer>
  );
}