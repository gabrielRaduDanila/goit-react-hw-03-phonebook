import { Component } from 'react';
import ContactForm from './contact-form/ContactForm';
import ContactList from './contact-list/ContactList';
import Filter from './filter/Filter';
import { getStorageItem, setStorageItem } from './local-storage/localStorage';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      contacts: getStorageItem('contacts'),
      filter: '',
    };
  }

  addContact = contact => {
    this.setState(prevState => {
      const tempContacs = [...prevState.contacts];
      tempContacs.push(contact);
      return { contacts: tempContacs };
    });
  };
  addFilterValue = value => {
    this.setState({
      filter: value,
    });
  };

  removeContact = id => {
    const tempContact = [...this.state.contacts];
    const newContacts = tempContact.filter(contact => contact.id !== id);
    this.setState({
      contacts: newContacts,
    });
  };

  findFilteredContacts = () => {
    const contacts = this.state.contacts;
    const typedName = this.state.filter.toLowerCase();
    const filterdContact = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(typedName);
    });
    return filterdContact;
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      setStorageItem('contacts', this.state.contacts);
    }
  }

  render() {
    const contacts = this.state.contacts;
    const filter = this.state.filter;
    return (
      <div style={{ padding: 20 }}>
        <h1>Phonebook</h1>
        <div>
          <h2>Contacts</h2>
          <ContactForm
            contacts={this.state.contacts}
            addContact={this.addContact}
          />
        </div>
        {contacts.length > 0 && <Filter addFilterValue={this.addFilterValue} />}
        {contacts.length > 0 && filter.length === 0 && (
          <ContactList contacts={contacts} removeContact={this.removeContact} />
        )}

        {filter.length > 0 && (
          <ContactList
            contacts={this.findFilteredContacts()}
            removeContact={this.removeContact}
          />
        )}
        {contacts.length === 0 && filter.length === 0 && (
          <h3>Add contacts to be displayed</h3>
        )}
      </div>
    );
  }
}
