import './PipelineBoard.css';

const stages = ['new', 'qualified', 'site_visit', 'negotiation', 'won', 'lost'];

const stageLabels = {
  new: 'New',
  qualified: 'Qualified',
  site_visit: 'Site Visit',
  negotiation: 'Negotiation',
  won: 'Won',
  lost: 'Lost',
};

const stageColors = {
  new: { bg: '#dcfce7', color: '#166534', border: '#bbf7d0' },
  qualified: { bg: '#dbeafe', color: '#1e40af', border: '#bfdbfe' },
  site_visit: { bg: '#f3e8ff', color: '#6b21a8', border: '#e9d5ff' },
  negotiation: { bg: '#fef3c7', color: '#92400e', border: '#fde68a' },
  won: { bg: '#ccfbf1', color: '#115e59', border: '#99f6e4' },
  lost: { bg: '#f1f5f9', color: '#475569', border: '#e2e8f0' },
};

const leadTypeLabels = {
  buyer: 'Buyer',
  seller: 'Seller',
  rental: 'Rental',
  investor: 'Investor',
};

function PipelineBoard({ contacts, onStageChange, onSelectContact }) {
  const grouped = {};
  stages.forEach((s) => { grouped[s] = []; });
  contacts.forEach((c) => {
    const stage = grouped[c.pipelineStage] ? c.pipelineStage : 'new';
    grouped[stage].push(c);
  });

  return (
    <div className="pipeline-board">
      {stages.map((stage) => {
        const sc = stageColors[stage];
        return (
          <div className="pipeline-column" key={stage}>
            <div className="column-header" style={{ borderTopColor: sc.color }}>
              <span className="column-title">{stageLabels[stage]}</span>
              <span
                className="column-count"
                style={{ backgroundColor: sc.bg, color: sc.color }}
              >
                {grouped[stage].length}
              </span>
            </div>
            <div className="column-cards">
              {grouped[stage].map((contact) => (
                <div
                  className="pipeline-card"
                  key={contact.id}
                  onClick={() => onSelectContact(contact.id)}
                >
                  <div className="pipeline-card-name">{contact.name}</div>
                  <div className="pipeline-card-property">{contact.property}</div>
                  <div className="pipeline-card-footer">
                    <span
                      className="pipeline-card-lead"
                      style={{
                        backgroundColor: sc.bg,
                        color: sc.color,
                      }}
                    >
                      {leadTypeLabels[contact.leadType] || contact.leadType}
                    </span>
                    <select
                      className="stage-select"
                      value={contact.pipelineStage}
                      onChange={(e) => {
                        e.stopPropagation();
                        onStageChange(contact.id, e.target.value);
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {stages.map((s) => (
                        <option key={s} value={s}>
                          {stageLabels[s]}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
              {grouped[stage].length === 0 && (
                <div className="column-empty">No contacts</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PipelineBoard;
