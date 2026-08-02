import styles from './VitalsRow.module.css';
import { RespiratoryIcon, TemperatureIcon, HeartRateIcon, ArrowUpIcon, ArrowDownIcon } from '../icons';

/** Map "levels" string → up/down/normal */
function getArrow(levels) {
  if (!levels) return null;
  const l = levels.toLowerCase();
  if (l.includes('higher') || l.includes('above')) return 'up';
  if (l.includes('lower') || l.includes('below')) return 'down';
  return null;
}

function VitalCard({ icon, label, value, unit, levels, colorClass }) {
  const arrow = getArrow(levels);

  return (
    <article className={`${styles.card} ${colorClass}`} aria-label={label}>
      <span className={styles.iconWrap} aria-hidden="true">
        {icon}
      </span>
      <p className={styles.label}>{label}</p>
      <p className={styles.value}>
        {value ?? '—'}
        {value != null && unit && <span className={styles.unit}> {unit}</span>}
      </p>
      {levels && (
        <p className={styles.levels}>
          {arrow === 'up' && <ArrowUpIcon className={styles.arrowIcon} />}
          {arrow === 'down' && <ArrowDownIcon className={styles.arrowIcon} />}
          {levels}
        </p>
      )}
    </article>
  );
}

export default function VitalsRow({ vitals }) {
  const cards = [
    {
      key: 'respiratory',
      icon: <RespiratoryIcon />,
      label: 'Respiratory Rate',
      value: vitals?.respiratory_rate?.value,
      unit: 'bpm',
      levels: vitals?.respiratory_rate?.levels,
      colorClass: styles.blue,
    },
    {
      key: 'temperature',
      icon: <TemperatureIcon />,
      label: 'Temperature',
      value: vitals?.temperature?.value,
      unit: '°F',
      levels: vitals?.temperature?.levels,
      colorClass: styles.pink,
    },
    {
      key: 'heartRate',
      icon: <HeartRateIcon />,
      label: 'Heart Rate',
      value: vitals?.heart_rate?.value,
      unit: 'bpm',
      levels: vitals?.heart_rate?.levels,
      colorClass: styles.red,
    },
  ];

  return (
    <section aria-label="Current vitals">
      <div className={styles.grid} role="list">
        {cards.map((card) => (
          <div key={card.key} role="listitem">
            <VitalCard {...card} />
          </div>
        ))}
      </div>
    </section>
  );
}
