import styles from "./WhyChooseUs.module.css";

export default function WhyChooseUs({ data }: any) {
  const BASE_URL = "http://localhost:1337";

  return (
    <section className={`py-5 ${styles.section}`}>
      <div className="container">

        <div className={styles.headerWrapper}>
          <h2 className={styles.heading}>{data.heading}</h2>
          <p className={styles.description}>{data.description}</p>
          <div className={styles.divider}></div>
        </div>

        <div className="row mt-4">
          {data.cards?.map((card: any) => (
            <div key={card.id} className="col-md-4 mb-4">
              <div className={styles.cardBox}>

                <div className={`${styles.iconBox} mb-3`}>
                  {card.icon?.url && (
                    <img
                      src={`${BASE_URL}${card.icon.url}`}
                      alt={card.title}
                      width="26"
                      height="26"
                    />
                  )}
                </div>

                <h5 className={styles.cardTitle}>{card.title}</h5>
                <p className={styles.cardDesc}>{card.description}</p>
                <a href={card.link_url?.trim()} className={styles.cardLink}>
                  {card.link_text} →
                </a>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}