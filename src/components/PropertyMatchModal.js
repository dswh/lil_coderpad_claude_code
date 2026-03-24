import './PropertyMatchModal.css';

const formatPrice = (price) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);

function getMatches(buyer, properties) {
  if (!buyer) return [];

  const available = properties.filter((p) => p.status === 'available');

  return available
    .map((p) => {
      const localityMatch =
        buyer.preferredLocality &&
        p.locality.toLowerCase() === buyer.preferredLocality.toLowerCase();
      const bhkMatch = buyer.preferredBhk && p.bhk === buyer.preferredBhk;
      const budgetMatch = buyer.budget && p.price <= buyer.budget;
      const matchCount = [localityMatch, bhkMatch, budgetMatch].filter(Boolean).length;

      return { ...p, localityMatch, bhkMatch, budgetMatch, matchCount };
    })
    .filter((p) => p.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount);
}

function PropertyMatchModal({ isOpen, onClose, buyer, properties }) {
  if (!isOpen || !buyer) return null;

  const matches = getMatches(buyer, properties);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="match-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Matches for {buyer.name}</h2>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="match-criteria">
          <span className="criteria-label">Criteria:</span>
          {buyer.budget && (
            <span className="criteria-tag">Budget: {formatPrice(buyer.budget)}</span>
          )}
          {buyer.preferredLocality && (
            <span className="criteria-tag">Locality: {buyer.preferredLocality}</span>
          )}
          {buyer.preferredBhk && (
            <span className="criteria-tag">BHK: {buyer.preferredBhk}</span>
          )}
        </div>

        <div className="match-results">
          {matches.length === 0 ? (
            <p className="empty-state">No matching properties found for this buyer's criteria.</p>
          ) : (
            matches.map((p) => (
              <div className="match-row" key={p.id}>
                <div className="match-info">
                  <div className="match-title">{p.title}</div>
                  <div className="match-details">
                    {formatPrice(p.price)} &middot; {p.bhk > 0 ? `${p.bhk} BHK` : 'Plot'} &middot; {p.area.toLocaleString()} sqft &middot; {p.locality}
                  </div>
                </div>
                <div className="match-pills">
                  <span className={`match-pill ${p.localityMatch ? 'matched' : 'unmatched'}`}>
                    Locality {p.localityMatch ? '✓' : '✗'}
                  </span>
                  <span className={`match-pill ${p.bhkMatch ? 'matched' : 'unmatched'}`}>
                    BHK {p.bhkMatch ? '✓' : '✗'}
                  </span>
                  <span className={`match-pill ${p.budgetMatch ? 'matched' : 'unmatched'}`}>
                    Budget {p.budgetMatch ? '✓' : '✗'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default PropertyMatchModal;
