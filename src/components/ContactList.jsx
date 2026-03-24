import './ContactList.css';

const stageStyles = {
  new: { bg: '#dcfce7', color: '#166534' },
  qualified: { bg: '#dbeafe', color: '#1e40af' },
  site_visit: { bg: '#f3e8ff', color: '#6b21a8' },
  negotiation: { bg: '#fef3c7', color: '#92400e' },
  won: { bg: '#ccfbf1', color: '#115e59' },
  lost: { bg: '#f1f5f9', color: '#475569' },
};

const stageLabels = {
  new: 'New',
  qualified: 'Qualified',
  site_visit: 'Site Visit',
  negotiation: 'Negotiation',
  won: 'Won',
  lost: 'Lost',
};

const leadTypeStyles = {
  buyer: { bg: '#dbeafe', color: '#1e40af' },
  seller: { bg: '#ffedd5', color: '#9a3412' },
  rental: { bg: '#f3e8ff', color: '#6b21a8' },
  investor: { bg: '#dcfce7', color: '#166534' },
};

function ContactList({ contacts, searchTerm, onEdit, onDelete, onFindMatches }) {
  return (
    <div className="contact-card">
      <div className="card-header">
        <h2 className="card-title">All Contacts</h2>
        <span className="card-count">{contacts.length}</span>
      </div>

      {contacts.length === 0 ? (
        <p className="empty-state">
          {searchTerm ? 'No contacts match your search.' : 'No contacts yet. Click "+ New Contact" to add one.'}
        </p>
      ) : (
        <div className="table-wrapper">
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
              {contacts.map((c) => {
                const ls = leadTypeStyles[c.leadType] || {};
                const ss = stageStyles[c.pipelineStage] || {};
                return (
                  <tr key={c.id}>
                    <td>
                      <div className="contact-name">{c.name}</div>
                      <div className="contact-email">{c.email}</div>
                    </td>
                    <td>{c.phone}</td>
                    <td>{c.property}</td>
                    <td>
                      <span
                        className="badge"
                        style={{ backgroundColor: ls.bg, color: ls.color }}
                      >
                        {c.leadType}
                      </span>
                    </td>
                    <td>
                      <span
                        className="badge"
                        style={{ backgroundColor: ss.bg, color: ss.color }}
                      >
                        {stageLabels[c.pipelineStage] || c.pipelineStage}
                      </span>
                    </td>
                    <td className="actions">
                      {c.leadType === 'buyer' && c.budget && c.preferredBhk && onFindMatches && (
                        <button
                          className="btn-action btn-match"
                          onClick={() => onFindMatches(c)}
                          title="Find matching properties"
                        >
                          &#9733;
                        </button>
                      )}
                      <button className="btn-action" onClick={() => onEdit(c)} title="Edit">
                        &#9998;
                      </button>
                      <button
                        className="btn-action btn-delete"
                        onClick={() => onDelete(c.id)}
                        title="Delete"
                      >
                        &#128465;
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ContactList;
