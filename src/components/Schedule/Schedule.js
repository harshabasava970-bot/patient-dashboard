'use client';

import { useMemo } from 'react';
import styles from './Schedule.module.css';
import { CalendarIcon } from '../icons';
import { formatDate } from '../../lib/patients';

/* Deterministic appointment slots generated from patient data */
const TIMES = ['08:00 AM', '08:45 AM', '09:30 AM', '10:15 AM', '11:00 AM',
               '11:45 AM', '01:00 PM', '01:45 PM', '02:30 PM', '03:15 PM',
               '04:00 PM', '04:45 PM'];

const TYPES = ['Follow-up', 'Consultation', 'Check-up', 'Lab Review', 'Urgent Care', 'Routine Visit'];
const COLORS = ['teal', 'purple', 'orange', 'pink', 'blue', 'red'];

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

function getDayDate(dayIndex) {
  const today = new Date(2026, 7, 3); // Aug 3 2026 = Monday
  const d = new Date(today);
  d.setDate(today.getDate() + dayIndex);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function Schedule({ patients }) {
  const appointments = useMemo(() => {
    return patients.slice(0, 12).map((p, i) => ({
      id: i,
      patient: p.name,
      dob: p.date_of_birth,
      time: TIMES[i % TIMES.length],
      day: DAYS[i % DAYS.length],
      dayIndex: i % 5,
      type: TYPES[i % TYPES.length],
      color: COLORS[i % COLORS.length],
      initials: p.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase(),
    }));
  }, [patients]);

  const byDay = useMemo(() => {
    const map = {};
    DAYS.forEach((d, i) => { map[d] = { label: d, date: getDayDate(i), items: [] }; });
    appointments.forEach((a) => { map[a.day].items.push(a); });
    return Object.values(map);
  }, [appointments]);

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.topRow}>
          <div>
            <h1 className={styles.heading}>Appointment Schedule</h1>
            <p className={styles.sub}>Week of August 3 – 7, 2026 &nbsp;·&nbsp; Dr. Jose Simmons</p>
          </div>
          <button type="button" className={styles.newBtn}>
            <CalendarIcon />
            New Appointment
          </button>
        </div>

        {/* Summary pills */}
        <div className={styles.summaryRow}>
          <div className={styles.summaryPill}>
            <span className={styles.summaryNum}>{appointments.length}</span>
            <span className={styles.summaryLabel}>Total this week</span>
          </div>
          {TYPES.slice(0, 4).map((type) => {
            const count = appointments.filter((a) => a.type === type).length;
            if (!count) return null;
            return (
              <div key={type} className={styles.summaryPill}>
                <span className={styles.summaryNum}>{count}</span>
                <span className={styles.summaryLabel}>{type}</span>
              </div>
            );
          })}
        </div>

        {/* Weekly grid */}
        <div className={styles.weekGrid}>
          {byDay.map((day) => (
            <div key={day.label} className={styles.dayCol}>
              <div className={styles.dayHeader}>
                <span className={styles.dayName}>{day.label}</span>
                <span className={styles.dayDate}>{day.date}</span>
              </div>
              <div className={styles.daySlots}>
                {day.items.length === 0 && (
                  <p className={styles.noSlots}>No appointments</p>
                )}
                {day.items.map((appt) => (
                  <div key={appt.id} className={`${styles.apptCard} ${styles[appt.color]}`}>
                    <div className={styles.apptTime}>{appt.time}</div>
                    <div className={styles.apptAvatar}>{appt.initials}</div>
                    <div className={styles.apptInfo}>
                      <p className={styles.apptName}>{appt.patient}</p>
                      <p className={styles.apptType}>{appt.type}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming list */}
        <section className={styles.upcomingCard} aria-labelledby="upcoming-heading">
          <h2 id="upcoming-heading" className={styles.upcomingTitle}>All Upcoming Appointments</h2>
          <div className={styles.upcomingList}>
            {appointments.map((appt) => (
              <div key={appt.id} className={styles.upcomingRow}>
                <span className={`${styles.upcomingDot} ${styles[appt.color]}`} aria-hidden="true" />
                <span className={styles.upcomingAvatar}>{appt.initials}</span>
                <div className={styles.upcomingInfo}>
                  <p className={styles.upcomingName}>{appt.patient}</p>
                  <p className={styles.upcomingMeta}>{appt.type} &nbsp;·&nbsp; {formatDate(appt.dob)}</p>
                </div>
                <div className={styles.upcomingTime}>
                  <p className={styles.upcomingDay}>{appt.day}</p>
                  <p className={styles.upcomingHour}>{appt.time}</p>
                </div>
                <button type="button" className={styles.confirmBtn}>Confirm</button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
