import './ContactList.css';

const ContactList = ({ contacts, removeContact }) => {
  function capitalizeName(name) {
    const words = name.split(/[ -]/);
    const capitalizedWords = words.map(
      word => word.charAt(0).toUpperCase() + word.slice(1)
    );
    const capitalizedName = capitalizedWords.join(' ');
    return capitalizedName;
  }

  function handleClick(e) {
    const clickedBtn = e.target;
    const id = clickedBtn.id;
    removeContact(id);
  }

  return (
    <div>
      <h2>Contacts</h2>
      <ul className="contacts-list">
        {contacts.map(contact => {
          return (
            <li key={contact.id}>
              <p>
                <span>{capitalizeName(contact.name)}: </span>
                {contact.number}
              </p>
              <button
                type="button"
                id={contact.id}
                className="remove-button"
                onClick={handleClick}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default ContactList;
