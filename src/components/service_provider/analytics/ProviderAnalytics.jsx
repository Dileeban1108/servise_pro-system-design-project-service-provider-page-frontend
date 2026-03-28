import React, { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

// ── Mock Data ─────────────────────────────────────────────────
const revenueData = [
  { month: 'Oct', revenue: 2100, target: 2500 },
  { month: 'Nov', revenue: 2800, target: 2500 },
  { month: 'Dec', revenue: 3200, target: 3000 },
  { month: 'Jan', revenue: 2600, target: 3000 },
  { month: 'Feb', revenue: 3100, target: 3200 },
  { month: 'Mar', revenue: 3840, target: 3500 },
];

const appointmentsData = [
  { month: 'Oct', completed: 18, cancelled: 2, pending: 3 },
  { month: 'Nov', completed: 24, cancelled: 3, pending: 4 },
  { month: 'Dec', completed: 29, cancelled: 1, pending: 2 },
  { month: 'Jan', completed: 21, cancelled: 4, pending: 5 },
  { month: 'Feb', completed: 26, cancelled: 2, pending: 6 },
  { month: 'Mar', completed: 34, cancelled: 3, pending: 8 },
];

const servicePopularity = [
  { name: 'Pipe Repair',     value: 34, color: '#2563eb' },
  { name: 'Bathroom Fit',    value: 18, color: '#06b6d4' },
  { name: 'Water Heater',    value: 12, color: '#7c3aed' },
  { name: 'Drain Cleaning',  value: 28, color: '#10b981' },
  { name: 'Emergency',       value: 9,  color: '#f59e0b' },
  { name: 'Pipe Insulation', value: 7,  color: '#ef4444' },
];

const ratingData = [
  { month: 'Oct', rating: 4.5 },
  { month: 'Nov', rating: 4.6 },
  { month: 'Dec', rating: 4.7 },
  { month: 'Jan', rating: 4.6 },
  { month: 'Feb', rating: 4.8 },
  { month: 'Mar', rating: 4.8 },
];

const kpiCards = [
  { label: 'Total Revenue',      value: '$17,640', change: '+18%', positive: true,  icon: '💰', color: '#2563eb', bg: '#eff6ff' },
  { label: 'Total Appointments', value: '152',     change: '+24%', positive: true,  icon: '📅', color: '#10b981', bg: '#ecfdf5' },
  { label: 'Avg. Rating',        value: '4.8 ⭐',  change: '+0.2', positive: true,  icon: '⭐', color: '#f59e0b', bg: '#fffbeb' },
  { label: 'Cancellation Rate',  value: '6.2%',   change: '-1.3%', positive: true,  icon: '📉', color: '#7c3aed', bg: '#f5f3ff' },
];

// Custom tooltip for revenue chart
const RevenueTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div style={{
        background: 'white', border: '1px solid #e2e8f0',
        borderRadius: '10px', padding: '12px 16px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
      }}>
        <p style={{ fontWeight: 700, marginBottom: '6px' }}>{label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.color, fontSize: '0.85rem' }}>
            {p.name === 'revenue' ? '💰 Revenue' : '🎯 Target'}: <strong>${p.value.toLocaleString()}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const ProviderAnalytics = () => {
  const [period, setPeriod] = useState('6m');

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h1>Analytics</h1>
          <p>Track your performance, revenue, and client satisfaction.</p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['1m', '3m', '6m', '1y'].map((p) => (
            <button
              key={p}
              className={`filter-tab${period === p ? ' active' : ''}`}
              onClick={() => setPeriod(p)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="stats-grid" style={{ marginBottom: '24px' }}>
        {kpiCards.map((k) => (
          <div
            key={k.label}
            className="stat-card"
            style={{ borderLeft: `4px solid ${k.color}` }}
          >
            <div className="stat-icon" style={{ background: k.bg }}>
              {k.icon}
            </div>
            <div className="stat-info">
              <div className="stat-value" style={{ color: k.color }}>{k.value}</div>
              <div className="stat-label">{k.label}</div>
              <div className={`stat-change ${k.positive ? 'positive' : 'negative'}`}>
                {k.positive ? '▲' : '▼'} {k.change} vs last period
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue + Appointments Charts */}
      <div className="analytics-grid" style={{ marginBottom: '20px' }}>
        {/* Revenue Line Chart */}
        <div className="chart-card">
          <div className="chart-title">Revenue Overview</div>
          <div className="chart-subtitle">Monthly revenue vs target</div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} tickFormatter={(v) => `$${v}`} />
              <Tooltip content={<RevenueTooltip />} />
              <Legend wrapperStyle={{ fontSize: '0.8rem' }} />
              <Line
                type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={3}
                dot={{ r: 5, fill: '#2563eb' }} name="revenue"
              />
              <Line
                type="monotone" dataKey="target" stroke="#e2e8f0" strokeWidth={2}
                strokeDasharray="5 5" dot={false} name="target"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Service Popularity Pie */}
        <div className="chart-card">
          <div className="chart-title">Service Popularity</div>
          <div className="chart-subtitle">Bookings by service type</div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={servicePopularity}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
              >
                {servicePopularity.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => [`${v} bookings`]} />
            </PieChart>
          </ResponsiveContainer>
          {/* Legend */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
            {servicePopularity.map((s) => (
              <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: s.color, flexShrink: 0,
                }} />
                <span style={{ fontSize: '0.78rem', flex: 1, color: 'var(--text-primary)' }}>{s.name}</span>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: s.color }}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Appointments Bar + Rating Line */}
      <div className="grid-2" style={{ gap: '20px' }}>
        {/* Appointments Bar Chart */}
        <div className="chart-card">
          <div className="chart-title">Appointments Breakdown</div>
          <div className="chart-subtitle">Completed, pending, and cancelled per month</div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={appointmentsData} barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: '0.8rem' }} />
              <Bar dataKey="completed" stackId="a" fill="#10b981" radius={[0,0,0,0]} name="Completed" />
              <Bar dataKey="pending"   stackId="a" fill="#3b82f6" name="Pending" />
              <Bar dataKey="cancelled" stackId="a" fill="#ef4444" radius={[4,4,0,0]} name="Cancelled" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Rating Trend */}
        <div className="chart-card">
          <div className="chart-title">Rating Trend</div>
          <div className="chart-subtitle">Average customer rating over time</div>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={ratingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis domain={[4, 5]} tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <Tooltip formatter={(v) => [`${v} ⭐`]} />
              <Line
                type="monotone" dataKey="rating" stroke="#f59e0b" strokeWidth={3}
                dot={{ r: 5, fill: '#f59e0b' }} name="Avg Rating"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ProviderAnalytics;
