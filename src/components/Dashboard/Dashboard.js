'use client';

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
import { usePatientData } from '../../lib/usePatientData';
import {
  getDiagnosisHistory,
  getLatestVitals,
  getDiagnosticList,
  getLabResults,
} from '../../lib/patients';

export default function Dashboard() {
  const { patient, status, error, retry } = usePatientData('Jessica Taylor');

  if (status === 'loading') {
    return (
      <div className={styles.page}>
        <Navbar />
        <LoadingState />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className={styles.page}>
        <Navbar />
        <ErrorState message={error} onRetry={retry} />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Navbar />

      <div className={styles.layout}>
        {/* Left sidebar — patient roster */}
        <PatientList activePatient={patient} />

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
