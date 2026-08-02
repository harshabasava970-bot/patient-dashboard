import styles from './StatusStates.module.css';

export default function ErrorState({ message, onRetry }) {
  return (
    <div className={styles.errorWrap} role="alert" aria-live="assertive">
      <div className={styles.errorCard}>
        <span className={styles.errorIcon} aria-hidden="true">⚠</span>
        <h2 className={styles.errorTitle}>Unable to load patient data</h2>
        <p className={styles.errorMessage}>{message}</p>
        <button type="button" className={styles.retryBtn} onClick={onRetry}>
          Try again
        </button>
      </div>
    </div>
  );
}
