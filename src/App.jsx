import { useState } from 'react';
import './App.css';
import seedContacts from './data/contacts.json';
import Header from './components/Header';
import AddContactForm from './components/AddContactForm';
import ContactList from './components/ContactList';

function App() {
  const [contacts, setContacts] = useState(seedContacts);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingContact, setEditingContact] = useState(null);

  const addContact = (formData) => {
    const newContact = {
      ...formData,
      id: Date.now(),
    };
    setContacts([newContact, ...contacts]);
  };

  const updateContact = (updated) => {
    setContacts(contacts.map((c) => (c.id === updated.id ? updated : c)));
    setEditingContact(null);
  };

  const deleteContact = (id) => {
    if (window.confirm('Delete this contact?')) {
      setContacts(contacts.filter((c) => c.id !== id));
    }
  };

  const term = searchTerm.toLowerCase();
  const filtered = term
    ? contacts.filter(
        (c) =>
          c.name.toLowerCase().includes(term) ||
          c.email.toLowerCase().includes(term) ||
          c.phone.toLowerCase().includes(term) ||
          c.property.toLowerCase().includes(term)
      )
    : contacts;

  return (
    <div className="App">
      <Header />
      <main className="main">
        <AddContactForm
          onAdd={addContact}
          editingContact={editingContact}
          onUpdate={updateContact}
          onCancelEdit={() => setEditingContact(null)}
        />
        <ContactList
          contacts={filtered}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onEdit={setEditingContact}
          onDelete={deleteContact}
        />
      </main>
    </div>
  );
}

export default App;
