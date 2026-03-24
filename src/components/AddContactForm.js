import { useState, useEffect } from 'react';
import './AddContactForm.css';

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  property: '',
  leadType: 'buyer',
  pipelineStage: 'new',
};

function AddContactForm({ onAdd, editingContact, onUpdate, onCancelEdit }) {
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
    if (editingContact) {
      onUpdate({ ...editingContact, ...form });
    } else {
      onAdd(form);
    }
    setForm(emptyForm);
  };

  const handleCancel = () => {
    setForm(emptyForm);
    onCancelEdit();
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h2>{editingContact ? 'Edit Contact' : 'Add Contact'}</h2>
      <div className="form-row">
        <input
          name="name"
          placeholder="Name *"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />
      </div>
      <div className="form-row">
        <input
          name="property"
          placeholder="Property interest"
          value={form.property}
          onChange={handleChange}
        />
        <select name="leadType" value={form.leadType} onChange={handleChange}>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
          <option value="rental">Rental</option>
          <option value="investor">Investor</option>
        </select>
        <select name="pipelineStage" value={form.pipelineStage} onChange={handleChange}>
          <option value="new">New</option>
          <option value="qualified">Qualified</option>
          <option value="site_visit">Site Visit</option>
          <option value="negotiation">Negotiation</option>
          <option value="won">Won</option>
          <option value="lost">Lost</option>
        </select>
      </div>
      <div className="form-row">
        {editingContact ? (
          <>
            <button type="submit">Save</button>
            <button type="button" className="btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
          </>
        ) : (
          <button type="submit">Add</button>
        )}
      </div>
    </form>
  );
}

export default AddContactForm;
