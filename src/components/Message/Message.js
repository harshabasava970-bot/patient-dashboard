'use client';

import { useState, useMemo } from 'react';
import styles from './Message.module.css';
import { SearchIcon } from '../icons';

const MESSAGE_TEMPLATES = [
  'Please schedule a follow-up for your recent lab results.',
  'Your prescription renewal is ready for pickup.',
  'Reminder: Your appointment is tomorrow at 10:00 AM.',
  'Your blood pressure readings have improved. Keep it up!',
  'Please fast for 12 hours before your next blood test.',
  'We have received your insurance pre-authorization.',
  'Your referral to the specialist has been sent.',
  'Lab results are available in your patient portal.',
  'Reminder to take your medication as prescribed.',
  'Please complete your patient intake form online.',
  'Your CT scan results are ready for review.',
  'Annual check-up reminder: it has been 12 months.',
];

const HOURS_AGO = [2, 14, 27, 45, 60, 72, 90, 110, 130, 148, 165, 180];

function timeAgo(hours) {
  if (hours < 1) return 'Just now';
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function Message({ patients }) {
  const threads = useMemo(() =>
    patients.slice(0, 12).map((p, i) => ({
      id: i,
      name: p.name,
      initials: p.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase(),
      preview: MESSAGE_TEMPLATES[i % MESSAGE_TEMPLATES.length],
      time: timeAgo(HOURS_AGO[i % HOURS_AGO.length]),
      unread: i < 4,
      gender: p.gender,
      age: p.age,
      phone: p.phone_number,
    })),
  [patients]);

  const [activeId, setActiveId] = useState(0);
  const [query, setQuery] = useState('');
  const [replyText, setReplyText] = useState('');
  const [sent, setSent] = useState([]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return q ? threads.filter((t) => t.name.toLowerCase().includes(q)) : threads;
  }, [threads, query]);

  const active = threads.find((t) => t.id === activeId) ?? threads[0];

  function handleSend(e) {
    e.preventDefault();
    if (!replyText.trim()) return;
    setSent((prev) => [...prev, { text: replyText.trim(), time: 'Just now' }]);
    setReplyText('');
  }

  return (
    <div className={styles.page}>
      {/* Thread list */}
      <aside className={styles.sidebar} aria-label="Message threads">
        <div className={styles.sideHeader}>
          <h1 className={styles.sideTitle}>Messages</h1>
          <span className={styles.unreadBadge}>{threads.filter((t) => t.unread).length} new</span>
        </div>

        <label className={styles.searchLabel} htmlFor="msg-search">
          <SearchIcon className={styles.searchIcon} />
          <input
            id="msg-search"
            type="search"
            className={styles.searchInput}
            placeholder="Search patients…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search messages"
          />
        </label>

        <ul className={styles.threadList} role="list">
          {filtered.map((t) => (
            <li key={t.id}>
              <button
                type="button"
                className={`${styles.thread} ${t.id === activeId ? styles.threadActive : ''}`}
                onClick={() => setActiveId(t.id)}
                aria-current={t.id === activeId ? 'true' : undefined}
              >
                <span className={styles.threadAvatar}>{t.initials}</span>
                <span className={styles.threadBody}>
                  <span className={styles.threadName}>
                    {t.name}
                    {t.unread && <span className={styles.dot} aria-label="unread" />}
                  </span>
                  <span className={styles.threadPreview}>{t.preview}</span>
                </span>
                <span className={styles.threadTime}>{t.time}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Conversation pane */}
      {active && (
        <section className={styles.convo} aria-label={`Conversation with ${active.name}`}>
          {/* Header */}
          <div className={styles.convoHeader}>
            <span className={styles.convoAvatar}>{active.initials}</span>
            <div className={styles.convoInfo}>
              <p className={styles.convoName}>{active.name}</p>
              <p className={styles.convoMeta}>{active.gender} · {active.age} yrs · {active.phone ?? 'No phone'}</p>
            </div>
          </div>

          {/* Messages */}
          <div className={styles.messages} role="log" aria-live="polite">
            {/* Incoming */}
            <div className={styles.msgIncoming}>
              <span className={styles.msgAvatar}>{active.initials}</span>
              <div className={styles.msgBubble}>
                <p>{active.preview}</p>
                <span className={styles.msgTime}>{active.time}</span>
              </div>
            </div>

            {/* Doctor auto-reply */}
            <div className={styles.msgOutgoing}>
              <div className={styles.msgBubbleOut}>
                <p>Thank you for reaching out. I will review your records and get back to you shortly.</p>
                <span className={styles.msgTime}>Yesterday</span>
              </div>
              <span className={styles.msgAvatarOut}>JS</span>
            </div>

            {/* Sent messages */}
            {sent.map((s, i) => (
              <div key={i} className={styles.msgOutgoing}>
                <div className={styles.msgBubbleOut}>
                  <p>{s.text}</p>
                  <span className={styles.msgTime}>{s.time}</span>
                </div>
                <span className={styles.msgAvatarOut}>JS</span>
              </div>
            ))}
          </div>

          {/* Reply box */}
          <form className={styles.replyForm} onSubmit={handleSend} aria-label="Send message">
            <input
              type="text"
              className={styles.replyInput}
              placeholder={`Message ${active.name}…`}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              aria-label="Type a message"
            />
            <button type="submit" className={styles.sendBtn} disabled={!replyText.trim()}>
              Send
            </button>
          </form>
        </section>
      )}
    </div>
  );
}
