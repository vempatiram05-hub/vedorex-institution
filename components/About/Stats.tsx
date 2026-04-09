import styles from "./Stats.module.css";

export default function Stats({ data }: any) {

  const statIcons = [
    "https://img.icons8.com/ios-filled/40/ffffff/student-male.png",
    "https://img.icons8.com/ios-filled/40/ffffff/task-completed.png",
    "https://img.icons8.com/ios-filled/40/ffffff/trophy.png",
  ];

  return (
    <section className={`py-5 ${styles.statsSection}`}>
      <div className="container">

        {/* TOP TAG */}
        <div className="text-center mb-2">
          <span className={`text-uppercase fw-semibold ${styles.tag}`}>
            {data.tag_label}
          </span>
        </div>

        {/* HEADING */}
        <h2 className={`text-center fw-bold mb-5 ${styles.heading}`}>
          {data.heading}
        </h2>

        {/* STAT CARDS */}
        <div className="row g-4 mb-5">
          {data.stats?.map((item: any, index: number) => (
            <div key={item.id} className="col-md-4">
              <div className={styles.cardBox}>

                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className={styles.iconBox}>
                    <img src={statIcons[index]} alt={item.label} width={28} height={28} />
                  </div>

                  <h3 className={`${styles.statNumber} mb-0`}>
                    {item.number}
                  </h3>
                </div>

                <h6 className={`mb-2 ${styles.statLabel}`}>
                  {item.label}
                </h6>

                <p className={`mb-0 ${styles.statDesc}`}>
                  {item.description}
                </p>

              </div>
            </div>
          ))}
        </div>

        {/* DIVIDER */}
        <hr className={styles.divider} />

        {/* BOTTOM ROW */}
        <div className="row text-center pt-3">
          {data.items?.map((item: any) => (
            <div key={item.id} className="col-6 col-md-3 mb-3 mb-md-0">
              <h4 className={`${styles.bottomNumber} mb-1`}>
                {item.number}
              </h4>
              <p className={`mb-0 ${styles.bottomLabel}`}>
                {item.lable}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}