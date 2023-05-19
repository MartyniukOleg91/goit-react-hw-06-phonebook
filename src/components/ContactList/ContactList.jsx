import propTypes from 'prop-types';
import css from './ContactList.module.css';
import { useSelector } from 'react-redux';
import { getContacts, getFilterValue } from 'store/selectors';
import { deleteContact } from '../../store/contactSlice';
import { useDispatch } from 'react-redux';

export const ContactList = () => {
  const contactValue = useSelector(getContacts);
  const dispatch = useDispatch();
  const handleDelete = date => {
    dispatch(deleteContact(date));
  };

  const filterValue = useSelector(getFilterValue);

  const visibleContacts = contactValue.filter(contact =>
    contact.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <div className={css.wraperContactList}>
      <ul className={css.contactList}>
        {visibleContacts.map((contact, id) => (
          <li key={id} className={css.contactListItem}>
            {contact.name}: {contact.number}
            <button
              type="button"
              className={css.contactListItemBtn}
              onClick={() => handleDelete(contact.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

ContactList.propTypes = {
  contacts: propTypes.arrayOf(
    propTypes.exact({
      id: propTypes.string.isRequired,
      name: propTypes.string.isRequired,
      number: propTypes.string.isRequired,
    })
  ),
  handleDelete: propTypes.func.isRequired,
};
