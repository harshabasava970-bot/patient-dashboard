'use client';

import { useMemo } from 'react';
import styles from './Overview.module.css';
import { getLatestVitals, getDiagnosticList } from '../../lib/patients';

function StatCard({ label, value, sub, accent }) {
  return (
    <div className={`${styles.statCard} ${accent ? styles[accent] : ''}`}>
      <p className={styles.statValue}>{value}</p>
      <p className={styles.statLabel}>{label}</p>
      {sub && <p className={styles.statSub}>{sub}</p>}
    </div>
  );
}

function PatientRow({ patient, rank }) {
  const vitals = getLatestVitals(patient);
  const bp = vitals?.blood_pressure;
  const initials = patient.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();

  return (
    <tr className={styles.tr}>
      <td className={styles.td}>
        <div className={styles.patientCell}>
          <span className={styles.rank}>{rank}</span>
          <span className={styles.avatar}>{initials}</span>
          <span className={styles.patientName}>{patient.name}</span>
        </div>
      </td>
      <td className={styles.td}>{patient.gender}</td>
      <td className={styles.td}>{patient.age}</td>
      <td className={styles.td}>
        {bp ? `${bp.systolic?.value ?? '—'}/${bp.diastolic?.value ?? '—'}` : '—'}
      </td>
      <td className={styles.td}>
        {vitals?.heart_rate?.value ? `${vitals.heart_rate.value} bpm` : '—'}
      </td>
      <td className={styles.td}>
        <span className={`${styles.badge} ${getDiagnosticList(patient).length > 0 ? styles.badgeWarn : styles.badgeGood}`}>
          {getDiagnosticList(patient).length > 0 ? 'Active' : 'Healthy'}
        </span>
      </td>
    </tr>
  );
}

export default function Overview({ patients }) {
  const stats = useMemo(() => {
    const total = patients.length;
    const female = patients.filter((p) => p.gender === 'Female').length;
    const male = patients.filter((p) => p.gender === 'Male').length;
    const avgAge = total
      ? Math.round(patients.reduce((s, p) => s + (p.age ?? 0), 0) / total)
      : 0;
    const withDiagnosis = patients.filter((p) => getDiagnosticList(p).length > 0).length;
    return { total, female, male, avgAge, withDiagnosis };
  }, [patients]);

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.heading}>Practice Overview</h1>
        <p className={styles.sub}>Summary of all registered patients and their current health status.</p>

        {/* Stats row */}
        <div className={styles.statsGrid}>
          <StatCard label="Total Patients" value={stats.total} sub="Registered" accent="teal" />
          <StatCard label="Female" value={stats.female} sub={`${Math.round((stats.female / stats.total) * 100)}% of total`} accent="pink" />
          <StatCard label="Male" value={stats.male} sub={`${Math.round((stats.male / stats.total) * 100)}% of total`} accent="blue" />
          <StatCard label="Average Age" value={stats.avgAge} sub="Years" accent="orange" />
          <StatCard label="Active Cases" value={stats.withDiagnosis} sub="With diagnosis" accent="red" />
        </div>

        {/* Patient table */}
        <section className={styles.tableCard} aria-labelledby="overview-table-heading">
          <h2 id="overview-table-heading" className={styles.tableTitle}>All Patients</h2>
          <div className={styles.tableScroll}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>Patient</th>
                  <th className={styles.th}>Gender</th>
                  <th className={styles.th}>Age</th>
                  <th className={styles.th}>Blood Pressure</th>
                  <th className={styles.th}>Heart Rate</th>
                  <th className={styles.th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((p, i) => (
                  <PatientRow key={p.name} patient={p} rank={i + 1} />
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
