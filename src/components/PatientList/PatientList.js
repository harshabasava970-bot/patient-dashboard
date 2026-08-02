'use client';

import Image from 'next/image';
import styles from './PatientList.module.css';
import { SearchIcon, DotsVertIcon } from '../icons';

/** Other patients shown in the roster for visual completeness — names match the API */
const ROSTER = [
  { name: 'Emily Williams', gender: 'Female', age: 18 },
  { name: 'Ryan Johnson', gender: 'Male', age: 45 },
  { name: 'Brandon Mitchell', gender: 'Male', age: 36 },
  { name: 'Jessica Taylor', gender: 'Female', age: 28 },
  { name: 'Samantha Johnson', gender: 'Female', age: 56 },
  { name: 'Ashley Martinez', gender: 'Female', age: 54 },
  { name: 'Olivia Brown', gender: 'Female', age: 32 },
  { name: 'Tyler Davis', gender: 'Male', age: 19 },
  { name: 'Kevin Anderson', gender: 'Male', age: 30 },
  { name: 'Dylan Thompson', gender: 'Male', age: 36 },
  { name: 'Nathan Evans', gender: 'Male', age: 58 },
  { name: 'Mike Nolan', gender: 'Male', age: 31 },
];

function getInitials(name = '') {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function PatientList({ activePatient }) {
  const activeName = activePatient?.name ?? 'Jessica Taylor';
  const activeAge = activePatient?.age;
  const activeGender = activePatient?.gender;
  const activeAvatar = activePatient?.profile_picture;

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
        />
      </label>

      {/* List */}
      <ul className={styles.list} role="list">
        {ROSTER.map((patient) => {
          const isActive = patient.name === activeName;
          return (
            <li key={patient.name}>
              <button
                type="button"
                className={isActive ? `${styles.row} ${styles.rowActive}` : styles.row}
                aria-current={isActive ? 'true' : undefined}
                tabIndex={isActive ? 0 : 0}
              >
                {/* Avatar */}
                <span className={styles.avatar} aria-hidden="true">
                  {isActive && activeAvatar ? (
                    <Image
                      src={activeAvatar}
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
                    {isActive ? (activeGender ?? patient.gender) : patient.gender}
                    {', '}
                    {isActive ? (activeAge ?? patient.age) : patient.age}
                  </span>
                </span>

                {/* More button */}
                <span className={styles.moreIcon} aria-hidden="true">
                  <DotsVertIcon width={14} height={14} />
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
