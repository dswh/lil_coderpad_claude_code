import { useState, useEffect } from 'react';
import './AddContactForm.css';

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  property: '',
  leadType: 'buyer',
  pipelineStage: 'new',
  budget: '',
  preferredLocality: '',
  preferredBhk: '',
};

function AddContactForm({ isOpen, onClose, onAdd, editingContact, onUpdate, onCancelEdit }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editingContact) {
      setForm({
        name: editingContact.name,
        email: editingContact.email,
        phone: editingContact.phone,
        property: editingContact.property,
        leadType: editingContact.leadType,
        pipelineStage: editingContact.pipelineStage,
        budget: editingContact.budget || '',
        preferredLocality: editingContact.preferredLocality || '',
        preferredBhk: editingContact.preferredBhk || '',
      });
    } else {
      setForm(emptyForm);
    }
  }, [editingContact]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    const submission = { ...form };
    if (submission.budget) submission.budget = Number(submission.budget);
    else delete submission.budget;
    if (submission.preferredBhk) submission.preferredBhk = Number(submission.preferredBhk);
    else delete submission.preferredBhk;
    if (!submission.preferredLocality) delete submission.preferredLocality;

    if (editingContact) {
      onUpdate({ ...editingContact, ...submission });
    } else {
      onAdd(submission);
    }
    setForm(emptyForm);
    onClose();
  };

  const handleCancel = () => {
    setForm(emptyForm);
    if (editingContact) onCancelEdit();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={handleCancel}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editingContact ? 'Edit Contact' : 'New Contact'}</h2>
          <button className="modal-close" onClick={handleCancel}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-field">
              <label>Name *</label>
              <input
                name="name"
                placeholder="Full name"
                value={form.name}
                onChange={handleChange}
                required
                autoFocus
              />
            </div>
            <div className="form-field">
              <label>Email</label>
              <input
                name="email"
                type="email"
                placeholder="email@example.com"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label>Phone</label>
              <input
                name="phone"
                placeholder="(555) 000-0000"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label>Property Interest</label>
              <input
                name="property"
                placeholder="e.g. 3BD/2BA in Austin"
                value={form.property}
                onChange={handleChange}
              />
            </div>
            <div className="form-field">
              <label>Lead Type</label>
              <select name="leadType" value={form.leadType} onChange={handleChange}>
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
                <option value="rental">Rental</option>
                <option value="investor">Investor</option>
              </select>
            </div>
            <div className="form-field">
              <label>Pipeline Stage</label>
              <select name="pipelineStage" value={form.pipelineStage} onChange={handleChange}>
                <option value="new">New</option>
                <option value="qualified">Qualified</option>
                <option value="site_visit">Site Visit</option>
                <option value="negotiation">Negotiation</option>
                <option value="won">Won</option>
                <option value="lost">Lost</option>
              </select>
            </div>
          </div>
          {form.leadType === 'buyer' && (
            <>
              <div className="buyer-prefs-divider">Buyer Preferences</div>
              <div className="form-grid">
                <div className="form-field">
                  <label>Budget</label>
                  <input
                    name="budget"
                    type="number"
                    placeholder="e.g. 10000000"
                    value={form.budget}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field">
                  <label>Preferred Locality</label>
                  <input
                    name="preferredLocality"
                    placeholder="e.g. Koramangala"
                    value={form.preferredLocality}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-field">
                  <label>Preferred BHK</label>
                  <select name="preferredBhk" value={form.preferredBhk} onChange={handleChange}>
                    <option value="">—</option>
                    <option value="1">1 BHK</option>
                    <option value="2">2 BHK</option>
                    <option value="3">3 BHK</option>
                    <option value="4">4 BHK</option>
                    <option value="5">5 BHK</option>
                  </select>
                </div>
              </div>
            </>
          )}
          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              {editingContact ? 'Save Changes' : 'Add Contact'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddContactForm;
