'use client';

import { useEffect, useState, useCallback } from 'react';
import { findPatientByName } from './patients';

/**
 * Fetches the patient list from our internal proxy route (/api/patients)
 * and returns the record for the requested patient, plus loading/error state
 * and a retry callback for the error UI.
 */
export function usePatientData(patientName = 'Jessica Taylor') {
  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState(null);

  const fetchPatient = useCallback(async () => {
    setStatus('loading');
    setError(null);

    try {
      const res = await fetch('/api/patients');
      const payload = await res.json();

      if (!res.ok) {
        throw new Error(
          payload?.error ?? `Request failed with status ${res.status}.`
        );
      }

      const found = findPatientByName(payload, patientName);

      if (!found) {
        throw new Error(
          `No record found for "${patientName}". Please verify the API returned data.`
        );
      }

      setPatient(found);
      setStatus('success');
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong while loading patient data.'
      );
      setStatus('error');
    }
  }, [patientName]);

  useEffect(() => {
    fetchPatient();
  }, [fetchPatient]);

  return { patient, status, error, retry: fetchPatient };
}
