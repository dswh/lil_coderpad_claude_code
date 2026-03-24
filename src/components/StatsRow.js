import './StatsRow.css';

function StatsRow({ contacts, properties, page }) {
  let stats;

  if (page === 'properties' && properties) {
    const total = properties.length;
    const available = properties.filter((p) => p.status === 'available').length;
    const sold = properties.filter((p) => p.status === 'sold').length;
    const reserved = properties.filter((p) => p.status === 'reserved').length;

    stats = [
      { label: 'Total Properties', value: total, color: '#6366f1' },
      { label: 'Available', value: available, color: '#22c55e' },
      { label: 'Sold', value: sold, color: '#64748b' },
      { label: 'Reserved', value: reserved, color: '#f59e0b' },
    ];
  } else {
    const total = contacts ? contacts.length : 0;
    const newLeads = contacts ? contacts.filter((c) => c.pipelineStage === 'new').length : 0;
    const negotiation = contacts ? contacts.filter((c) => c.pipelineStage === 'negotiation').length : 0;
    const won = contacts ? contacts.filter((c) => c.pipelineStage === 'won').length : 0;

    stats = [
      { label: 'Total Contacts', value: total, color: '#6366f1' },
      { label: 'New Leads', value: newLeads, color: '#22c55e' },
      { label: 'In Negotiation', value: negotiation, color: '#f59e0b' },
      { label: 'Won', value: won, color: '#14b8a6' },
    ];
  }

  return (
    <div className="stats-row">
      {stats.map((s) => (
        <div className="stat-card" key={s.label}>
          <div className="stat-indicator" style={{ backgroundColor: s.color }} />
          <div className="stat-value">{s.value}</div>
          <div className="stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}

export default StatsRow;
