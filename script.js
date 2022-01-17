const select = document.querySelector('#nbBoutons');

const buttonsArray = document.getElementsByClassName('button')
const selectsButtonsArray = document.getElementsByClassName('select_btn')
const checkboxArray = document.getElementsByClassName('blinkingBox')

const contactsArray = document.getElementsByClassName('contact')
const selectsContactArray = document.getElementsByClassName('select_contact')

function updateButtons() {
    for (let i = 0; i < select.value; i++) {
        buttonsArray[i].classList.remove((buttonsArray[i].classList[1]))
        buttonsArray[i].classList.add(selectsButtonsArray[i].value)
        if (selectsButtonsArray[i].value === "BP_STARTSTOP") {
            buttonsArray[i].textContent = "Start/Stop"
            checkboxArray[i].disabled = true;
            checkboxArray[i].checked = false;

        } else if (selectsButtonsArray[i].value === "BP_AU") {
            buttonsArray[i].textContent = "Arrêt d'urgence"
            checkboxArray[i].disabled = true;
            checkboxArray[i].checked = false;
        } else {
            buttonsArray[i].textContent = ""
            checkboxArray[i].disabled = false;
        }
        //buttonsArray[i].classList.add("button")

    }
    for (let j = 0; j < select.value; j++) {
        if (checkboxArray[j].checked) {
            buttonsArray[j].classList.add("blink")
        } else {
            buttonsArray[j].classList.remove("blink")
        }
    }

}

function updateContactors() {
    for (let i = 0; i < select.value; i++) {
        //console.log(contactsArray[i].textContent);
        contactsArray[i].textContent = selectsContactArray[i].value
        contactsArray[i].classList.remove((contactsArray[i].classList[1]))
        contactsArray[i].classList.add(selectsContactArray[i].value)
    }
}

function start() {
    if (select.value === "3") {
        document.getElementById('btn4').style.display = 'none'
        document.getElementById('btn4displayed').style.opacity = '0'
        document.getElementById('contact4displayed').style.opacity = '0'
        document.getElementById('box').style.height = '450px'
        document.getElementById('box2').style.height = '450px'

    } else if (select.value === "4") {
        document.getElementById('btn4').style.display = 'inline'
        document.getElementById('btn4displayed').style.opacity = '100'
        document.getElementById('contact4displayed').style.opacity = '100'
        document.getElementById('box').style.height = '580px'
        document.getElementById('box2').style.height = '580px'
    }

    updateButtons();
    updateContactors();
}

function setupJSON() {
    let b4, c4;
    if (select.value === "3") {
        b4 = null;
        c4 = null;
    } else {
        b4 = {"color" : getColor(selectsButtonsArray[3].value), "blink":checkboxArray[3].checked}
        c4 = getContact(selectsContactArray[3].value);
    }
    let json = {
        "commande": {
            "b1": {"color" : getColor(selectsButtonsArray[0].value), "blink":checkboxArray[0].checked},
            "b2": {"color" : getColor(selectsButtonsArray[1].value), "blink":checkboxArray[1].checked},
            "b3": {"color" : getColor(selectsButtonsArray[2].value), "blink":checkboxArray[2].checked},
            "b4": b4,
            "c1": getContact(selectsContactArray[0].value),
            "c2": getContact(selectsContactArray[1].value),
            "c3": getContact(selectsContactArray[2].value),
            "c4": c4,
        }
    }
    console.log(json)

   fetch('http://172.31.116.136:3000/nouvelleCommande', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(json),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert("Commande validée !")
        })
        .catch((error) => {
            console.error('Error:', error);
        })
}


function getColor(button) {
    switch (button) {
        case "BP_GREEN":
            return "green"
        case "BP_RED":
            return "red"
        case "BP_BLUE":
            return "blue"
        case "BP_AU":
            return "au"
        case "BP_STARTSTOP":
            return "startstop"
    }
}

function getContact(contact) {
    switch (contact) {
        case "NC":
            return "close"
        case "NO":
            return "open"
    }
}
