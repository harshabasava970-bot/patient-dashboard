import styles from './StatusStates.module.css';

function Skeleton({ className }) {
  return <div className={`${styles.skeleton} ${className ?? ''}`} aria-hidden="true" />;
}

export default function LoadingState() {
  return (
    <div className={styles.loadingLayout} role="status" aria-label="Loading patient data">
      <span className="sr-only">Loading Jessica Taylor&apos;s records…</span>

      {/* Simulated sidebar */}
      <div className={styles.loadSidebar}>
        <Skeleton className={styles.skeletonTitle} />
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={styles.skeletonRow}>
            <Skeleton className={styles.skeletonAvatar} />
            <div className={styles.skeletonRowText}>
              <Skeleton className={styles.skeletonLine} />
              <Skeleton className={styles.skeletonLineSm} />
            </div>
          </div>
        ))}
      </div>

      {/* Simulated main */}
      <div className={styles.loadMain}>
        <Skeleton className={styles.skeletonChart} />
        <div className={styles.skeletonVitals}>
          <Skeleton className={styles.skeletonVital} />
          <Skeleton className={styles.skeletonVital} />
          <Skeleton className={styles.skeletonVital} />
        </div>
        <Skeleton className={styles.skeletonTable} />
      </div>

      {/* Simulated aside */}
      <div className={styles.loadAside}>
        <Skeleton className={styles.skeletonProfile} />
        <Skeleton className={styles.skeletonLab} />
      </div>
    </div>
  );
}
