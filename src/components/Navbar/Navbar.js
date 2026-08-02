'use client';

import styles from './Navbar.module.css';
import { BellIcon, SettingsIcon } from '../icons';

const NAV_LINKS = ['Overview', 'Patients', 'Schedule', 'Message', 'Transactions'];

export default function Navbar({ activeNav = 'Patients', onNavChange }) {
  return (
    <header className={styles.navbar} role="banner">
      {/* Brand logo */}
      <a href="/" className={styles.brand} aria-label="TechCare — go to home">
        <svg viewBox="0 0 140 36" className={styles.logo} aria-hidden="true">
          <rect width="36" height="36" rx="10" fill="#01606c" />
          <rect x="15" y="9" width="6" height="18" rx="3" fill="white" />
          <rect x="9" y="15" width="18" height="6" rx="3" fill="white" />
          <text
            x="44"
            y="25"
            fontFamily="Manrope, Inter, sans-serif"
            fontSize="17"
            fontWeight="800"
            fill="#072635"
          >
            TechCare
          </text>
        </svg>
      </a>

      {/* Primary navigation */}
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

      {/* Right-side actions */}
      <div className={styles.actions}>
        <div className={styles.profile}>
          <span className={styles.profileAvatarFallback} aria-hidden="true">JS</span>
          <span className={styles.profileText}>
            <span className={styles.profileName}>Dr. Jose Simmons</span>
            <span className={styles.profileRole}>General Practitioner</span>
          </span>
        </div>

        <span className={styles.divider} aria-hidden="true" />

        <button type="button" className={styles.iconButton} aria-label="Open settings">
          <SettingsIcon />
        </button>
        <button type="button" className={styles.iconButton} aria-label="View notifications">
          <BellIcon />
        </button>
      </div>
    </header>
  );
}
