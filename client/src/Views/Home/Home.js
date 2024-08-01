import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import ContactCard from '../../Components/ContactCard/ContactCard';
import toast, { Toaster } from 'react-hot-toast';
import New from './new-account.png'
import './Home.css';

function Home() {
  const [user, setUser] = useState(null);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      setUser(currentUser);
    } else {
      window.location.href = '/login';
    }
  }, []);

  const loadContacts = async () => {
    if (!user?._id) return;
    toast.loading('Loading Contacts...');

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/contacts`, {
        params: { userId: user._id },
      });
      const allContacts = response.data.data;
      toast.dismiss();
      setContacts(allContacts);
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to load contacts');
    }
  };

  useEffect(() => {
    if (user) {
      loadContacts();
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.clear();
    toast.success('Logged out successfully');
    setTimeout(() => {
      window.location.href = '/login';
    }, 3000);
  };

  return (
    <div className='home-container'>
      <div className="header-container">
        <p className="home-greeting">Hello {user?.fullName}</p>
        <span className="home-logout" onClick={handleLogout}>
          Logout
        </span>
      </div>
      <h1 className='heading'>All Contacts ... !</h1>
     <Link to={'/addcontact'}><img src={New} className='new-contact' /></Link> 
      <div className='contacts-container'>
        {contacts.map((contact) => {
          const { _id, contactName, contact: phone, email, dob, createdAt } = contact;
          return (
            <ContactCard
              key={_id}
              id={_id}
              contactName={contactName}
              contact={phone}
              email={email}
              dob={dob}
              createdAt={createdAt}
              loadContacts={loadContacts}
            />
          
          );
        })}
      </div>
      <Toaster />
    </div>
  );
}

export default Home;
