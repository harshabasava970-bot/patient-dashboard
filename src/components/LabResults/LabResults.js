'use client';

import { useState } from 'react';
import styles from './LabResults.module.css';
import Modal from '../shared/Modal';
import { DownloadIcon } from '../icons';

/* Simulated report data keyed by report name */
const REPORT_DATA = {
  'Blood Tests': {
    date: 'August 1, 2026',
    orderedBy: 'Dr. Jose Simmons',
    results: [
      { test: 'Hemoglobin (Hgb)',        value: '13.2 g/dL',  range: '12.0 – 17.5 g/dL',  status: 'Normal'   },
      { test: 'White Blood Cells (WBC)', value: '10.8 K/µL',  range: '4.5 – 11.0 K/µL',   status: 'Normal'   },
      { test: 'Platelets',               value: '145 K/µL',   range: '150 – 400 K/µL',     status: 'Low'      },
      { test: 'Glucose (Fasting)',        value: '118 mg/dL',  range: '70 – 100 mg/dL',     status: 'High'     },
      { test: 'HbA1c',                   value: '6.4%',       range: '< 5.7%',              status: 'High'     },
      { test: 'Creatinine',              value: '0.9 mg/dL',  range: '0.6 – 1.2 mg/dL',    status: 'Normal'   },
      { test: 'Total Cholesterol',       value: '198 mg/dL',  range: '< 200 mg/dL',         status: 'Normal'   },
      { test: 'LDL Cholesterol',         value: '126 mg/dL',  range: '< 100 mg/dL',         status: 'High'     },
      { test: 'HDL Cholesterol',         value: '52 mg/dL',   range: '> 40 mg/dL',          status: 'Normal'   },
    ],
    notes: 'Glucose and LDL slightly elevated. Recommend dietary changes and follow-up in 3 months.',
  },
  'CT Scans': {
    date: 'July 15, 2026',
    orderedBy: 'Dr. Jose Simmons',
    results: [
      { test: 'Scan Region',             value: 'Abdomen & Pelvis', range: '—',             status: 'Normal'   },
      { test: 'Liver',                   value: 'No focal lesions',  range: '—',             status: 'Normal'   },
      { test: 'Kidneys',                 value: 'Mild cortical thinning (L)',  range: '—',   status: 'Review'   },
      { test: 'Spleen',                  value: 'Normal size',       range: '—',             status: 'Normal'   },
      { test: 'Lymph Nodes',             value: 'No enlargement',    range: '—',             status: 'Normal'   },
      { test: 'Bowel',                   value: 'No obstruction',    range: '—',             status: 'Normal'   },
    ],
    notes: 'Mild cortical thinning in left kidney noted. Recommend nephrology referral for further evaluation.',
  },
  'Radiology Reports': {
    date: 'June 22, 2026',
    orderedBy: 'Dr. Jose Simmons',
    results: [
      { test: 'Chest X-Ray',             value: 'PA view',            range: '—',            status: 'Normal'   },
      { test: 'Lung Fields',             value: 'Clear, no infiltrates', range: '—',          status: 'Normal'   },
      { test: 'Heart Size',              value: 'Normal cardiomegaly', range: '—',            status: 'Normal'   },
      { test: 'Pleural Space',           value: 'No effusion',         range: '—',            status: 'Normal'   },
      { test: 'Bone Density (Spine)',    value: 'T-score: –1.8',       range: '> –1.0',       status: 'Low'      },
    ],
    notes: 'Bone density borderline low. Consider DEXA scan and calcium/Vitamin D supplementation.',
  },
  'X-Rays': {
    date: 'May 10, 2026',
    orderedBy: 'Dr. Jose Simmons',
    results: [
      { test: 'Region',                  value: 'Right Knee',          range: '—',            status: 'Normal'   },
      { test: 'Joint Space',             value: 'Mild narrowing',       range: '—',            status: 'Review'   },
      { test: 'Bone Spurs',              value: 'Small osteophytes present', range: '—',       status: 'Review'   },
      { test: 'Soft Tissue',             value: 'No abnormal swelling', range: '—',            status: 'Normal'   },
      { test: 'Fractures',               value: 'None identified',      range: '—',            status: 'Normal'   },
    ],
    notes: 'Findings consistent with early osteoarthritis. Physiotherapy recommended.',
  },
};

function normalizeResult(result) {
  if (typeof result === 'string') return { label: result, url: null };
  return {
    label: result?.name ?? result?.test_name ?? 'Lab Result',
    url:   result?.url  ?? result?.file       ?? null,
  };
}

function statusClass(status) {
  if (status === 'High' || status === 'Low')   return styles.statusBad;
  if (status === 'Review')                      return styles.statusReview;
  return styles.statusNormal;
}

function ReportView({ item }) {
  const report = REPORT_DATA[item.label];

  if (!report) {
    return (
      <div className={styles.reportEmpty}>
        <p>No detailed report data available for <strong>{item.label}</strong>.</p>
      </div>
    );
  }

  return (
    <div className={styles.reportBody}>
      {/* Header meta */}
      <div className={styles.reportMeta}>
        <div className={styles.reportMetaItem}>
          <span className={styles.reportMetaLabel}>Report Date</span>
          <span className={styles.reportMetaValue}>{report.date}</span>
        </div>
        <div className={styles.reportMetaItem}>
          <span className={styles.reportMetaLabel}>Ordered By</span>
          <span className={styles.reportMetaValue}>{report.orderedBy}</span>
        </div>
        <div className={styles.reportMetaItem}>
          <span className={styles.reportMetaLabel}>Patient</span>
          <span className={styles.reportMetaValue}>Jessica Taylor</span>
        </div>
      </div>

      {/* Results table */}
      <div className={styles.reportTableWrap}>
        <table className={styles.reportTable}>
          <thead>
            <tr>
              <th>Test / Parameter</th>
              <th>Result</th>
              <th>Reference Range</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {report.results.map((r, i) => (
              <tr key={i}>
                <td className={styles.reportTestName}>{r.test}</td>
                <td className={styles.reportValue}>{r.value}</td>
                <td className={styles.reportRange}>{r.range}</td>
                <td>
                  <span className={`${styles.reportBadge} ${statusClass(r.status)}`}>
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Doctor notes */}
      <div className={styles.reportNotes}>
        <p className={styles.reportNotesLabel}>Physician Notes</p>
        <p className={styles.reportNotesText}>{report.notes}</p>
      </div>
    </div>
  );
}

export default function LabResults({ results }) {
  const [openReport, setOpenReport] = useState(null);
  const items = results.map(normalizeResult);

  return (
    <>
      <section className={styles.card} aria-labelledby="lab-results-heading">
        <h2 id="lab-results-heading" className={styles.title}>Lab Results</h2>

        {items.length === 0 ? (
          <p className={styles.empty}>No lab results available.</p>
        ) : (
          <ul className={styles.list} role="list">
            {items.map((item, index) => (
              <li key={`${item.label}-${index}`} className={styles.row}>
                <button
                  type="button"
                  className={styles.rowBtn}
                  onClick={() => setOpenReport(item)}
                  aria-label={`View ${item.label} report`}
                >
                  <span className={styles.label}>{item.label}</span>
                </button>
                <button
                  type="button"
                  className={styles.downloadBtn}
                  aria-label={`Download ${item.label}`}
                  onClick={() => setOpenReport(item)}
                >
                  <DownloadIcon />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Report viewer modal */}
      {openReport && (
        <Modal
          isOpen={!!openReport}
          onClose={() => setOpenReport(null)}
          title={`${openReport.label} — Report`}
          position="center"
          width="700px"
        >
          <ReportView item={openReport} />
        </Modal>
      )}
    </>
  );
}
