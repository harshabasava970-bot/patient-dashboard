import styles from './DiagnosticList.module.css';

const STATUS_MAP = {
  cured: styles.statusGood,
  inactive: styles.statusNeutral,
  active: styles.statusWarn,
  'under observation': styles.statusInfo,
  untreated: styles.statusWarn,
};

function getStatusClass(status) {
  return STATUS_MAP[(status ?? '').toLowerCase()] ?? styles.statusNeutral;
}

export default function DiagnosticList({ items }) {
  return (
    <section className={styles.card} aria-labelledby="diagnostic-list-heading">
      <h2 id="diagnostic-list-heading" className={styles.title}>
        Diagnostic List
      </h2>

      {items.length === 0 ? (
        <p className={styles.empty}>No diagnostic records available.</p>
      ) : (
        <div className={styles.tableScroll} role="region" aria-label="Diagnostic list table" tabIndex={0}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th scope="col">Problem / Diagnosis</th>
                <th scope="col">Description</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={`${item.name}-${index}`}>
                  <td className={styles.problemCell}>{item.name}</td>
                  <td className={styles.descCell}>{item.description}</td>
                  <td>
                    <span className={`${styles.badge} ${getStatusClass(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
