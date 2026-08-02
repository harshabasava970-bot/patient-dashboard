'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import styles from './PatientProfile.module.css';
import Modal from '../shared/Modal';
import Toast from '../shared/Toast';
import {
  CalendarIcon,
  GenderIcon,
  PhoneIcon,
  EmergencyIcon,
  InsuranceIcon,
} from '../icons';
import { formatDate, getDiagnosticList, getLabResults } from '../../lib/patients';

function getInitials(name = '') {
  return name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
}

function DetailRow({ icon, label, value }) {
  return (
    <div className={styles.detailRow}>
      <dt className={styles.detailLabel}>
        <span className={styles.detailIcon} aria-hidden="true">{icon}</span>
        {label}
      </dt>
      <dd className={styles.detailValue}>{value || '—'}</dd>
    </div>
  );
}

export default function PatientProfile({ patient }) {
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(null);

  const details = [
    { icon: <CalendarIcon />, label: 'Date Of Birth',      value: formatDate(patient?.date_of_birth) },
    { icon: <GenderIcon />,   label: 'Gender',             value: patient?.gender },
    { icon: <PhoneIcon />,    label: 'Contact Info.',       value: patient?.phone_number },
    {
      icon: <EmergencyIcon />,
      label: 'Emergency Contacts',
      value: typeof patient?.emergency_contact === 'object'
        ? patient?.emergency_contact?.phone_number
        : patient?.emergency_contact,
    },
    { icon: <InsuranceIcon />, label: 'Insurance Provider', value: patient?.insurance_type },
  ];

  /* ── Save patient to localStorage ── */
  const handleSave = useCallback(() => {
    if (!patient) return;
    try {
      const saved = JSON.parse(localStorage.getItem('savedPatients') || '[]');
      const already = saved.some((p) => p.name === patient.name);
      if (!already) {
        saved.push({ name: patient.name, savedAt: new Date().toISOString() });
        localStorage.setItem('savedPatients', JSON.stringify(saved));
        setToast({ message: `${patient.name} saved to your list.`, type: 'success' });
      } else {
        setToast({ message: `${patient.name} is already saved.`, type: 'info' });
      }
    } catch {
      setToast({ message: 'Could not save patient data.', type: 'error' });
    }
  }, [patient]);

  return (
    <>
      <section className={styles.card} aria-labelledby="profile-heading">
        {/* Avatar */}
        <div className={styles.avatarWrap}>
          {patient?.profile_picture ? (
            <Image
              src={patient.profile_picture}
              alt={`${patient?.name ?? 'Patient'}'s profile photo`}
              width={200}
              height={200}
              className={styles.avatar}
              unoptimized
              priority
            />
          ) : (
            <span className={styles.avatarFallback} aria-hidden="true">
              {getInitials(patient?.name)}
            </span>
          )}
        </div>

        <h2 id="profile-heading" className={styles.name}>
          {patient?.name ?? 'Unknown Patient'}
        </h2>

        <dl className={styles.details}>
          {details.map((d) => (
            <DetailRow key={d.label} {...d} />
          ))}
        </dl>

        {/* Action buttons */}
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.ctaSecondary}
            onClick={() => setShowModal(true)}
          >
            Show All Information
          </button>
          <button
            type="button"
            className={styles.ctaPrimary}
            onClick={handleSave}
            aria-label={`Save ${patient?.name ?? 'patient'} to your list`}
          >
            Save Patient
          </button>
        </div>
      </section>

      {/* ── Full information modal ── */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={`${patient?.name ?? 'Patient'} — Full Record`}
        position="center"
        width="620px"
      >
        <FullPatientRecord patient={patient} />
      </Modal>

      {/* ── Toast feedback ── */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDismiss={() => setToast(null)}
        />
      )}
    </>
  );
}

/* ── Full record content rendered inside the modal ── */
function FullPatientRecord({ patient }) {
  const diagnostics = getDiagnosticList(patient);
  const labs = getLabResults(patient);

  const allDetails = [
    { label: 'Full Name',           value: patient?.name },
    { label: 'Date of Birth',       value: formatDate(patient?.date_of_birth) },
    { label: 'Age',                 value: patient?.age ? `${patient.age} years` : '—' },
    { label: 'Gender',              value: patient?.gender },
    { label: 'Phone Number',        value: patient?.phone_number },
    { label: 'Emergency Contact',   value: typeof patient?.emergency_contact === 'object'
        ? patient?.emergency_contact?.phone_number
        : patient?.emergency_contact },
    { label: 'Insurance Provider',  value: patient?.insurance_type },
  ];

  return (
    <div className={styles.modalBody}>
      {/* Avatar + name */}
      <div className={styles.modalHero}>
        {patient?.profile_picture ? (
          <Image
            src={patient.profile_picture}
            alt=""
            width={80}
            height={80}
            className={styles.modalAvatar}
            unoptimized
          />
        ) : (
          <span className={styles.modalAvatarFallback}>{getInitials(patient?.name)}</span>
        )}
        <div>
          <p className={styles.modalName}>{patient?.name}</p>
          <p className={styles.modalSub}>{patient?.gender} · {patient?.age} yrs</p>
        </div>
      </div>

      {/* Personal details */}
      <section className={styles.modalSection}>
        <h3 className={styles.modalSectionTitle}>Personal Information</h3>
        <dl className={styles.modalDl}>
          {allDetails.map((d) => (
            <div key={d.label} className={styles.modalDlRow}>
              <dt className={styles.modalDt}>{d.label}</dt>
              <dd className={styles.modalDd}>{d.value || '—'}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Diagnostics */}
      {diagnostics.length > 0 && (
        <section className={styles.modalSection}>
          <h3 className={styles.modalSectionTitle}>Diagnostic List</h3>
          <ul className={styles.modalDiagList}>
            {diagnostics.map((d, i) => (
              <li key={i} className={styles.modalDiagRow}>
                <span className={styles.modalDiagName}>{d.name}</span>
                <span className={styles.modalDiagDesc}>{d.description}</span>
                <span className={`${styles.modalBadge} ${styles[`status_${(d.status ?? '').toLowerCase().replace(/\s+/g, '_')}`]}`}>
                  {d.status}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Lab results */}
      {labs.length > 0 && (
        <section className={styles.modalSection}>
          <h3 className={styles.modalSectionTitle}>Lab Results</h3>
          <ul className={styles.modalLabList}>
            {labs.map((lab, i) => (
              <li key={i} className={styles.modalLabRow}>
                <span>{typeof lab === 'string' ? lab : lab?.name ?? 'Lab Result'}</span>
                <span className={styles.modalLabStatus}>Available</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
