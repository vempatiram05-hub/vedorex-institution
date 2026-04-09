import styles from "./Edtech.module.css";

export default function Edtech({ data }: any) {
  const BASE_URL = "http://localhost:1337";

  const icons = [
    "https://img.icons8.com/ios-filled/50/1e40af/machine-learning.png",
    "https://img.icons8.com/ios-filled/50/1e40af/find-matching-job.png",
    "https://img.icons8.com/ios/50/1e40af/internship.png",
  ];

  return (
    <section className={`py-5 ${styles.edtechSection}`}>
      <div className="container">
        <div className="row align-items-center g-5">

          {/* LEFT */}
          <div className="col-md-5">
            <div className={styles.imageWrapper}>

              <div className={styles.badgeBox}>
                <div className={styles.badgeNumber}>680+</div>
                <div className={styles.badgeText}>Students Trained</div>
              </div>

              <img
                src={`${BASE_URL}${data.section_image?.url}`}
                alt={data.section_image?.alternativeText || "about"}
                className={`${styles.mainImage} shadow-lg`}
              />
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-md-7">

            <span className={`fw-bold text-uppercase mb-3 d-inline-block ${styles.tag}`}>
              {data.tag_label}
            </span>

            <h2 className={`fw-bold mb-3 ${styles.heading}`}>
              {data.heading}
            </h2>

            <p className={`text-muted mb-4 ${styles.description}`}>
              {data.description}
            </p>

            <div className="d-flex flex-column gap-4">
              {data.features?.map((item: any, index: number) => (
                <div key={item.id} className="d-flex align-items-start gap-3">

                  <div className={styles.iconBox}>
                    <img src={icons[index]} alt={item.title} width={26} height={26} />
                  </div>

                  <div>
                    <div className={styles.featureTitle}>
                      {item.title}
                    </div>
                    <p className={`text-muted mb-0 ${styles.featureDesc}`}>
                      {item.description}
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