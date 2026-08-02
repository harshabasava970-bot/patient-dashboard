'use client';

import { useState, useMemo } from 'react';
import styles from './Dashboard.module.css';
import Navbar from '../Navbar/Navbar';
import PatientList from '../PatientList/PatientList';
import VitalsRow from '../VitalsRow/VitalsRow';
import DiagnosisHistoryChart from '../DiagnosisHistoryChart/DiagnosisHistoryChart';
import DiagnosticList from '../DiagnosticList/DiagnosticList';
import PatientProfile from '../PatientProfile/PatientProfile';
import LabResults from '../LabResults/LabResults';
import LoadingState from '../StatusStates/LoadingState';
import ErrorState from '../StatusStates/ErrorState';
import { useAllPatients } from '../../lib/usePatientData';
import {
  getDiagnosisHistory,
  getLatestVitals,
  getDiagnosticList,
  getLabResults,
} from '../../lib/patients';

/** Placeholder for nav sections that don't have real content yet */
function ComingSoon({ label }) {
  return (
    <div className={styles.comingSoon}>
      <span className={styles.comingSoonIcon} aria-hidden="true">🚧</span>
      <h2 className={styles.comingSoonTitle}>{label}</h2>
      <p className={styles.comingSoonText}>This section is coming soon.</p>
    </div>
  );
}

export default function Dashboard() {
  const { patients, status, error, retry } = useAllPatients();

  // Default to Jessica Taylor; fall back to first patient
  const defaultPatient = useMemo(() => {
    if (!patients.length) return null;
    return (
      patients.find((p) => p.name === 'Jessica Taylor') ?? patients[0]
    );
  }, [patients]);

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [activeNav, setActiveNav] = useState('Patients');

  // Once patients load, seed the selection
  const patient = selectedPatient ?? defaultPatient;

  if (status === 'loading') {
    return (
      <div className={styles.page}>
        <Navbar activeNav={activeNav} onNavChange={setActiveNav} />
        <LoadingState />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className={styles.page}>
        <Navbar activeNav={activeNav} onNavChange={setActiveNav} />
        <ErrorState message={error} onRetry={retry} />
      </div>
    );
  }

  // Non-patient nav tabs
  if (activeNav !== 'Patients') {
    return (
      <div className={styles.page}>
        <Navbar activeNav={activeNav} onNavChange={setActiveNav} />
        <ComingSoon label={activeNav} />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Navbar activeNav={activeNav} onNavChange={setActiveNav} />

      <div className={styles.layout}>
        {/* Left sidebar — patient roster */}
        <PatientList
          patients={patients}
          selectedPatient={patient}
          onSelectPatient={setSelectedPatient}
        />

        {/* Centre — main content */}
        <main className={styles.main} id="main-content">
          <h1 className="sr-only">{patient?.name}&apos;s patient dashboard</h1>
          <DiagnosisHistoryChart history={getDiagnosisHistory(patient)} />
          <VitalsRow vitals={getLatestVitals(patient)} />
          <DiagnosticList items={getDiagnosticList(patient)} />
        </main>

        {/* Right sidebar — profile + lab results */}
        <aside className={styles.aside} aria-label="Patient profile and lab results">
          <PatientProfile patient={patient} />
          <LabResults results={getLabResults(patient)} />
        </aside>
      </div>
    </div>
  );
}
