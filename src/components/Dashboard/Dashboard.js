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
import Overview from '../Overview/Overview';
import Schedule from '../Schedule/Schedule';
import Message from '../Message/Message';
import Transactions from '../Transactions/Transactions';
import { useAllPatients } from '../../lib/usePatientData';
import {
  getDiagnosisHistory,
  getLatestVitals,
  getDiagnosticList,
  getLabResults,
} from '../../lib/patients';

export default function Dashboard() {
  const { patients, status, error, retry } = useAllPatients();
  const [activeNav, setActiveNav] = useState('Patients');
  const [selectedPatient, setSelectedPatient] = useState(null);

  const defaultPatient = useMemo(() => {
    if (!patients.length) return null;
    return patients.find((p) => p.name === 'Jessica Taylor') ?? patients[0];
  }, [patients]);

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

  /* ── Non-patient tab views ── */
  if (activeNav === 'Overview') {
    return (
      <div className={styles.page}>
        <Navbar activeNav={activeNav} onNavChange={setActiveNav} />
        <Overview patients={patients} />
      </div>
    );
  }

  if (activeNav === 'Schedule') {
    return (
      <div className={styles.page}>
        <Navbar activeNav={activeNav} onNavChange={setActiveNav} />
        <Schedule patients={patients} />
      </div>
    );
  }

  if (activeNav === 'Message') {
    return (
      <div className={styles.pageFlex}>
        <Navbar activeNav={activeNav} onNavChange={setActiveNav} />
        <Message patients={patients} />
      </div>
    );
  }

  if (activeNav === 'Transactions') {
    return (
      <div className={styles.page}>
        <Navbar activeNav={activeNav} onNavChange={setActiveNav} />
        <Transactions patients={patients} />
      </div>
    );
  }

  /* ── Patients tab (default) ── */
  return (
    <div className={styles.page}>
      <Navbar activeNav={activeNav} onNavChange={setActiveNav} />

      <div className={styles.layout}>
        <PatientList
          patients={patients}
          selectedPatient={patient}
          onSelectPatient={setSelectedPatient}
        />

        <main className={styles.main} id="main-content">
          <h1 className="sr-only">{patient?.name}&apos;s patient dashboard</h1>
          <DiagnosisHistoryChart history={getDiagnosisHistory(patient)} />
          <VitalsRow vitals={getLatestVitals(patient)} />
          <DiagnosticList items={getDiagnosticList(patient)} />
        </main>

        <aside className={styles.aside} aria-label="Patient profile and lab results">
          <PatientProfile patient={patient} />
          <LabResults results={getLabResults(patient)} />
        </aside>
      </div>
    </div>
  );
}
