const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const contactsOperations = require("./contacts");

const arr = hideBin(process.argv);

const { argv } = yargs(arr);
console.log(argv);

(async () => {
    const { action, id, name, email, phone } = argv;
    switch (action) {
        case "list":
            const contacts = await contactsOperations.listContacts();
            console.log(contacts);
            break;
        case "get":
            const contact = await contactsOperations.getContactById(id);
            if (!contact) {
                console.log(`Contact with id=${id} not found`);
            }
            console.log(contact);
            break;
        case "add":
            const addContact = await contactsOperations.addContact({name, email, phone});
            console.log("new contact created");
            break;
        case "remove":
            const deleteContact = await contactsOperations.removeContact(id);
            console.log('contact deleted');
            break;
    }
})()