import styles from './LabResults.module.css';
import { DownloadIcon } from '../icons';

/** Normalize each result — the API sends plain strings */
function normalizeResult(result) {
  if (typeof result === 'string') {
    return { label: result, url: null };
  }
  return {
    label: result?.name ?? result?.test_name ?? 'Lab Result',
    url: result?.url ?? result?.file ?? null,
  };
}

export default function LabResults({ results }) {
  const items = results.map(normalizeResult);

  return (
    <section className={styles.card} aria-labelledby="lab-results-heading">
      <h2 id="lab-results-heading" className={styles.title}>
        Lab Results
      </h2>

      {items.length === 0 ? (
        <p className={styles.empty}>No lab results available.</p>
      ) : (
        <ul className={styles.list} role="list">
          {items.map((item, index) => (
            <li key={`${item.label}-${index}`} className={styles.row}>
              <span className={styles.label}>{item.label}</span>
              <a
                href={item.url ?? '#'}
                download={item.url ? item.label : undefined}
                className={styles.downloadBtn}
                aria-label={`Download ${item.label}`}
                onClick={item.url ? undefined : (e) => e.preventDefault()}
                tabIndex={0}
              >
                <DownloadIcon />
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
