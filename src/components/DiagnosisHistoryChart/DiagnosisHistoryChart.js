'use client';

import { useMemo, useCallback } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import styles from './DiagnosisHistoryChart.module.css';
import { formatMonthYear } from '../../lib/patients';
import { ArrowUpIcon, ArrowDownIcon } from '../icons';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

/** Map "levels" strings from the API to a display variant */
function getLevelVariant(levelStr) {
  if (!levelStr) return 'normal';
  const l = levelStr.toLowerCase();
  if (l.includes('higher') || l.includes('above')) return 'high';
  if (l.includes('lower') || l.includes('below')) return 'low';
  return 'normal';
}

function TrendBadge({ value, levels }) {
  const variant = getLevelVariant(levels);
  const variantClass =
    variant === 'high'
      ? styles.trendHigh
      : variant === 'low'
      ? styles.trendLow
      : styles.trendNormal;

  return (
    <div className={`${styles.trend} ${variantClass}`}>
      {variant === 'high' && <ArrowUpIcon />}
      {variant === 'low' && <ArrowDownIcon />}
      <span>{levels || 'Normal'}</span>
    </div>
  );
}

export default function DiagnosisHistoryChart({ history }) {
  const labels = useMemo(
    () => history.map((e) => formatMonthYear(e.month, e.year)),
    [history]
  );

  const systolicData = useMemo(
    () => history.map((e) => e?.blood_pressure?.systolic?.value ?? null),
    [history]
  );

  const diastolicData = useMemo(
    () => history.map((e) => e?.blood_pressure?.diastolic?.value ?? null),
    [history]
  );

  const latest = history[history.length - 1];
  const latestSystolic = latest?.blood_pressure?.systolic;
  const latestDiastolic = latest?.blood_pressure?.diastolic;

  const chartData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: 'Systolic',
          data: systolicData,
          borderColor: '#e66fd2',
          backgroundColor: 'rgba(230, 111, 210, 0.08)',
          pointBackgroundColor: '#e66fd2',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7,
          tension: 0.4,
          borderWidth: 2,
          fill: false,
        },
        {
          label: 'Diastolic',
          data: diastolicData,
          borderColor: '#8c6fe6',
          backgroundColor: 'rgba(140, 111, 230, 0.08)',
          pointBackgroundColor: '#8c6fe6',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 5,
          pointHoverRadius: 7,
          tension: 0.4,
          borderWidth: 2,
          fill: false,
        },
      ],
    }),
    [labels, systolicData, diastolicData]
  );

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      animation: { duration: 600, easing: 'easeInOutQuart' },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#ffffff',
          titleColor: '#072635',
          bodyColor: '#072635',
          borderColor: '#e8ecf0',
          borderWidth: 1,
          padding: 12,
          cornerRadius: 10,
          boxPadding: 6,
          titleFont: { size: 13, weight: '700', family: 'Manrope, Inter, sans-serif' },
          bodyFont: { size: 13, family: 'Manrope, Inter, sans-serif' },
          callbacks: {
            label(ctx) {
              return ` ${ctx.dataset.label}: ${ctx.parsed.y} mmHg`;
            },
          },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: {
            color: '#72787d',
            font: { size: 11, family: 'Manrope, Inter, sans-serif', weight: '500' },
            maxRotation: 0,
          },
        },
        y: {
          min: 60,
          max: 180,
          ticks: {
            stepSize: 20,
            color: '#72787d',
            font: { size: 11, family: 'Manrope, Inter, sans-serif', weight: '500' },
          },
          grid: { color: '#f0f3f6' },
          border: { display: false, dash: [4, 4] },
        },
      },
    }),
    []
  );

  return (
    <section className={styles.card} aria-labelledby="bp-chart-heading">
      <div className={styles.header}>
        <h2 id="bp-chart-heading" className={styles.title}>
          Diagnosis History
        </h2>

        <div className={styles.controls}>
          <span className={styles.range}>Last 6 months</span>
          <button type="button" className={styles.rangeBtn} aria-label="Change date range">
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true">
              <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.body}>
        {/* Chart */}
        <div className={styles.chartWrap}>
          {history.length === 0 ? (
            <p className={styles.empty}>No blood pressure history available.</p>
          ) : (
            <div
              className={styles.chartArea}
              role="img"
              aria-label="Line chart showing systolic and diastolic blood pressure history over time"
            >
              <Line data={chartData} options={chartOptions} />
            </div>
          )}
        </div>

        {/* Legend / stats panel */}
        <div className={styles.statsPanel}>
          {/* Systolic */}
          <div className={styles.statBlock}>
            <div className={styles.statLegend}>
              <span className={`${styles.dot} ${styles.dotSystolic}`} aria-hidden="true" />
              <span className={styles.statLabel}>Systolic</span>
            </div>
            <p className={styles.statValue}>{latestSystolic?.value ?? '—'}</p>
            <TrendBadge value={latestSystolic?.value} levels={latestSystolic?.levels} />
          </div>

          <hr className={styles.divider} />

          {/* Diastolic */}
          <div className={styles.statBlock}>
            <div className={styles.statLegend}>
              <span className={`${styles.dot} ${styles.dotDiastolic}`} aria-hidden="true" />
              <span className={styles.statLabel}>Diastolic</span>
            </div>
            <p className={styles.statValue}>{latestDiastolic?.value ?? '—'}</p>
            <TrendBadge value={latestDiastolic?.value} levels={latestDiastolic?.levels} />
          </div>
        </div>
      </div>
    </section>
  );
}
