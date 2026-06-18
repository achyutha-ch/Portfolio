let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

displayContacts();

function addContact() {

    const name = document.getElementById("nameInput").value.trim();
    const phone = document.getElementById("phoneInput").value.trim();
    const email = document.getElementById("emailInput").value.trim();

    if (!name || !phone || !email) {
        alert("Please fill all fields");
        return;
    }

    const contact = {
        id: Date.now(),
        name,
        phone,
        email
    };

    contacts.push(contact);

    localStorage.setItem("contacts", JSON.stringify(contacts));

    document.getElementById("nameInput").value = "";
    document.getElementById("phoneInput").value = "";
    document.getElementById("emailInput").value = "";

    displayContacts();
}

function displayContacts() {

    const container = document.getElementById("contactsContainer");

    container.innerHTML = "";

    contacts.forEach(contact => {

        const card = document.createElement("div");

        card.className = "contact-card";

        card.innerHTML = `
            <div class="avatar">
                ${contact.name.charAt(0).toUpperCase()}
            </div>

            <div class="contact-name">
                ${contact.name}
            </div>

            <div class="contact-phone">
                📞 ${contact.phone}
            </div>

            <div class="contact-email">
                📧 ${contact.email}
            </div>

            <div class="card-buttons">
                <button
                    class="delete-btn"
                    onclick="deleteContact(${contact.id})">
                    Delete
                </button>
            </div>
        `;

        container.appendChild(card);
    });

    updateCount();
}

function deleteContact(id) {

    contacts = contacts.filter(contact => contact.id !== id);

    localStorage.setItem("contacts", JSON.stringify(contacts));

    displayContacts();
}

function updateCount() {

    const countElement = document.getElementById("contactCount");

    if(countElement){
        countElement.textContent = contacts.length;
    }
}