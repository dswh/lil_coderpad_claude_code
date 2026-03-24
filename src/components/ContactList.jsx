import './ContactList.css';

const stageColors = {
  new: '#4caf50',
  qualified: '#2196f3',
  site_visit: '#9c27b0',
  negotiation: '#ff9800',
  won: '#00897b',
  lost: '#9e9e9e',
};

const stageLabels = {
  new: 'New',
  qualified: 'Qualified',
  site_visit: 'Site Visit',
  negotiation: 'Negotiation',
  won: 'Won',
  lost: 'Lost',
};

const leadTypeColors = {
  buyer: '#1976d2',
  seller: '#e65100',
  rental: '#7b1fa2',
  investor: '#2e7d32',
};

function ContactList({ contacts, searchTerm, onSearchChange, onEdit, onDelete }) {
  return (
    <div className="contact-list">
      <div className="list-header">
        <h2>Contacts ({contacts.length})</h2>
        <input
          className="search-input"
          type="text"
          placeholder="Search contacts…"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {contacts.length === 0 ? (
        <p className="empty-state">
          {searchTerm ? 'No contacts match your search.' : 'No contacts yet. Add one above.'}
        </p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Property Interest</th>
              <th>Lead Type</th>
              <th>Stage</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.phone}</td>
                <td>{c.property}</td>
                <td>
                  <span
                    className="badge"
                    style={{ backgroundColor: leadTypeColors[c.leadType] }}
                  >
                    {c.leadType}
                  </span>
                </td>
                <td>
                  <span
                    className="badge"
                    style={{ backgroundColor: stageColors[c.pipelineStage] }}
                  >
                    {stageLabels[c.pipelineStage] || c.pipelineStage}
                  </span>
                </td>
                <td className="actions">
                  <button className="btn-action" onClick={() => onEdit(c)}>
                    Edit
                  </button>
                  <button
                    className="btn-action btn-delete"
                    onClick={() => onDelete(c.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ContactList;
