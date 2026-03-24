import { useState } from 'react';
import './ActivityPanel.css';

const stageLabels = {
  new: 'New',
  qualified: 'Qualified',
  site_visit: 'Site Visit',
  negotiation: 'Negotiation',
  won: 'Won',
  lost: 'Lost',
};

const typeIcons = {
  stage_change: '\u2794',
  note: '\u270E',
  call: '\u260E',
  email: '\u2709',
};

function formatDate(ts) {
  const d = new Date(ts);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function ActivityPanel({ contact, activities, onAddNote, onClose }) {
  const [note, setNote] = useState('');

  if (!contact) return null;

  const contactActivities = activities
    .filter((a) => a.contactId === contact.id)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!note.trim()) return;
    onAddNote(contact.id, note.trim());
    setNote('');
  };

  return (
    <div className="activity-overlay" onClick={onClose}>
      <div className="activity-panel" onClick={(e) => e.stopPropagation()}>
        <div className="activity-header">
          <div>
            <h3 className="activity-contact-name">{contact.name}</h3>
            <p className="activity-contact-detail">{contact.email} &middot; {contact.phone}</p>
          </div>
          <button className="activity-close" onClick={onClose}>&times;</button>
        </div>

        <form className="activity-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="activity-input"
            placeholder="Add a note..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <button type="submit" className="activity-submit" disabled={!note.trim()}>
            Add
          </button>
        </form>

        <div className="activity-list">
          {contactActivities.length === 0 ? (
            <p className="activity-empty">No activity yet.</p>
          ) : (
            contactActivities.map((a) => (
              <div className="activity-item" key={a.id}>
                <span className="activity-icon">{typeIcons[a.type] || '\u2022'}</span>
                <div className="activity-body">
                  {a.type === 'stage_change' ? (
                    <p className="activity-text">
                      Stage changed{a.from ? ` from ${stageLabels[a.from] || a.from}` : ''} to{' '}
                      <strong>{stageLabels[a.to] || a.to}</strong>
                      {a.note ? ` \u2014 ${a.note}` : ''}
                    </p>
                  ) : (
                    <p className="activity-text">{a.note}</p>
                  )}
                  <span className="activity-time">{formatDate(a.timestamp)}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ActivityPanel;
