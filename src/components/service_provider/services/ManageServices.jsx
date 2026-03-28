import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const mockServices = [
  {
    id: 1, name: 'Pipe Leak Repair', category: 'Plumbing',
    description: 'Professional pipe leak detection and repair for residential and commercial properties.',
    price: 120, duration: 60, bookings: 34, rating: 4.9, status: 'active', icon: '🔧',
  },
  {
    id: 2, name: 'Bathroom Fitting', category: 'Plumbing',
    description: 'Complete bathroom fixtures installation including taps, showers, and toilets.',
    price: 250, duration: 120, bookings: 18, rating: 4.7, status: 'active', icon: '🚿',
  },
  {
    id: 3, name: 'Water Heater Installation', category: 'Plumbing',
    description: 'Installation and setup of electric and gas water heaters with warranty.',
    price: 320, duration: 90, bookings: 12, rating: 4.8, status: 'active', icon: '💧',
  },
  {
    id: 4, name: 'Drain Cleaning', category: 'Plumbing',
    description: 'Thorough drain cleaning and blockage removal using professional equipment.',
    price: 80, duration: 45, bookings: 28, rating: 4.6, status: 'active', icon: '🌀',
  },
  {
    id: 5, name: 'Emergency Plumbing', category: 'Plumbing',
    description: '24/7 emergency plumbing services for urgent issues.',
    price: 200, duration: 90, bookings: 9, rating: 5.0, status: 'inactive', icon: '🚨',
  },
  {
    id: 6, name: 'Pipe Insulation', category: 'Plumbing',
    description: 'Insulation of exposed pipes to prevent freezing and energy loss.',
    price: 95, duration: 60, bookings: 7, rating: 4.5, status: 'active', icon: '🧱',
  },
];

const ManageServices = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState(mockServices);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [deleteId, setDeleteId] = useState(null);

  const filtered = services.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || s.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const toggleStatus = (id) =>
    setServices((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, status: s.status === 'active' ? 'inactive' : 'active' }
          : s
      )
    );

  const deleteService = (id) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    setDeleteId(null);
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h1>Manage Services</h1>
          <p>View, edit, and control your listed services.</p>
        </div>
        <Link to="/provider/add-service" className="btn btn-primary">
          ➕ Add New Service
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="card" style={{ marginBottom: '20px', padding: '16px 20px' }}>
        <div className="services-filter-bar">
          <div className="search-input-wrap">
            <span className="search-icon">🔍</span>
            <input
              className="form-input"
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="form-select"
            style={{ width: 'auto', minWidth: '140px' }}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>
            {filtered.length} service{filtered.length !== 1 ? 's' : ''} found
          </span>
        </div>
      </div>

      {/* Services Grid */}
      {filtered.length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">🛠️</div>
            <h3>No services found</h3>
            <p>Try changing your search or filter, or add a new service.</p>
            <Link to="/provider/add-service" className="btn btn-primary" style={{ marginTop: '12px' }}>
              ➕ Add Service
            </Link>
          </div>
        </div>
      ) : (
        <div className="service-card-grid">
          {filtered.map((s) => (
            <div key={s.id} className="service-card">
              <div className="service-card-img">
                <span style={{ fontSize: '3.5rem' }}>{s.icon}</span>
              </div>

              <div className="service-card-body">
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '6px',
                  }}
                >
                  <div className="service-card-title">{s.name}</div>
                  <span className={`badge ${s.status === 'active' ? 'badge-success' : 'badge-muted'}`}>
                    {s.status === 'active' ? '● Active' : '○ Inactive'}
                  </span>
                </div>

                <div className="service-card-category">{s.category}</div>
                <div className="service-card-desc">{s.description}</div>

                <div className="service-card-meta">
                  <div className="service-card-meta-item">
                    💰 <strong>${s.price}</strong>
                  </div>
                  <div className="service-card-meta-item">
                    ⏱️ {s.duration} min
                  </div>
                  <div className="service-card-meta-item">
                    📋 {s.bookings} bookings
                  </div>
                  <div className="service-card-meta-item">
                    ⭐ {s.rating}
                  </div>
                </div>
              </div>

              <div className="service-card-actions">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => navigate(`/provider/edit-service/${s.id}`)}
                >
                  ✏️ Edit
                </button>
                <button
                  className={`btn btn-sm ${s.status === 'active' ? 'btn-secondary' : 'btn-success'}`}
                  onClick={() => toggleStatus(s.id)}
                >
                  {s.status === 'active' ? '⏸️ Deactivate' : '▶️ Activate'}
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  style={{ marginLeft: 'auto' }}
                  onClick={() => setDeleteId(s.id)}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteId && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div className="card" style={{ maxWidth: '400px', width: '90%', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>⚠️</div>
            <h3 style={{ marginBottom: '8px' }}>Delete Service?</h3>
            <p style={{ marginBottom: '24px' }}>
              This action cannot be undone. All bookings for this service will be affected.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button className="btn btn-secondary" onClick={() => setDeleteId(null)}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={() => deleteService(deleteId)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageServices;
