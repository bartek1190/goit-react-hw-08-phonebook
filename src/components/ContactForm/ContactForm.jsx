import { v4 as uuidv4 } from 'uuid';
import css from './ContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/operations';
import { selectContacts } from '../../redux/selectors';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const newName = form.elements.name.value;
    const newNumber = form.elements.number.value;

    const isNameAlreadyExists = contacts.find(
      contact => contact.name === newName
    );
    const isNumberAlreadyExists = contacts.filter(contact =>
      contact.phone.includes(newNumber)
    ).length;

    if (isNameAlreadyExists) {
      alert(`${newName} is already in your contact list.`);
    } else if (isNumberAlreadyExists) {
      alert(`${newName} cannot have the same number as your other contact.`);
    } else if (newName !== '' || newNumber !== '') {
      dispatch(
        addContact({
          name: newName,
          phone: newNumber,
        })
      );
      form.reset();
    }
  };

  const generateUniqueId = () => uuidv4();
  const nameInputId = generateUniqueId();
  const numberInputId = generateUniqueId();

  return (
    <form className={css.contactForm} onSubmit={handleSubmit}>
      <label htmlFor={nameInputId}>Name</label>
      <input
        className={css.contactForm__input}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+([ -'][a-zA-Zа-яА-Я]+)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        id={nameInputId}
        required
      />
      <label htmlFor={numberInputId}>Number </label>
      <input
        className={css.contactForm__input}
        type="tel"
        name="number"
        pattern="^[+]?[0-9 \u0028\u0029\u002D]*$"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        id={numberInputId}
        required
      />

      <button type="submit">Add contact</button>
    </form>
  );
};
