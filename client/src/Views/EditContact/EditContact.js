import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import './EditContact.css';

const EditContact = () => {
  const { id } = useParams();
  const [contactName, setContactName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');

  const loadContact = async () => {
    try {
      if (!id) {
        return;
      }
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/contact/${id}`);
      const { contactName, contact, email, dob } = response.data.data;
      setContactName(contactName);
      setContact(contact);
      setEmail(email);
      setDob(dob);
    } catch (error) {
      toast.error('Failed to load contact');
    }
  };

  const updateContact = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/contact/${id}`, {
        contactName,
        contact,
        email,
        dob
      });
      toast.success(response.data.message);
      toast.loading('Redirecting to dashboard...');

      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update contact');
    }
  };

  useEffect(() => {
    loadContact();
  }, [id]);

  return (
    <div className="edit-contact-container">
      <h2>Edit Contact</h2>
      <form className="edit-contact-form" onSubmit={updateContact}>
        <div className="input-container">
          <label htmlFor="contactName">Contact Name</label>
          <input
            type="text"
            id="contactName"
            placeholder="Contact Name"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="contact">Contact</label>
          <input
            type="text"
            id="contact"
            placeholder="Contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Update Contact</button>
      </form>
      <Toaster />
    </div>
  );
};

export default EditContact;
