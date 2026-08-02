/**
 * Inline SVG icon set — tree-shakeable, zero-dependency.
 * All icons use `currentColor` so they inherit their parent's color.
 */

export function SearchIcon(props) {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" aria-hidden="true" focusable="false" {...props}>
      <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.6" />
      <path d="m17 17-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function BellIcon(props) {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M5 8a5 5 0 1 1 10 0c0 2.7.9 4 1.5 4.7.3.3.1.9-.4.9H3.9c-.5 0-.7-.6-.4-.9C4.1 12 5 10.7 5 8Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M7.5 16a2.5 2.5 0 0 0 5 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function SettingsIcon(props) {
  return (
    <svg viewBox="0 0 20 20" width="20" height="20" fill="none" aria-hidden="true" focusable="false" {...props}>
      <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M17 10c0-.5-.1-1-.2-1.5l1.5-1.2-1.5-2.6-1.8.7a7 7 0 0 0-2.6-1.5L12 2H8l-.4 1.9a7 7 0 0 0-2.6 1.5l-1.8-.7L1.7 7.3l1.5 1.2C3.1 9 3 9.5 3 10s.1 1 .2 1.5l-1.5 1.2 1.5 2.6 1.8-.7c.8.6 1.7 1.1 2.6 1.5L8 18h4l.4-1.9c1-.4 1.8-.9 2.6-1.5l1.8.7 1.5-2.6-1.5-1.2c.1-.5.2-1 .2-1.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DotsVertIcon(props) {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <circle cx="10" cy="4" r="1.6" />
      <circle cx="10" cy="10" r="1.6" />
      <circle cx="10" cy="16" r="1.6" />
    </svg>
  );
}

export function DotsIcon(props) {
  return (
    <svg viewBox="0 0 20 5" width="20" height="5" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <circle cx="2.5" cy="2.5" r="2" />
      <circle cx="10" cy="2.5" r="2" />
      <circle cx="17.5" cy="2.5" r="2" />
    </svg>
  );
}

export function DownloadIcon(props) {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path d="M10 3v9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M6 9l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 16h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function PhoneIcon(props) {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M5.3 3.3 7 5.1c.3.4.2.9-.1 1.2L5.7 7.5a10 10 0 0 0 4.8 4.8l1.2-1.2c.3-.3.8-.4 1.2-.1l1.8 1.7c.5.4.6 1.1.2 1.6l-1.1 1.2c-.5.5-1.2.7-1.9.5a16 16 0 0 1-7.5-4.7 16 16 0 0 1-4.7-7.5c-.2-.7 0-1.4.5-1.9l1.2-1C2.1 2.7 2.9 2.8 3.3 3.3Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GenderIcon(props) {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="none" aria-hidden="true" focusable="false" {...props}>
      <circle cx="10" cy="10" r="4" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 2v4M10 14v4M4 10H2M18 10h-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function CalendarIcon(props) {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="none" aria-hidden="true" focusable="false" {...props}>
      <rect x="2.5" y="4" width="15" height="13" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M2.5 8.5h15M7 2v3M13 2v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

export function InsuranceIcon(props) {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M10 2 3 5v5c0 4 3 7 7 8 4-1 7-4 7-8V5l-7-3Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M7 10l2 2 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function EmergencyIcon(props) {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" fill="none" aria-hidden="true" focusable="false" {...props}>
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10 6v4M10 13.5v.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronUpIcon(props) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path d="M4 10l4-4 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronDownIcon(props) {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HeartRateIcon(props) {
  return (
    <svg viewBox="0 0 48 48" width="24" height="24" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M4 24h8l5-10 7 18 5-14 4 6h11"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function RespiratoryIcon(props) {
  return (
    <svg viewBox="0 0 48 48" width="24" height="24" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M24 8v14m0 0c-2-4-6-5-9-3-3.5 2.4-4.5 6-4 10 .5 3.5 3 7 6 7 2 0 4.5-3 4.5-7v-4m0 0c2-4 6-5 9-3 3.5 2.4 4.5 6 4 10-.5 3.5-3 7-6 7-2 0-4.5-3-4.5-7v-4"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TemperatureIcon(props) {
  return (
    <svg viewBox="0 0 48 48" width="24" height="24" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M24 28V12a4 4 0 1 0-8 0v16a8 8 0 1 0 8 0Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M20 28v-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export function ArrowUpIcon(props) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path d="M8 12V4M4 8l4-4 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowDownIcon(props) {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path d="M8 4v8M4 8l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
