import Image from 'next/image';
import styles from './PatientProfile.module.css';
import {
  CalendarIcon,
  GenderIcon,
  PhoneIcon,
  EmergencyIcon,
  InsuranceIcon,
} from '../icons';
import { formatDate } from '../../lib/patients';

function getInitials(name = '') {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function PatientProfile({ patient }) {
  const details = [
    {
      icon: <CalendarIcon />,
      label: 'Date Of Birth',
      value: formatDate(patient?.date_of_birth),
    },
    {
      icon: <GenderIcon />,
      label: 'Gender',
      value: patient?.gender ?? '—',
    },
    {
      icon: <PhoneIcon />,
      label: 'Contact Info.',
      value: patient?.phone_number ?? '—',
    },
    {
      icon: <EmergencyIcon />,
      label: 'Emergency Contacts',
      value:
        typeof patient?.emergency_contact === 'object'
          ? patient?.emergency_contact?.phone_number ?? '—'
          : patient?.emergency_contact ?? '—',
    },
    {
      icon: <InsuranceIcon />,
      label: 'Insurance Provider',
      value: patient?.insurance_type ?? '—',
    },
  ];

  return (
    <section className={styles.card} aria-labelledby="profile-heading">
      {/* Avatar */}
      <div className={styles.avatarWrap}>
        {patient?.profile_picture ? (
          <Image
            src={patient.profile_picture}
            alt={`${patient.name ?? 'Patient'}'s profile photo`}
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

      {/* Name + subline */}
      <h2 id="profile-heading" className={styles.name}>
        {patient?.name ?? 'Unknown Patient'}
      </h2>

      {/* Detail rows */}
      <dl className={styles.details}>
        {details.map((detail) => (
          <div key={detail.label} className={styles.detailRow}>
            <dt className={styles.detailLabel}>
              <span className={styles.detailIcon} aria-hidden="true">
                {detail.icon}
              </span>
              {detail.label}
            </dt>
            <dd className={styles.detailValue}>{detail.value}</dd>
          </div>
        ))}
      </dl>

      {/* CTA */}
      <button type="button" className={styles.cta}>
        Show All Information
      </button>
    </section>
  );
}
