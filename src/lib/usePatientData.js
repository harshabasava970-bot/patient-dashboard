'use client';

import { useEffect, useState, useCallback } from 'react';
import { extractPatientList } from './patients';

/**
 * Fetches the full patient list from our internal proxy route (/api/patients).
 * Returns the complete list so any patient can be selected in the UI.
 */
export function useAllPatients() {
  const [status, setStatus] = useState('loading');
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState(null);

  const fetchPatients = useCallback(async () => {
    setStatus('loading');
    setError(null);

    try {
      const res = await fetch('/api/patients');
      const payload = await res.json();

      if (!res.ok) {
        throw new Error(payload?.error ?? `Request failed with status ${res.status}.`);
      }

      const list = extractPatientList(payload);

      if (!list.length) {
        throw new Error('The API returned an empty patient list.');
      }

      setPatients(list);
      setStatus('success');
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong while loading patient data.'
      );
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  return { patients, status, error, retry: fetchPatients };
}
