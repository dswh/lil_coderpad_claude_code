import './PropertyList.css';

const typeStyles = {
  apartment: { bg: '#dbeafe', color: '#1e40af' },
  villa: { bg: '#dcfce7', color: '#166534' },
  plot: { bg: '#fef3c7', color: '#92400e' },
};

const statusStyles = {
  available: { bg: '#dcfce7', color: '#166534' },
  sold: { bg: '#f1f5f9', color: '#475569' },
  reserved: { bg: '#fef3c7', color: '#92400e' },
};

const formatPrice = (price) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);

function PropertyList({ properties, searchTerm }) {
  return (
    <div className="contact-card">
      <div className="card-header">
        <h2 className="card-title">All Properties</h2>
        <span className="card-count">{properties.length}</span>
      </div>

      {properties.length === 0 ? (
        <p className="empty-state">
          {searchTerm ? 'No properties match your search.' : 'No properties listed yet.'}
        </p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Locality</th>
                <th>BHK</th>
                <th>Price</th>
                <th>Area</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((p) => {
                const ts = typeStyles[p.type] || {};
                const ss = statusStyles[p.status] || {};
                return (
                  <tr key={p.id}>
                    <td>
                      <div className="contact-name">{p.title}</div>
                      <div className="contact-email">{p.description}</div>
                    </td>
                    <td>{p.locality}, {p.city}</td>
                    <td>{p.bhk > 0 ? `${p.bhk} BHK` : '—'}</td>
                    <td className="price-cell">{formatPrice(p.price)}</td>
                    <td>{p.area.toLocaleString()} sqft</td>
                    <td>
                      <span className="badge" style={{ backgroundColor: ts.bg, color: ts.color }}>
                        {p.type}
                      </span>
                    </td>
                    <td>
                      <span className="badge" style={{ backgroundColor: ss.bg, color: ss.color }}>
                        {p.status}
                      </span>
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

export default PropertyList;
