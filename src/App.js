import { useState } from 'react';
import './App.css';
import seedContacts from './data/contacts.json';

const emptyForm = { name: '', email: '', phone: '', property: '', leadType: 'buyer' };

const leadColors = {
  buyer: { bg: '#dbeafe', color: '#1e40af' },
  seller: { bg: '#ffedd5', color: '#9a3412' },
  rental: { bg: '#f3e8ff', color: '#6b21a8' },
  investor: { bg: '#dcfce7', color: '#166534' },
};

function App() {
  const [contacts, setContacts] = useState(seedContacts);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    setContacts([{ ...form, id: Date.now() }, ...contacts]);
    setForm(emptyForm);
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this contact?')) {
      setContacts(contacts.filter((c) => c.id !== id));
    }
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setShowForm(false);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-left">
          <h1 className="header-title">RealEstate CRM</h1>
          <span className="header-count">{contacts.length} contacts</span>
        </div>
        <button className="btn-add" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Contact'}
        </button>
      </header>

      <main className="content">
        {showForm && (
          <form className="add-form" onSubmit={handleSubmit}>
            <h2 className="form-title">New Contact</h2>
            <div className="form-row">
              <input
                name="name"
                placeholder="Full name *"
                value={form.name}
                onChange={handleChange}
                required
                autoFocus
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <input
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleChange}
              />
              <input
                name="property"
                placeholder="Property interest"
                value={form.property}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <select name="leadType" value={form.leadType} onChange={handleChange}>
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
                <option value="rental">Rental</option>
                <option value="investor">Investor</option>
              </select>
              <div className="form-actions">
                <button type="button" className="btn-cancel" onClick={handleCancel}>
                  Cancel
                </button>
                <button type="submit" className="btn-save">
                  Save Contact
                </button>
              </div>
            </div>
          </form>
        )}

        {contacts.length === 0 ? (
          <p className="empty">No contacts yet. Click "+ Add Contact" to get started.</p>
        ) : (
          <div className="table-card">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Property Interest</th>
                  <th>Type</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => {
                  const lc = leadColors[c.leadType] || {};
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
                          style={{ backgroundColor: lc.bg, color: lc.color }}
                        >
                          {c.leadType}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn-delete"
                          onClick={() => handleDelete(c.id)}
                          title="Delete"
                        >
                          &times;
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
