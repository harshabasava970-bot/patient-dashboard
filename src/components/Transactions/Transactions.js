'use client';

import { useMemo, useState } from 'react';
import styles from './Transactions.module.css';

const SERVICE_TYPES = [
  'General Consultation', 'Blood Test Panel', 'CT Scan', 'X-Ray',
  'Follow-up Visit', 'Urine Analysis', 'Radiology Report', 'Specialist Referral',
];

const AMOUNTS = [120, 85, 340, 180, 75, 60, 220, 95, 150, 260, 110, 45];
const STATUSES = ['Paid', 'Paid', 'Paid', 'Pending', 'Paid', 'Paid', 'Overdue', 'Paid'];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
const DAYS_LIST = [5, 12, 18, 3, 22, 9, 15, 27, 7, 19, 11, 24];

function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`;
}

export default function Transactions({ patients }) {
  const [filter, setFilter] = useState('All');

  const transactions = useMemo(() =>
    patients.slice(0, 12).map((p, i) => ({
      id: `TXN-${String(i + 1001).padStart(5, '0')}`,
      patient: p.name,
      initials: p.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase(),
      insurance: p.insurance_type ?? 'Self-Pay',
      service: SERVICE_TYPES[i % SERVICE_TYPES.length],
      amount: AMOUNTS[i % AMOUNTS.length],
      status: STATUSES[i % STATUSES.length],
      date: `${MONTHS[i % MONTHS.length]} ${DAYS_LIST[i % DAYS_LIST.length]}, 2026`,
    })),
  [patients]);

  const totals = useMemo(() => ({
    total: transactions.reduce((s, t) => s + t.amount, 0),
    paid: transactions.filter((t) => t.status === 'Paid').reduce((s, t) => s + t.amount, 0),
    pending: transactions.filter((t) => t.status === 'Pending').reduce((s, t) => s + t.amount, 0),
    overdue: transactions.filter((t) => t.status === 'Overdue').reduce((s, t) => s + t.amount, 0),
  }), [transactions]);

  const FILTERS = ['All', 'Paid', 'Pending', 'Overdue'];
  const visible = filter === 'All' ? transactions : transactions.filter((t) => t.status === filter);

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.heading}>Transactions</h1>
        <p className={styles.sub}>Billing and payment history for all patients.</p>

        {/* Summary cards */}
        <div className={styles.statsGrid}>
          <div className={`${styles.statCard} ${styles.teal}`}>
            <p className={styles.statLabel}>Total Billed</p>
            <p className={styles.statValue}>{formatCurrency(totals.total)}</p>
          </div>
          <div className={`${styles.statCard} ${styles.green}`}>
            <p className={styles.statLabel}>Collected</p>
            <p className={styles.statValue}>{formatCurrency(totals.paid)}</p>
          </div>
          <div className={`${styles.statCard} ${styles.orange}`}>
            <p className={styles.statLabel}>Pending</p>
            <p className={styles.statValue}>{formatCurrency(totals.pending)}</p>
          </div>
          <div className={`${styles.statCard} ${styles.red}`}>
            <p className={styles.statLabel}>Overdue</p>
            <p className={styles.statValue}>{formatCurrency(totals.overdue)}</p>
          </div>
        </div>

        {/* Filter pills */}
        <div className={styles.filterRow} role="group" aria-label="Filter transactions">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              className={`${styles.filterBtn} ${filter === f ? styles.filterBtnActive : ''}`}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
            >
              {f}
              <span className={styles.filterCount}>
                {f === 'All' ? transactions.length : transactions.filter((t) => t.status === f).length}
              </span>
            </button>
          ))}
        </div>

        {/* Table */}
        <section className={styles.tableCard} aria-labelledby="txn-table-heading">
          <h2 id="txn-table-heading" className={styles.tableTitle}>
            {filter === 'All' ? 'All Transactions' : `${filter} Transactions`}
          </h2>
          <div className={styles.tableScroll}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.th}>Transaction ID</th>
                  <th className={styles.th}>Patient</th>
                  <th className={styles.th}>Service</th>
                  <th className={styles.th}>Insurance</th>
                  <th className={styles.th}>Date</th>
                  <th className={styles.th}>Amount</th>
                  <th className={styles.th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((txn) => (
                  <tr key={txn.id} className={styles.tr}>
                    <td className={styles.td}>
                      <span className={styles.txnId}>{txn.id}</span>
                    </td>
                    <td className={styles.td}>
                      <div className={styles.patientCell}>
                        <span className={styles.avatar}>{txn.initials}</span>
                        {txn.patient}
                      </div>
                    </td>
                    <td className={styles.td}>{txn.service}</td>
                    <td className={styles.td}>{txn.insurance}</td>
                    <td className={styles.td}>{txn.date}</td>
                    <td className={`${styles.td} ${styles.amount}`}>
                      {formatCurrency(txn.amount)}
                    </td>
                    <td className={styles.td}>
                      <span className={`${styles.badge} ${styles[`badge${txn.status}`]}`}>
                        {txn.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {visible.length === 0 && (
            <p className={styles.empty}>No {filter.toLowerCase()} transactions.</p>
          )}
        </section>
      </div>
    </div>
  );
}
