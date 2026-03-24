import './Header.css';

function Header({ title, searchTerm, onSearchChange, searchPlaceholder, actionLabel, onAction }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1 className="topbar-title">{title}</h1>
      </div>
      <div className="topbar-right">
        <div className="search-wrapper">
          <span className="search-icon">&#8981;</span>
          <input
            className="search-input"
            type="text"
            placeholder={searchPlaceholder || 'Search...'}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        {actionLabel && onAction && (
          <button className="btn-new-contact" onClick={onAction}>
            {actionLabel}
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
