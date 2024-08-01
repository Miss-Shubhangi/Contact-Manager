import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import toast, { Toaster } from 'react-hot-toast';
import './AddContact.css';
import axios from 'axios';

const AddContact = () => {
  const { id } = useParams();
  const [user, setUser] = useState('');
  const [contactName, setContactName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      setUser(currentUser);
    } else {
      window.location.href = '/login';
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/contact`, {
        contactName,
        contact,
        email,
        dob
      });
      toast.success(response.data.message);

      setContactName('');
      setContact('');
      setEmail('');
      setDob('');

      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add contact');
    }
  };

  return (
    <div className="form-container">
      <h2>Add Contact in {user.fullName}'s phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="contactName">Contact Name</label>
          <input
            type="text"
            id="contactName"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contact">Contact</label>
          <input
            type="text"
            id="contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Add Contact</button>
      </form>
      <Toaster />
    </div>
  );
};

export default AddContact;
