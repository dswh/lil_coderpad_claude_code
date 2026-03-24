import './Sidebar.css';

function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-logo">RE</div>
        <span className="sidebar-title">RealEstate CRM</span>
      </div>

      <nav className="sidebar-nav">
        <button
          className={`nav-item ${activePage === 'contacts' ? 'active' : ''}`}
          onClick={() => onNavigate('contacts')}
        >
          <span className="nav-icon">&#9862;</span>
          Contacts
        </button>
        <button
          className={`nav-item ${activePage === 'properties' ? 'active' : ''}`}
          onClick={() => onNavigate('properties')}
        >
          <span className="nav-icon">&#9962;</span>
          Properties
        </button>
        <button
          className={`nav-item ${activePage === 'pipeline' ? 'active' : ''}`}
          onClick={() => onNavigate('pipeline')}
        >
          <span className="nav-icon">&#9783;</span>
          Pipeline
        </button>
        <button className="nav-item disabled">
          <span className="nav-icon">&#9776;</span>
          Reports
        </button>
      </nav>

      <div className="sidebar-spacer" />

      <div className="sidebar-footer">
        <button className="nav-item disabled">
          <span className="nav-icon">&#9881;</span>
          Settings
        </button>
        <div className="sidebar-user">
          <div className="user-avatar">B</div>
          <span className="user-name">Broker</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
