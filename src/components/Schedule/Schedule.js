'use client';

import { useMemo, useState } from 'react';
import styles from './Schedule.module.css';
import { CalendarIcon } from '../icons';
import { formatDate } from '../../lib/patients';
import Modal from '../shared/Modal';
import Toast from '../shared/Toast';

const TIMES  = ['08:00 AM','08:45 AM','09:30 AM','10:15 AM','11:00 AM',
                '11:45 AM','01:00 PM','01:45 PM','02:30 PM','03:15 PM',
                '04:00 PM','04:45 PM'];
const TYPES  = ['Follow-up','Consultation','Check-up','Lab Review','Urgent Care','Routine Visit'];
const COLORS = ['teal','purple','orange','pink','blue','red'];
const DAYS   = ['Monday','Tuesday','Wednesday','Thursday','Friday'];

const APPT_TYPES = ['Follow-up','Consultation','Check-up','Lab Review','Urgent Care','Routine Visit','Initial Visit'];

function getDayDate(idx) {
  const d = new Date(2026, 7, 3 + idx);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function Schedule({ patients }) {
  const [confirmedIds, setConfirmedIds] = useState(new Set());
  const [viewAppt, setViewAppt]         = useState(null);  // appointment being confirmed
  const [showNewForm, setShowNewForm]   = useState(false);
  const [newAppts, setNewAppts]         = useState([]);
  const [toast, setToast]               = useState(null);

  const baseAppointments = useMemo(() =>
    patients.slice(0, 12).map((p, i) => ({
      id: i,
      patient: p.name,
      phone: p.phone_number ?? '—',
      insurance: p.insurance_type ?? '—',
      dob: p.date_of_birth,
      gender: p.gender ?? '—',
      time: TIMES[i % TIMES.length],
      day: DAYS[i % DAYS.length],
      type: TYPES[i % TYPES.length],
      color: COLORS[i % COLORS.length],
      initials: p.name.split(' ').map((w) => w[0]).join('').slice(0,2).toUpperCase(),
    })),
  [patients]);

  const appointments = useMemo(
    () => [...baseAppointments, ...newAppts],
    [baseAppointments, newAppts]
  );

  const byDay = useMemo(() => {
    const map = {};
    DAYS.forEach((d, i) => { map[d] = { label: d, date: getDayDate(i), items: [] }; });
    appointments.forEach((a) => { if (map[a.day]) map[a.day].items.push(a); });
    return Object.values(map);
  }, [appointments]);

  function handleConfirm(appt) {
    setConfirmedIds((prev) => new Set([...prev, appt.id]));
    setViewAppt(null);
    setToast({ message: `Appointment confirmed for ${appt.patient} on ${appt.day} at ${appt.time}.`, type: 'success' });
  }

  function handleNewAppointment(appt) {
    setNewAppts((prev) => [...prev, { ...appt, id: Date.now(), color: COLORS[prev.length % COLORS.length] }]);
    setShowNewForm(false);
    setToast({ message: `New appointment booked for ${appt.patient} on ${appt.day} at ${appt.time}.`, type: 'success' });
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        {/* Header */}
        <div className={styles.topRow}>
          <div>
            <h1 className={styles.heading}>Appointment Schedule</h1>
            <p className={styles.sub}>Week of August 3 – 7, 2026 · Dr. Jose Simmons</p>
          </div>
          <button type="button" className={styles.newBtn} onClick={() => setShowNewForm(true)}>
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
                {day.items.length === 0 && <p className={styles.noSlots}>No appointments</p>}
                {day.items.map((appt) => (
                  <button
                    key={appt.id}
                    type="button"
                    className={`${styles.apptCard} ${styles[appt.color]} ${confirmedIds.has(appt.id) ? styles.apptConfirmed : ''}`}
                    onClick={() => setViewAppt(appt)}
                    aria-label={`View appointment: ${appt.patient}, ${appt.type}, ${appt.time}`}
                  >
                    <div className={styles.apptTime}>{appt.time}</div>
                    <div className={styles.apptAvatar}>{appt.initials}</div>
                    <div className={styles.apptInfo}>
                      <p className={styles.apptName}>{appt.patient}</p>
                      <p className={styles.apptType}>{appt.type}</p>
                    </div>
                    {confirmedIds.has(appt.id) && <span className={styles.confirmedTick} aria-hidden="true">✓</span>}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Upcoming list */}
        <section className={styles.upcomingCard} aria-labelledby="upcoming-heading">
          <h2 id="upcoming-heading" className={styles.upcomingTitle}>All Upcoming Appointments</h2>
          <div className={styles.upcomingList}>
            {appointments.map((appt) => {
              const isConfirmed = confirmedIds.has(appt.id);
              return (
                <div key={appt.id} className={styles.upcomingRow}>
                  <span className={`${styles.upcomingDot} ${styles[appt.color]}`} aria-hidden="true" />
                  <span className={styles.upcomingAvatar}>{appt.initials}</span>
                  <div className={styles.upcomingInfo}>
                    <p className={styles.upcomingName}>{appt.patient}</p>
                    <p className={styles.upcomingMeta}>{appt.type} · {formatDate(appt.dob)}</p>
                  </div>
                  <div className={styles.upcomingTime}>
                    <p className={styles.upcomingDay}>{appt.day}</p>
                    <p className={styles.upcomingHour}>{appt.time}</p>
                  </div>
                  {isConfirmed ? (
                    <span className={styles.confirmedBadge}>✓ Confirmed</span>
                  ) : (
                    <button
                      type="button"
                      className={styles.confirmBtn}
                      onClick={() => setViewAppt(appt)}
                    >
                      Confirm
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* ── Appointment details + confirm modal ── */}
      {viewAppt && (
        <Modal
          isOpen={!!viewAppt}
          onClose={() => setViewAppt(null)}
          title="Appointment Details"
          position="center"
          width="520px"
        >
          <div className={styles.apptModalBody}>
            <div className={styles.apptModalHero}>
              <span className={`${styles.apptModalAvatar} ${styles[viewAppt.color]}`}>{viewAppt.initials}</span>
              <div>
                <p className={styles.apptModalName}>{viewAppt.patient}</p>
                <p className={styles.apptModalSub}>{viewAppt.gender} · DOB: {formatDate(viewAppt.dob)}</p>
              </div>
            </div>

            <dl className={styles.apptModalDl}>
              <div className={styles.apptModalRow}><dt>Appointment Type</dt><dd>{viewAppt.type}</dd></div>
              <div className={styles.apptModalRow}><dt>Day</dt>            <dd>{viewAppt.day}</dd></div>
              <div className={styles.apptModalRow}><dt>Time</dt>           <dd>{viewAppt.time}</dd></div>
              <div className={styles.apptModalRow}><dt>Phone</dt>          <dd>{viewAppt.phone}</dd></div>
              <div className={styles.apptModalRow}><dt>Insurance</dt>      <dd>{viewAppt.insurance}</dd></div>
              <div className={styles.apptModalRow}>
                <dt>Status</dt>
                <dd>
                  <span className={confirmedIds.has(viewAppt.id) ? styles.statusConfirmed : styles.statusPending}>
                    {confirmedIds.has(viewAppt.id) ? '✓ Confirmed' : 'Pending confirmation'}
                  </span>
                </dd>
              </div>
            </dl>

            <div className={styles.apptModalActions}>
              <button type="button" className={styles.cancelApptBtn} onClick={() => setViewAppt(null)}>Close</button>
              {!confirmedIds.has(viewAppt.id) && (
                <button type="button" className={styles.confirmApptBtn} onClick={() => handleConfirm(viewAppt)}>
                  Confirm Appointment
                </button>
              )}
            </div>
          </div>
        </Modal>
      )}

      {/* ── New Appointment form ── */}
      <NewAppointmentModal
        isOpen={showNewForm}
        onClose={() => setShowNewForm(false)}
        patients={patients}
        onSubmit={handleNewAppointment}
      />

      {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}
    </div>
  );
}

/* ── New Appointment Form ── */
function NewAppointmentModal({ isOpen, onClose, patients, onSubmit }) {
  const [form, setForm] = useState({
    patient: '', day: 'Monday', time: TIMES[0], type: APPT_TYPES[0],
  });
  const [error, setError] = useState('');

  function set(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setError('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.patient) { setError('Please select a patient.'); return; }
    const p = patients.find((pt) => pt.name === form.patient);
    const initials = form.patient.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
    onSubmit({
      patient: form.patient,
      phone: p?.phone_number ?? '—',
      insurance: p?.insurance_type ?? '—',
      dob: p?.date_of_birth ?? null,
      gender: p?.gender ?? '—',
      day: form.day,
      time: form.time,
      type: form.type,
      initials,
    });
    setForm({ patient: '', day: 'Monday', time: TIMES[0], type: APPT_TYPES[0] });
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Book New Appointment" position="center" width="480px">
      <form className={styles.newApptForm} onSubmit={handleSubmit} noValidate>
        <label className={styles.formLabel}>
          Patient
          <select
            className={styles.formSelect}
            value={form.patient}
            onChange={(e) => set('patient', e.target.value)}
            required
          >
            <option value="">— Select a patient —</option>
            {patients.map((p) => (
              <option key={p.name} value={p.name}>{p.name}</option>
            ))}
          </select>
        </label>

        <label className={styles.formLabel}>
          Appointment Type
          <select className={styles.formSelect} value={form.type} onChange={(e) => set('type', e.target.value)}>
            {APPT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </label>

        <label className={styles.formLabel}>
          Day
          <select className={styles.formSelect} value={form.day} onChange={(e) => set('day', e.target.value)}>
            {DAYS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </label>

        <label className={styles.formLabel}>
          Time
          <select className={styles.formSelect} value={form.time} onChange={(e) => set('time', e.target.value)}>
            {TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </label>

        {error && <p className={styles.formError} role="alert">{error}</p>}

        <div className={styles.formActions}>
          <button type="button" className={styles.cancelApptBtn} onClick={onClose}>Cancel</button>
          <button type="submit" className={styles.confirmApptBtn}>Book Appointment</button>
        </div>
      </form>
    </Modal>
  );
}
