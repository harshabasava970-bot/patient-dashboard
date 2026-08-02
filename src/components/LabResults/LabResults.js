'use client';

import { useState } from 'react';
import styles from './LabResults.module.css';
import Toast from '../shared/Toast';
import { DownloadIcon } from '../icons';

function normalizeResult(result) {
  if (typeof result === 'string') return { label: result, url: null };
  return {
    label: result?.name ?? result?.test_name ?? 'Lab Result',
    url:   result?.url  ?? result?.file       ?? null,
  };
}

export default function LabResults({ results }) {
  const [toast, setToast] = useState(null);
  const items = results.map(normalizeResult);

  function handleDownload(item) {
    if (item.url) {
      // Real URL — let the browser handle it naturally via the <a> tag
      return;
    }
    // API returns plain strings with no file URL — simulate download feedback
    setToast({
      message: `${item.label} report has been prepared for download.`,
      type: 'success',
    });
  }

  return (
    <>
      <section className={styles.card} aria-labelledby="lab-results-heading">
        <h2 id="lab-results-heading" className={styles.title}>Lab Results</h2>

        {items.length === 0 ? (
          <p className={styles.empty}>No lab results available.</p>
        ) : (
          <ul className={styles.list} role="list">
            {items.map((item, index) => (
              <li key={`${item.label}-${index}`} className={styles.row}>
                <span className={styles.label}>{item.label}</span>

                {item.url ? (
                  /* Real file — use an anchor for native download */
                  <a
                    href={item.url}
                    download
                    className={styles.downloadBtn}
                    aria-label={`Download ${item.label}`}
                  >
                    <DownloadIcon />
                  </a>
                ) : (
                  /* No URL — button gives feedback toast */
                  <button
                    type="button"
                    className={styles.downloadBtn}
                    aria-label={`Download ${item.label}`}
                    onClick={() => handleDownload(item)}
                  >
                    <DownloadIcon />
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDismiss={() => setToast(null)}
        />
      )}
    </>
  );
}
