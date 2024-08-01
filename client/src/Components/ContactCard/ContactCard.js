import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Person from './user.png';
import Delete from './delete.png';
import Edit from './edit.png';
import './ContactCard.css';
import toast, { Toaster } from 'react-hot-toast';

const ContactCard = ({ id, contactName, contact, email, dob, loadContacts }) => {
  const onDelete = async (contactId) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/contact/${contactId}`);
      toast.success(response.data.message);
      loadContacts();
    } catch (e) {
      if (e.response && e.response.status === 404) {
        toast.error('Contact not found.');
      } else if (e.response && e.response.status === 403) {
        toast.error('Not authorized to delete this contact.');
      } else {
        toast.error(e.response?.data?.message || 'Error deleting contact');
      }
    }
  };

  return (
    <div className="contact-card">
      <img src={Person} alt="Person" className="person-img" />
      <div className="contact-info">
        <strong className="contact-name">{contactName}</strong>
        <p className="contact-detail"><strong>Contact:</strong> {contact}</p>
        <p className="contact-detail"><strong>Email:</strong> {email}</p>
        <p className="contact-detail"><strong>DOB:</strong> {new Date(dob).toLocaleDateString()}</p>
      </div>
      <div className="button-group">
        <Link to={`/editcontact/${id}`}>
          <img src={Edit} alt="Edit" className="button-icon" />
        </Link>
        <img
          src={Delete}
          alt="Delete"
          onClick={() => onDelete(id)}
          className="button-icon"
        />
      </div>
      <Toaster />
    </div>
  );
};

export default ContactCard;
