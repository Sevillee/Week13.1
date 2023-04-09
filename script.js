// Fill-in field

const userNameInput = document.querySelector('#userName');
const userAvatarInput = document.querySelector('#avatarLink');
const userCommentsInput = document.querySelector('#userComments');
const sendCommnetButton = document.querySelector('#sendButton');

// Chat Board

const usersChatBoard = document.querySelector('.chatArea');
const messages = document.querySelector('.messages');

const checkName = () => {
    const name = userNameInput.value;
    const userName = name.trim().split(' ');
    const changedName = [];

    userName.forEach((element) => {
        let newName = element[0].toUpperCase() + element.slice(1).toLowerCase();
        changedName.push(newName);
    });

    const nameFormatted = changedName.join(' ');
    return nameFormatted;
};

userNameInput.addEventListener('change', () => {
    userNameInput.value = checkName();
});

// spam check

const checkMessage = (spam) => {
    const str = spam.replace(/viagra|сволочь|гад/gi, '***');
    return str;
};

const createMessage = () => {
    const message = document.createElement('div');
    message.className = 'message';
    messages.prepend(message);

    const messagesMain = document.createElement('div');
    message.className = 'messages-main';
    message.append(messagesMain);

    const messageUserName = document.createElement('p');
    messageUserName.className = 'message_name';

    if (userNameInput.value !== '') {
        messageUserName.innerHTML = checkName ();
    }
    else {
        messageUserName.innerHTML = 'Username';
    }
    messagesMain.append(messageUserName);

    // text
    const messageText = document.createElement('p');
    messageText.className = 'message_text';
    messageText.innerHTML = checkMessage(userCommentsInput.value);
    messagesMain.append(messageText);

    // avatar
    console.log('avatar', userAvatarInput.value); // https://www.google.com/search?q=owl&newwindow=1&sxsrf=APwXEdcZYLBYnNULs0t4L2LXwauFxStOxg:1681043714744&source=lnms&tbm=isch&sa=X&ved=2ahUKEwikheDr55z-AhXQvosKHUb7CUsQ_AUoAXoECAEQAw&biw=1920&bih=886&dpr=1#imgrc=oJj-DpjmTNmLqM
 

    //
    addDate(message);

    userAvatarInput.value ? addAvatar(userAvatarInput.value, message) : addRandomAvatar(message);

    


    // removing elements over 5

    if (messages.childElementCount > 5) {
        messages.removeChild (messages.lastChild);
    }

    // clear all inputs
    userNameInput.value = "";
    userAvatarInput.value = "";

};

sendCommnetButton.addEventListener('click', () => {
    createMessage();
    addDate();
    userCommentsInput.value = '';
});

// Создаем новый img-элемент для аватара
function addRandomAvatar(element) {
    const imagesVariations = [1,2,3];
    const randomIndex = Math.floor(Math.random()*imagesVariations.length);
    const messageAvatar = document.createElement('img');
    messageAvatar.classList.add('avatarimg');
    messageAvatar.src = `assets/${imagesVariations[randomIndex]}.png`;
    element && element.prepend(messageAvatar);
}

function addAvatar(imgSrc, element) {
    const messageAvatar = document.createElement('img');
    messageAvatar.classList.add('avatarimg');
    messageAvatar.src = imgSrc;
    element && element.prepend(messageAvatar);
}


// функционал чекбокса (можем инвертировать состояние по клику, так как элементов два)
const checkboxes = document.querySelectorAll('.name_checkbox');
checkboxes.forEach((el, key) => el.addEventListener('click', (event) => invertCheckboxes(event.target.checked, key)));
function invertCheckboxes(checked, key) {
    checkboxes.forEach((el, elKey) => el.checked = elKey !== key ? !el.checked : checked);
}
function getDate() {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    return `Date: ${day}-${month}-${year} time:-${hours}:${minutes}`;
}

function addDate(elem) {
    const message = document.createElement('p');
    message.innerHTML = getDate();
    elem && elem.append(message);
}

