import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// ── Mock Data ────────────────────────────────────────────────
const stats = [
  {
    label: 'Total Services',
    value: '12',
    change: '+2 this month',
    positive: true,
    icon: '🛠️',
    iconClass: 'stat-icon-blue',
  },
  {
    label: "Today's Appointments",
    value: '5',
    change: '3 confirmed',
    positive: true,
    icon: '📅',
    iconClass: 'stat-icon-green',
  },
  {
    label: 'Monthly Revenue',
    value: '$3,840',
    change: '+18% vs last month',
    positive: true,
    icon: '💰',
    iconClass: 'stat-icon-purple',
  },
  {
    label: 'Avg. Rating',
    value: '4.8',
    change: '142 reviews',
    positive: true,
    icon: '⭐',
    iconClass: 'stat-icon-orange',
  },
];

const recentAppointments = [
  {
    id: 1, client: 'Sarah Mitchell', initials: 'SM', service: 'Pipe Repair',
    date: 'Mar 28', time: '10:00 AM', status: 'confirmed', amount: '$120',
  },
  {
    id: 2, client: 'James Kowalski', initials: 'JK', service: 'Bathroom Fitting',
    date: 'Mar 28', time: '2:00 PM', status: 'pending', amount: '$250',
  },
  {
    id: 3, client: 'Angela Davis', initials: 'AD', service: 'Water Heater Install',
    date: 'Mar 29', time: '9:30 AM', status: 'confirmed', amount: '$320',
  },
  {
    id: 4, client: 'Robert Kim', initials: 'RK', service: 'Drain Cleaning',
    date: 'Mar 29', time: '3:00 PM', status: 'completed', amount: '$80',
  },
  {
    id: 5, client: 'Mia Thompson', initials: 'MT', service: 'Pipe Repair',
    date: 'Mar 30', time: '11:00 AM', status: 'pending', amount: '$120',
  },
];

const topServices = [
  { name: 'Pipe Repair',          bookings: 34, revenue: '$4,080' },
  { name: 'Bathroom Fitting',     bookings: 18, revenue: '$4,500' },
  { name: 'Water Heater Install', bookings: 12, revenue: '$3,840' },
  { name: 'Drain Cleaning',       bookings: 28, revenue: '$2,240' },
];

const appointmentStatus = [
  { label: 'Pending',   count: 8,  badge: 'badge-warning' },
  { label: 'Confirmed', count: 14, badge: 'badge-info'    },
  { label: 'Completed', count: 89, badge: 'badge-success' },
  { label: 'Cancelled', count: 3,  badge: 'badge-danger'  },
];

const quickActions = [
  {
    to: '/provider/add-service',
    icon: '➕',
    iconBg: '#eff6ff',
    title: 'Add Service',
    desc: 'List a new service',
  },
  {
    to: '/provider/appointments',
    icon: '📅',
    iconBg: '#ecfdf5',
    title: 'View Appointments',
    desc: '3 pending responses',
  },
  {
    to: '/provider/manage-services',
    icon: '🛠️',
    iconBg: '#f5f3ff',
    title: 'Manage Services',
    desc: 'Edit your listings',
  },
  {
    to: '/provider/analytics',
    icon: '📊',
    iconBg: '#fff7ed',
    title: 'View Analytics',
    desc: 'Track performance',
  },
];

// ── Badge helper ───────────────────────────────────────────────
const statusBadge = (status) => {
  const map = {
    confirmed: 'badge badge-info',
    pending:   'badge badge-warning',
    completed: 'badge badge-success',
    cancelled: 'badge badge-danger',
  };
  return map[status] || 'badge badge-muted';
};

// ── Component ──────────────────────────────────────────────────
const ProviderDashboard = () => {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-title-group">
          <h1>Welcome back, Alex 👋</h1>
          <p>{today}</p>
        </div>
        <Link to="/provider/add-service" className="btn btn-primary">
          <span>➕</span> Add New Service
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        {stats.map((s) => (
          <div key={s.label} className="stat-card">
            <div className={`stat-icon ${s.iconClass}`}>{s.icon}</div>
            <div className="stat-info">
              <div className="stat-value">{s.value}</div>
              <div className="stat-label">{s.label}</div>
              <div className={`stat-change ${s.positive ? 'positive' : 'negative'}`}>
                {s.positive ? '▲' : '▼'} {s.change}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        {quickActions.map((a) => (
          <Link key={a.to} to={a.to} className="quick-action-btn">
            <div className="quick-action-icon" style={{ background: a.iconBg }}>
              {a.icon}
            </div>
            <div className="quick-action-text">
              <strong>{a.title}</strong>
              <span>{a.desc}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Main dashboard grid */}
      <div className="dashboard-grid">
        {/* LEFT — Recent Appointments */}
        <div className="card">
          <div className="section-header">
            <h2>Recent Appointments</h2>
            <Link
              to="/provider/appointments"
              className="btn btn-secondary btn-sm"
            >
              View All →
            </Link>
          </div>

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Service</th>
                  <th>Date & Time</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentAppointments.map((appt) => (
                  <tr key={appt.id}>
                    <td>
                      <div className="appointment-row-avatar">
                        <div className="avatar avatar-sm">{appt.initials}</div>
                        <div className="appointment-row-info">
                          <strong>{appt.client}</strong>
                        </div>
                      </div>
                    </td>
                    <td>{appt.service}</td>
                    <td>
                      <div className="appointment-row-info">
                        <strong>{appt.date}</strong>
                        <span>{appt.time}</span>
                      </div>
                    </td>
                    <td>
                      <strong style={{ color: 'var(--brand-blue)' }}>
                        {appt.amount}
                      </strong>
                    </td>
                    <td>
                      <span className={statusBadge(appt.status)}>
                        {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Appointment Status Summary */}
          <div className="card">
            <div className="section-header">
              <h2>Booking Status</h2>
            </div>
            <div className="status-widget">
              {appointmentStatus.map((s) => (
                <div key={s.label} className="status-item">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className={`badge ${s.badge}`}>{s.label}</span>
                  </div>
                  <span className="status-count">{s.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Services */}
          <div className="card">
            <div className="section-header">
              <h2>Top Services</h2>
              <Link
                to="/provider/manage-services"
                style={{ fontSize: '0.78rem', color: 'var(--brand-blue)', fontWeight: 600 }}
              >
                Manage →
              </Link>
            </div>
            {topServices.map((s, i) => (
              <div key={s.name} className="top-service-item">
                <div className="top-service-rank">#{i + 1}</div>
                <div className="top-service-info">
                  <strong>{s.name}</strong>
                  <span>{s.bookings} bookings</span>
                </div>
                <div className="top-service-revenue">{s.revenue}</div>
              </div>
            ))}
          </div>

          {/* Provider Rating Card */}
          <div className="card" style={{ textAlign: 'center', background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>⭐</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--brand-blue-dark)' }}>
              4.8 / 5.0
            </div>
            <div className="stars" style={{ justifyContent: 'center', margin: '6px 0' }}>
              {'★★★★★'.split('').map((s, i) => (
                <span key={i}>{s}</span>
              ))}
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Based on <strong>142 reviews</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
