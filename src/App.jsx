import { useState } from 'react';
import './App.css';
import seedContacts from './data/contacts.json';
import seedProperties from './data/properties.json';
import seedActivities from './data/activities.json';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatsRow from './components/StatsRow';
import AddContactForm from './components/AddContactForm';
import ContactList from './components/ContactList';
import PropertyList from './components/PropertyList';
import PropertyMatchModal from './components/PropertyMatchModal';
import PipelineBoard from './components/PipelineBoard';
import ActivityPanel from './components/ActivityPanel';

function App() {
  const [activePage, setActivePage] = useState('contacts');
  const [contacts, setContacts] = useState(seedContacts);
  const [properties] = useState(seedProperties);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingContact, setEditingContact] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [matchBuyer, setMatchBuyer] = useState(null);
  const [activities, setActivities] = useState(seedActivities);
  const [selectedContactId, setSelectedContactId] = useState(null);

  const changeStage = (contactId, newStage) => {
    const contact = contacts.find((c) => c.id === contactId);
    if (!contact || contact.pipelineStage === newStage) return;
    const oldStage = contact.pipelineStage;
    setContacts(contacts.map((c) => (c.id === contactId ? { ...c, pipelineStage: newStage } : c)));
    setActivities((prev) => [
      ...prev,
      {
        id: Date.now(),
        contactId,
        type: 'stage_change',
        from: oldStage,
        to: newStage,
        note: '',
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  const addActivity = (contactId, note) => {
    setActivities((prev) => [
      ...prev,
      {
        id: Date.now(),
        contactId,
        type: 'note',
        from: null,
        to: null,
        note,
        timestamp: new Date().toISOString(),
      },
    ]);
  };

  const selectedContact = selectedContactId
    ? contacts.find((c) => c.id === selectedContactId) || null
    : null;

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

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingContact(null);
  };

  const handleNavigate = (page) => {
    setActivePage(page);
    setSearchTerm('');
  };

  const term = searchTerm.toLowerCase();

  const filteredContacts = term
    ? contacts.filter(
        (c) =>
          c.name.toLowerCase().includes(term) ||
          c.email.toLowerCase().includes(term) ||
          c.phone.toLowerCase().includes(term) ||
          c.property.toLowerCase().includes(term)
      )
    : contacts;

  const filteredProperties = term
    ? properties.filter(
        (p) =>
          p.title.toLowerCase().includes(term) ||
          p.locality.toLowerCase().includes(term) ||
          p.city.toLowerCase().includes(term)
      )
    : properties;

  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} onNavigate={handleNavigate} />
      <div className={`main-area${activePage === 'pipeline' ? ' pipeline-view' : ''}`}>
        {activePage === 'contacts' && (
          <>
            <Header
              title="Contacts"
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              searchPlaceholder="Search contacts..."
              actionLabel="+ New Contact"
              onAction={() => setIsFormOpen(true)}
            />
            <StatsRow contacts={contacts} page="contacts" />
            <ContactList
              contacts={filteredContacts}
              searchTerm={searchTerm}
              onEdit={handleEdit}
              onDelete={deleteContact}
              onFindMatches={setMatchBuyer}
            />
          </>
        )}

        {activePage === 'pipeline' && (
          <>
            <Header
              title="Pipeline"
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              searchPlaceholder="Search pipeline..."
            />
            <PipelineBoard
              contacts={filteredContacts}
              onStageChange={changeStage}
              onSelectContact={setSelectedContactId}
            />
          </>
        )}

        {activePage === 'properties' && (
          <>
            <Header
              title="Properties"
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              searchPlaceholder="Search properties..."
            />
            <StatsRow properties={properties} page="properties" />
            <PropertyList
              properties={filteredProperties}
              searchTerm={searchTerm}
            />
          </>
        )}
      </div>

      <AddContactForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        onAdd={addContact}
        editingContact={editingContact}
        onUpdate={updateContact}
        onCancelEdit={() => setEditingContact(null)}
      />

      <PropertyMatchModal
        isOpen={!!matchBuyer}
        onClose={() => setMatchBuyer(null)}
        buyer={matchBuyer}
        properties={properties}
      />

      <ActivityPanel
        contact={selectedContact}
        activities={activities}
        onAddNote={addActivity}
        onClose={() => setSelectedContactId(null)}
      />
    </div>
  );
}

export default App;
