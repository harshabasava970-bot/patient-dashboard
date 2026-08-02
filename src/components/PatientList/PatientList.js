'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import styles from './PatientList.module.css';
import { SearchIcon, DotsVertIcon } from '../icons';

function getInitials(name = '') {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function PatientList({ patients = [], selectedPatient, onSelectPatient }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return patients;
    return patients.filter((p) => p.name.toLowerCase().includes(q));
  }, [patients, query]);

  return (
    <aside className={styles.sidebar} aria-label="Patient list">
      {/* Header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Patients</h2>
        <button type="button" className={styles.menuBtn} aria-label="Patient list options">
          <DotsVertIcon />
        </button>
      </div>

      {/* Search */}
      <label className={styles.searchLabel} htmlFor="patient-search">
        <SearchIcon className={styles.searchIcon} />
        <input
          id="patient-search"
          type="search"
          placeholder="Search patients"
          className={styles.searchInput}
          aria-label="Search patients"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>

      {/* List */}
      <ul className={styles.list} role="list">
        {filtered.map((patient) => {
          const isActive = patient.name === selectedPatient?.name;
          return (
            <li key={patient.name}>
              <button
                type="button"
                className={isActive ? `${styles.row} ${styles.rowActive}` : styles.row}
                aria-current={isActive ? 'true' : undefined}
                onClick={() => onSelectPatient(patient)}
              >
                {/* Avatar */}
                <span className={styles.avatar} aria-hidden="true">
                  {patient.profile_picture ? (
                    <Image
                      src={patient.profile_picture}
                      alt=""
                      width={48}
                      height={48}
                      className={styles.avatarImg}
                      unoptimized
                    />
                  ) : (
                    <span className={styles.avatarInitials}>{getInitials(patient.name)}</span>
                  )}
                </span>

                {/* Text */}
                <span className={styles.rowInfo}>
                  <span className={styles.rowName}>{patient.name}</span>
                  <span className={styles.rowMeta}>
                    {patient.gender}, {patient.age}
                  </span>
                </span>

                {/* More icon */}
                <span className={styles.moreIcon} aria-hidden="true">
                  <DotsVertIcon width={14} height={14} />
                </span>
              </button>
            </li>
          );
        })}

        {filtered.length === 0 && (
          <li className={styles.noResults}>No patients match &ldquo;{query}&rdquo;</li>
        )}
      </ul>
    </aside>
  );
}
