import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Contacts.css';

const API_BASE_URL = 'http://localhost:5000/api';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/contacts`);
      setContacts(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching contacts:", error);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone) return;

    try {
      if (editingId) {
        await axios.put(`${API_BASE_URL}/contacts/${editingId}`, { name, phone });
      } else {
        await axios.post(`${API_BASE_URL}/contacts`, { name, phone });
      }
      setName('');
      setPhone('');
      setEditingId(null);
      fetchContacts();
    } catch (error) {
      console.error("Error saving contact:", error);
    }
  };

  const handleEdit = (contact) => {
    setName(contact.name);
    setPhone(contact.phone);
    setEditingId(contact._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this alert contact?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/contacts/${id}`);
      fetchContacts();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  return (
    <div className="contacts-container">
      <div className="contacts-header">
        <h2>SMS Alert Contacts</h2>
        <p>Manage the mobile numbers that will receive alerts via the ESP32 GSM module.</p>
      </div>

      <div className="contacts-content">
        <div className="form-card">
          <h3>{editingId ? 'Edit Contact' : 'Add New Contact'}</h3>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label>Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="e.g. John Doe" 
                required 
              />
            </div>
            <div className="form-group">
              <label>Mobile Number</label>
              <input 
                type="text" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                placeholder="e.g. +919876543210" 
                required 
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editingId ? 'Update Contact' : 'Save Contact'}
              </button>
              {editingId && (
                <button type="button" className="btn-secondary" onClick={() => {
                  setEditingId(null);
                  setName('');
                  setPhone('');
                }}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="list-card">
          <h3>Registered Numbers</h3>
          {loading ? (
            <p className="loading">Loading contacts...</p>
          ) : contacts.length === 0 ? (
            <p className="empty-state">No contacts added yet. Add one to start sending SMS alerts.</p>
          ) : (
            <ul className="contacts-list">
              {contacts.map(contact => (
                <li key={contact._id} className="contact-item">
                  <div className="contact-info">
                    <strong>{contact.name}</strong>
                    <span>{contact.phone}</span>
                  </div>
                  <div className="contact-actions">
                    <button onClick={() => handleEdit(contact)} className="btn-icon edit">Edit</button>
                    <button onClick={() => handleDelete(contact._id)} className="btn-icon delete">Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contacts;
