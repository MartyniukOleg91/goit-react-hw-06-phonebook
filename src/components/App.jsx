import React, { useState } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { useSelector } from 'react-redux';
import { getFilterValue } from 'store/selectors';
import { getContacts } from 'store/selectors';

export default function App() {
  const filterValue = useSelector(getFilterValue);
  const contactValue = useSelector(getContacts);

  const [filter, setFilter] = useState('');

  const handleChange = e => {
    setFilter(filterValue);
  };

  const getFilteredContacts = () => {
    const filterContactsList = contactValue.filter(contact => {
      return contact.name.toLowerCase().includes(filterValue.toLowerCase());
    });
    return filterContactsList;
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20,
        color: '#010101',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm />
      <h2> Contacts</h2>
      <Filter filter={filter} handleChange={handleChange} />
      <ContactList contacts={getFilteredContacts()} />
    </div>
  );
}
