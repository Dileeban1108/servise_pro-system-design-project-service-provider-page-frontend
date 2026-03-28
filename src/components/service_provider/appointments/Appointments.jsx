import React, { useState } from 'react';

const mockAppointments = [
  {
    id: 1, client: 'Sarah Mitchell', initials: 'SM', phone: '+1 555-201-1234',
    service: 'Pipe Leak Repair', date: '2026-03-28', time: '10:00 AM',
    day: 28, month: 'Mar', duration: 60, status: 'confirmed', amount: 120,
    address: '124 Elm St, Springfield',
  },
  {
    id: 2, client: 'James Kowalski', initials: 'JK', phone: '+1 555-309-5678',
    service: 'Bathroom Fitting', date: '2026-03-28', time: '2:00 PM',
    day: 28, month: 'Mar', duration: 120, status: 'pending', amount: 250,
    address: '45 Oak Ave, Shelbyville',
  },
  {
    id: 3, client: 'Angela Davis', initials: 'AD', phone: '+1 555-412-9012',
    service: 'Water Heater Installation', date: '2026-03-29', time: '9:30 AM',
    day: 29, month: 'Mar', duration: 90, status: 'confirmed', amount: 320,
    address: '78 Maple Dr, Capital City',
  },
  {
    id: 4, client: 'Robert Kim', initials: 'RK', phone: '+1 555-514-3456',
    service: 'Drain Cleaning', date: '2026-03-29', time: '3:00 PM',
    day: 29, month: 'Mar', duration: 45, status: 'completed', amount: 80,
    address: '33 Pine Rd, Ogdenville',
  },
  {
    id: 5, client: 'Mia Thompson', initials: 'MT', phone: '+1 555-617-7890',
    service: 'Pipe Leak Repair', date: '2026-03-30', time: '11:00 AM',
    day: 30, month: 'Mar', duration: 60, status: 'pending', amount: 120,
    address: '89 Cedar Ln, North Haverbrook',
  },
  {
    id: 6, client: 'David Wong', initials: 'DW', phone: '+1 555-720-2345',
    service: 'Emergency Plumbing', date: '2026-03-31', time: '8:00 AM',
    day: 31, month: 'Mar', duration: 90, status: 'confirmed', amount: 200,
    address: '56 Birch Blvd, Brockway',
  },
  {
    id: 7, client: 'Laura Sanchez', initials: 'LS', phone: '+1 555-823-6789',
    service: 'Pipe Insulation', date: '2026-04-01', time: '1:00 PM',
    day: 1, month: 'Apr', duration: 60, status: 'cancelled', amount: 95,
    address: '12 Willow Way, Shelbyville',
  },
];

const statusFilters = ['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'];

const badgeMap = {
  pending:   'badge badge-warning',
  confirmed: 'badge badge-info',
  completed: 'badge badge-success',
  cancelled: 'badge badge-danger',
};

const Appointments = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [appointments, setAppointments] = useState(mockAppointments);

  const filtered = appointments.filter(
    (a) => activeFilter === 'All' || a.status.toLowerCase() === activeFilter.toLowerCase()
  );

  const updateStatus = (id, newStatus) =>
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );

  const counts = statusFilters.reduce((acc, f) => {
    acc[f] =
      f === 'All'
        ? appointments.length
        : appointments.filter((a) => a.status.toLowerCase() === f.toLowerCase()).length;
    return acc;
  }, {});

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h1>Appointments</h1>
          <p>Manage your upcoming and past bookings.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <select className="form-select" style={{ width: 'auto' }}>
            <option>All Services</option>
            <option>Pipe Leak Repair</option>
            <option>Bathroom Fitting</option>
            <option>Drain Cleaning</option>
          </select>
        </div>
      </div>

      {/* Summary stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Total', count: appointments.length, color: '#2563eb', bg: '#eff6ff' },
          { label: 'Pending', count: counts.Pending, color: '#f59e0b', bg: '#fffbeb' },
          { label: 'Confirmed', count: counts.Confirmed, color: '#3b82f6', bg: '#eff6ff' },
          { label: 'Completed', count: counts.Completed, color: '#10b981', bg: '#ecfdf5' },
        ].map((s) => (
          <div key={s.label} className="card" style={{ padding: '16px 20px', borderLeft: `4px solid ${s.color}` }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: s.color }}>{s.count}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="appt-filters">
        {statusFilters.map((f) => (
          <button
            key={f}
            className={`filter-tab${activeFilter === f ? ' active' : ''}`}
            onClick={() => setActiveFilter(f)}
          >
            {f} {counts[f] > 0 && <span style={{ opacity: 0.75 }}>({counts[f]})</span>}
          </button>
        ))}
      </div>

      {/* Appointments list */}
      {filtered.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">📅</div>
            <h3>No {activeFilter.toLowerCase()} appointments</h3>
            <p>When clients book your services, they'll appear here.</p>
          </div>
        </div>
      ) : (
        filtered.map((a) => (
          <div key={a.id} className="appt-card">
            {/* Date box */}
            <div className="appt-date-box">
              <span className="appt-date-day">{a.day}</span>
              <span className="appt-date-mon">{a.month}</span>
            </div>

            {/* Info */}
            <div className="appt-info">
              <div className="appt-service-name">{a.service}</div>
              <div className="appt-client-name">
                👤 <strong>{a.client}</strong> &nbsp;·&nbsp; 📞 {a.phone}
              </div>
              <div className="appt-meta">
                <div className="appt-meta-item">🕐 {a.time}</div>
                <div className="appt-meta-item">⏱️ {a.duration} min</div>
                <div className="appt-meta-item">📍 {a.address}</div>
                <div className="appt-meta-item">
                  💰 <strong style={{ color: 'var(--brand-blue)' }}>${a.amount}</strong>
                </div>
              </div>
            </div>

            {/* Status + Actions */}
            <div className="appt-actions">
              <span className={badgeMap[a.status]}>
                {a.status.charAt(0).toUpperCase() + a.status.slice(1)}
              </span>

              {a.status === 'pending' && (
                <>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => updateStatus(a.id, 'confirmed')}
                  >
                    ✅ Accept
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => updateStatus(a.id, 'cancelled')}
                  >
                    ✕ Decline
                  </button>
                </>
              )}

              {a.status === 'confirmed' && (
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => updateStatus(a.id, 'completed')}
                >
                  ✔ Mark Done
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Appointments;
