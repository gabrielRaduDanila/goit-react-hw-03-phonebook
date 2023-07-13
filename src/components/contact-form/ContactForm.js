import { Component } from 'react';
import { nanoid } from 'nanoid';
import './ContactForm.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  changeHandle = e => {
    const selectedInput = e.target;
    if (selectedInput.name === 'name') {
      const pattern =
        /^[a-zA-Zа-яА-Я]+([' -]?[a-zA-Zа-яА-Я ]?[a-zA-Zа-яА-Я]*)*$/;
      const typedName = selectedInput.value;
      const isNameValid = pattern.test(typedName);
      if (!isNameValid && typedName.length > 0) {
        alert(selectedInput.title);
      }
      this.setState({ name: typedName });
    }
    if (selectedInput.name === 'number') {
      const pattern = /^\+?[\d\s-]+$/;
      const typedNumber = selectedInput.value;
      let isNumberValid = pattern.test(typedNumber);
      if (!isNumberValid && typedNumber.length > 0) {
        alert(selectedInput.title);
      }
      this.setState({ number: typedNumber });
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    const phoneBookNames = this.props.contacts;
    const matchPerson = phoneBookNames.find(
      pers => pers.name === this.state.name
    );
    if (matchPerson) {
      alert(`${matchPerson.name} is already in contacts`);
      return;
    }
    const person = {
      id: nanoid(5),
      name: this.state.name,
      number: this.state.number,
    };
    this.props.addContact(person);
    this.setState({
      name: '',
      number: '',
    });
    e.target.reset();
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="phonebookForm">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.changeHandle}
          />
          <label htmlFor="number">Number</label>
          <input
            type="tel"
            name="number"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.changeHandle}
          />
          <button type="submit">Add Contact</button>
        </form>
      </div>
    );
  }
}
export default ContactForm;
