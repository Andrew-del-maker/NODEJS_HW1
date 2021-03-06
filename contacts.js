const { v4 } = require('uuid');
const fs = require('fs').promises;
const path = require('path');
const contactsPath = path.join(__dirname, "/db/contacts.json");

const  listContacts = async()=> {
    const data = await fs.readFile(contactsPath);
    const contacts =  JSON.parse(data);
    return contacts;
}

const  getContactById = async(contactId) => {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === contactId);
    if (idx === -1) {
        return null;
    }
    return contacts[idx];
}

const removeContact = async(contactId) => {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === contactId);
    if (idx === -1) {
        return null;
    }
    contacts.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return true;
}

const addContact = async(data) =>{
    const contacts = await listContacts();
    const newContact = { ...data, id: v4() };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}