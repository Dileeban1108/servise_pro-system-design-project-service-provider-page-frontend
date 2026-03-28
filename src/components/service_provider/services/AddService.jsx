import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  'Home Repair', 'Plumbing', 'Electrical', 'Cleaning',
  'Landscaping', 'Painting', 'HVAC', 'Carpentry', 'Moving', 'Other',
];

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const AddService = () => {
  const navigate = useNavigate();
  const [selectedDays, setSelectedDays] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
  const [form, setForm] = useState({
    name: '', category: '', description: '', price: '', duration: '', maxBookings: '', tags: '',
    startTime: '08:00', endTime: '18:00',
  });

  const toggleDay = (day) =>
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Service added successfully! (mock)');
    navigate('/provider/manage-services');
  };

  return (
    <div className="form-page-layout">
      <div className="page-header">
        <div className="page-title-group">
          <h1>Add New Service</h1>
          <p>Fill in the details to list a new service for clients.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Service Details */}
        <div className="form-section">
          <div className="form-section-title">Service Details</div>
          <div className="form-section-sub">Basic information about the service you offer.</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Service Name *</label>
              <input className="form-input" name="name" value={form.name}
                onChange={handleChange} placeholder="e.g. Pipe Leak Repair" required />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Category *</label>
                <select className="form-select" name="category" value={form.category}
                  onChange={handleChange} required>
                  <option value="">Select a category</option>
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Duration (minutes) *</label>
                <input className="form-input" name="duration" type="number" value={form.duration}
                  onChange={handleChange} placeholder="e.g. 60" min="15" required />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Description *</label>
              <textarea className="form-textarea" name="description" value={form.description}
                onChange={handleChange}
                placeholder="Describe what the service includes, tools used, what clients can expect..."
                rows={4} required />
            </div>

            <div className="form-group">
              <label className="form-label">Tags</label>
              <input className="form-input" name="tags" value={form.tags}
                onChange={handleChange} placeholder="e.g. emergency, same-day, indoor (comma-separated)" />
              <span className="form-hint">Helps clients find your service faster.</span>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="form-section">
          <div className="form-section-title">Pricing</div>
          <div className="form-section-sub">Set your service rate and booking limits.</div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Price ($) *</label>
              <div className="price-input-wrap">
                <span className="price-prefix">$</span>
                <input className="form-input" name="price" type="number" value={form.price}
                  onChange={handleChange} placeholder="0.00" min="0" step="0.01" required />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Max Bookings per Day</label>
              <input className="form-input" name="maxBookings" type="number" value={form.maxBookings}
                onChange={handleChange} placeholder="e.g. 4" min="1" />
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="form-section">
          <div className="form-section-title">Availability</div>
          <div className="form-section-sub">Set which days and hours you're available for this service.</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="form-group">
              <label className="form-label">Available Days</label>
              <div className="days-grid">
                {days.map((d) => (
                  <button type="button" key={d}
                    className={`day-toggle${selectedDays.includes(d) ? ' selected' : ''}`}
                    onClick={() => toggleDay(d)}>
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Start Time</label>
                <input className="form-input" type="time" name="startTime"
                  value={form.startTime} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label">End Time</label>
                <input className="form-input" type="time" name="endTime"
                  value={form.endTime} onChange={handleChange} />
              </div>
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div className="form-section">
          <div className="form-section-title">Service Image</div>
          <div className="form-section-sub">Upload a photo that represents your service.</div>

          <div className="upload-area">
            <div className="upload-area-icon">🖼️</div>
            <h4>Click to upload or drag & drop</h4>
            <p>PNG, JPG or WEBP • Max 5MB</p>
          </div>
        </div>

        {/* Actions */}
        <div className="form-actions">
          <button type="button" className="btn btn-secondary"
            onClick={() => navigate('/provider/manage-services')}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            ✅ Publish Service
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddService;
