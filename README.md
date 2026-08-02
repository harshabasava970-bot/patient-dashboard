# Patient Dashboard — Jessica Taylor

A production-quality, responsive patient health dashboard built with Next.js 14, Chart.js, and CSS Modules. The UI closely follows the Adobe XD design spec and fetches live data from the Coalition Technologies Patient Data API.

---

## Features

- **Live API integration** — fetches from the Coalition Technologies Patient Data API using server-side Basic Auth (credentials never reach the browser)
- **Jessica Taylor focus** — only her record is displayed; all other patients in the API response are filtered out
- **Blood Pressure Chart** — interactive Chart.js line chart with systolic + diastolic trends, styled tooltips, and responsive sizing
- **Vitals Row** — respiratory rate, temperature, and heart rate with trend indicators
- **Diagnostic List** — tabular diagnosis/status display with color-coded badges
- **Lab Results** — downloadable results with accessible download buttons
- **Patient Profile** — avatar, demographics, contact info, and emergency contact
- **Loading Skeletons** — full-layout shimmer skeletons that mirror the real dashboard grid
- **Error State** — friendly error UI with a retry button
- **Responsive layout** — adapts from desktop (3-column) → tablet (1-column) → mobile
- **Accessible** — semantic HTML, ARIA labels, keyboard navigation, visible focus states, screen-reader text
- **CSS variables** — single source of truth for all colors, spacing, radius, shadows, and typography

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 14](https://nextjs.org/) (App Router) |
| Language | JavaScript (ES2022) |
| Styling | CSS Modules + CSS custom properties |
| Charts | [Chart.js 4](https://www.chartjs.org/) via [react-chartjs-2](https://react-chartjs-2.js.org/) |
| Font | [Manrope](https://fonts.google.com/specimen/Manrope) via `next/font/google` |
| Images | `next/image` with remote URL support |

---

## Prerequisites

- Node.js 18 or later
- npm 9 or later

---

## Installation

```bash
# 1. Install dependencies
npm install
```

---

## Environment Setup

```bash
# 2. Copy the example env file
cp .env.local.example .env.local
```

The `.env.local.example` file already contains the correct values:

```
API_BASE_URL=https://fedskillstest.coalitiontechnologies.workers.dev
API_USERNAME=coalition
API_PASSWORD=skills-test
```

These are read **only on the server** inside `src/app/api/patients/route.js`. They are never included in the browser bundle.

---

## Running Locally

```bash
# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Build

```bash
npm run build
npm start
```

---

## Linting

```bash
npm run lint
```

---

## Project Structure

```
src/
├── app/
│   ├── api/patients/route.js     # Server-side API proxy (Basic Auth here)
│   ├── globals.css               # Design tokens (CSS custom properties)
│   ├── layout.js                 # Root layout + Manrope font
│   └── page.js                   # Entry → renders <Dashboard />
│
├── components/
│   ├── Dashboard/                # Page shell, 3-column grid layout
│   ├── DiagnosisHistoryChart/    # Blood pressure line chart + stats panel
│   ├── DiagnosticList/           # Diagnosis table with status badges
│   ├── LabResults/               # Downloadable lab results list
│   ├── Navbar/                   # Top header with nav, doctor profile, actions
│   ├── PatientList/              # Left sidebar patient roster
│   ├── PatientProfile/           # Right sidebar profile card
│   ├── StatusStates/             # LoadingState (skeletons) + ErrorState
│   ├── VitalsRow/                # Respiratory rate, temperature, heart rate
│   └── icons.js                  # Inline SVG icon set
│
└── lib/
    ├── patients.js               # API response normalization utilities
    └── usePatientData.js         # React hook for fetching + filtering the patient
```

---

## API Reference

- **Docs**: https://documenter.getpostman.com/view/11861104/2sA35G42ve
- **Endpoint**: `GET https://fedskillstest.coalitiontechnologies.workers.dev`
- **Auth**: Basic Auth (`coalition` / `skills-test`)
- The app calls `/api/patients` (our proxy) rather than the upstream URL directly, keeping auth credentials server-side only.

---

## Design Reference

Adobe XD: https://xd.adobe.com/view/3f9ab587-7536-4db8-a7dd-64d474e10867-6ac9/
