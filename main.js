const dataContainer = document.getElementById('myId');    //контейнер для данных из firebase
const input = document.getElementsByClassName('input'); // инпут для ввода

const firebaseConfig = {                                           // подключение firebase
    apiKey: "AIzaSyCp07B1GILa3gEf2jgyc0ebPs2pXGKBBOk",
    authDomain: "black-function-344412.firebaseapp.com",
    databaseURL: "https://black-function-344412-default-rtdb.firebaseio.com",
    projectId: "black-function-344412",
    storageBucket: "black-function-344412.appspot.com",
    messagingSenderId: "272179474501",
    appId: "1:272179474501:web:778e014769b7629d44732c"
};

firebase.initializeApp(firebaseConfig);

const contactFormDB = firebase.database().ref("contactForm");

document.getElementById("contactForm").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();

    const name = getElementVal("name");
    const email = getElementVal("email");
    saveMessages(name, email);

    document.getElementById("contactForm").reset();
}

const saveMessages = (name, email) => {
    let newContactForm = contactFormDB.push();
    newContactForm.set({
        name: name,
        email: email,
    });
};

const getElementVal = (id) => {
    return document.getElementById(id).value;
};
                                                             // получение данных из firebase
contactFormDB.on('value', function (snapshot) {
    dataContainer.innerHTML = '';                           // очистка контейнера, чтобы предотвратить дублирование данных

    Object.keys(snapshot.val()).forEach((key, index) => {
        const newParagraph = document.createElement("p");
        newParagraph.classList.add('paragraph');
        dataContainer.append(newParagraph);
        newParagraph.innerText = `${index+1}. ${snapshot.val()[key].name} : ${snapshot.val()[key].email}`;
    });
});