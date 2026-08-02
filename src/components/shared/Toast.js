'use client';

import { useEffect } from 'react';
import styles from './Toast.module.css';

export default function Toast({ message, type = 'success', onDismiss }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 3000);
    return () => clearTimeout(t);
  }, [onDismiss]);

  return (
    <div
      className={`${styles.toast} ${styles[type]}`}
      role="status"
      aria-live="polite"
    >
      <span className={styles.icon} aria-hidden="true">
        {type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}
      </span>
      <span className={styles.message}>{message}</span>
      <button
        type="button"
        className={styles.dismiss}
        onClick={onDismiss}
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  );
}
