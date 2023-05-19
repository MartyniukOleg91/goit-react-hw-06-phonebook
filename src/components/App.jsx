import React, { useState } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { useSelector } from 'react-redux';
import { getFilterValue } from 'store/selectors';
import { getContacts } from 'store/selectors';
import { useDispatch } from 'react-redux';
import { deleteContact } from '../store/contactSlice';

export default function App() {
  const filterValue = useSelector(getFilterValue);
  const contactValue = useSelector(getContacts);
  const dispatch = useDispatch();

  const [contacts, setContacts] = useState(contactValue);
  const [filter, setFilter] = useState('');

  const handleChange = e => {
    setFilter(filterValue);
  };

  const handleSubmit = date => {
    const id = nanoid();
    const name = date.name;
    const number = date.number;
    const contactsLists = [...contacts];

    if (contactsLists.findIndex(contact => name === contact.name) !== -1) {
      alert(`${name} is already in contacts.`);
    } else {
      contactsLists.push({ id, name, number });
    }

    setContacts(contactsLists);
  };

  const handleDelete = date => {
    setContacts(contacts.filter(contact => contact.id !== date));
    dispatch(deleteContact(date));
  };

  const getFilteredContacts = () => {
    const filterContactsList = contacts.filter(contact => {
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
      <ContactForm handleSubmit={handleSubmit} />
      <h2> Contacts</h2>
      <Filter filter={filter} handleChange={handleChange} />
      <ContactList
        contacts={getFilteredContacts()}
        handleDelete={handleDelete}
      />
    </div>
  );
}
