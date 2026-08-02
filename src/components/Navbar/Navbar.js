'use client';

import { useState } from 'react';
import styles from './Navbar.module.css';
import { BellIcon, SettingsIcon } from '../icons';
import Modal from '../shared/Modal';

const NAV_LINKS = ['Overview', 'Patients', 'Schedule', 'Message', 'Transactions'];

const NOTIFICATIONS = [
  { id: 1, type: 'alert',   title: 'High BP Alert',         body: 'Jessica Taylor — Systolic 160 mmHg. Follow-up recommended.',    time: '2h ago',   unread: true  },
  { id: 2, type: 'lab',     title: 'Lab Results Ready',      body: 'Blood Tests for Ryan Johnson are ready for review.',             time: '4h ago',   unread: true  },
  { id: 3, type: 'appt',    title: 'Appointment Tomorrow',   body: 'Brandon Mitchell — Check-up at 9:30 AM.',                        time: '6h ago',   unread: true  },
  { id: 4, type: 'msg',     title: 'New Message',            body: 'Samantha Johnson sent a message regarding medication refill.',   time: '1d ago',   unread: false },
  { id: 5, type: 'lab',     title: 'X-Ray Report Available', body: 'Olivia Brown — Radiology report ready for review.',              time: '1d ago',   unread: false },
  { id: 6, type: 'appt',    title: 'Appointment Confirmed',  body: 'Tyler Davis confirmed his Follow-up for Friday 4:00 PM.',        time: '2d ago',   unread: false },
];

const TYPE_COLOR = {
  alert: styles.notifAlert,
  lab:   styles.notifLab,
  appt:  styles.notifAppt,
  msg:   styles.notifMsg,
};

const TYPE_ICON = {
  alert: '⚠',
  lab:   '🧪',
  appt:  '📅',
  msg:   '💬',
};

export default function Navbar({ activeNav = 'Patients', onNavChange }) {
  const [showNotif, setShowNotif]       = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const unreadCount = notifications.filter((n) => n.unread).length;

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  }

  function dismissNotif(id) {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }

  return (
    <>
      <header className={styles.navbar} role="banner">
        {/* Brand */}
        <a href="/" className={styles.brand} aria-label="TechCare — go to home">
          <svg viewBox="0 0 140 36" className={styles.logo} aria-hidden="true">
            <rect width="36" height="36" rx="10" fill="#01606c" />
            <rect x="15" y="9" width="6" height="18" rx="3" fill="white" />
            <rect x="9" y="15" width="18" height="6" rx="3" fill="white" />
            <text x="44" y="25" fontFamily="Manrope, Inter, sans-serif" fontSize="17" fontWeight="800" fill="#072635">
              TechCare
            </text>
          </svg>
        </a>

        {/* Nav */}
        <nav className={styles.nav} aria-label="Primary navigation">
          <ul className={styles.navList} role="list">
            {NAV_LINKS.map((label) => {
              const isActive = label === activeNav;
              return (
                <li key={label}>
                  <button
                    type="button"
                    className={isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => onNavChange?.(label)}
                  >
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Actions */}
        <div className={styles.actions}>
          <div className={styles.profile}>
            <span className={styles.profileAvatarFallback} aria-hidden="true">JS</span>
            <span className={styles.profileText}>
              <span className={styles.profileName}>Dr. Jose Simmons</span>
              <span className={styles.profileRole}>General Practitioner</span>
            </span>
          </div>

          <span className={styles.divider} aria-hidden="true" />

          <button
            type="button"
            className={styles.iconButton}
            aria-label="Open settings"
            onClick={() => setShowSettings(true)}
          >
            <SettingsIcon />
          </button>

          <button
            type="button"
            className={styles.iconButton}
            aria-label={`View notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
            onClick={() => setShowNotif(true)}
          >
            <span className={styles.bellWrap}>
              <BellIcon />
              {unreadCount > 0 && (
                <span className={styles.badge} aria-hidden="true">{unreadCount}</span>
              )}
            </span>
          </button>
        </div>
      </header>

      {/* ── Notifications panel ── */}
      <Modal
        isOpen={showNotif}
        onClose={() => setShowNotif(false)}
        title="Notifications"
        position="right"
      >
        <div className={styles.notifHeader}>
          <span className={styles.notifCount}>{unreadCount} unread</span>
          <button type="button" className={styles.markAllBtn} onClick={markAllRead}>
            Mark all read
          </button>
        </div>

        {notifications.length === 0 ? (
          <p className={styles.notifEmpty}>You&apos;re all caught up!</p>
        ) : (
          <ul className={styles.notifList}>
            {notifications.map((n) => (
              <li key={n.id} className={`${styles.notifItem} ${n.unread ? styles.notifUnread : ''}`}>
                <span className={`${styles.notifIcon} ${TYPE_COLOR[n.type] ?? ''}`} aria-hidden="true">
                  {TYPE_ICON[n.type] ?? '🔔'}
                </span>
                <div className={styles.notifBody}>
                  <p className={styles.notifTitle}>{n.title}</p>
                  <p className={styles.notifText}>{n.body}</p>
                  <p className={styles.notifTime}>{n.time}</p>
                </div>
                <button
                  type="button"
                  className={styles.notifDismiss}
                  aria-label={`Dismiss: ${n.title}`}
                  onClick={() => dismissNotif(n.id)}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </Modal>

      {/* ── Settings panel ── */}
      <Modal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        title="Settings"
        position="right"
      >
        <div className={styles.settingsBody}>
          <SettingsSection title="Account">
            <SettingsRow label="Name"          value="Dr. Jose Simmons" />
            <SettingsRow label="Role"          value="General Practitioner" />
            <SettingsRow label="Email"         value="j.simmons@techcare.io" />
            <SettingsRow label="License No."   value="GP-2024-00412" />
          </SettingsSection>

          <SettingsSection title="Appearance">
            <SettingsToggle label="Dark mode"           defaultChecked={false} />
            <SettingsToggle label="Compact layout"      defaultChecked={false} />
            <SettingsToggle label="Show patient avatars" defaultChecked={true}  />
          </SettingsSection>

          <SettingsSection title="Notifications">
            <SettingsToggle label="Lab result alerts"       defaultChecked={true}  />
            <SettingsToggle label="Appointment reminders"   defaultChecked={true}  />
            <SettingsToggle label="High-vitals alerts"      defaultChecked={true}  />
            <SettingsToggle label="New messages"            defaultChecked={false} />
          </SettingsSection>

          <SettingsSection title="Data & Privacy">
            <SettingsRow label="Data region"     value="US East" />
            <SettingsRow label="Session timeout" value="30 minutes" />
            <SettingsToggle label="Audit logging"       defaultChecked={true} />
            <SettingsToggle label="Two-factor auth"     defaultChecked={true} />
          </SettingsSection>

          <button type="button" className={styles.saveSettingsBtn}>
            Save Changes
          </button>
        </div>
      </Modal>
    </>
  );
}

function SettingsSection({ title, children }) {
  return (
    <section className={styles.settingsSection}>
      <h3 className={styles.settingsSectionTitle}>{title}</h3>
      <div className={styles.settingsSectionBody}>{children}</div>
    </section>
  );
}

function SettingsRow({ label, value }) {
  return (
    <div className={styles.settingsRow}>
      <span className={styles.settingsLabel}>{label}</span>
      <span className={styles.settingsValue}>{value}</span>
    </div>
  );
}

function SettingsToggle({ label, defaultChecked }) {
  const [on, setOn] = useState(defaultChecked);
  const id = `toggle-${label.replace(/\s+/g, '-').toLowerCase()}`;
  return (
    <div className={styles.settingsRow}>
      <label className={styles.settingsLabel} htmlFor={id}>{label}</label>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={on}
        aria-label={label}
        className={`${styles.toggle} ${on ? styles.toggleOn : ''}`}
        onClick={() => setOn((v) => !v)}
      >
        <span className={styles.toggleThumb} />
      </button>
    </div>
  );
}
