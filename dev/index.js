import Popup from '../src/Popup/PopupView';


let messagePopup = window.msgPopup = new Popup(document.querySelector('.popup-message'), {isDraggable: true});
let showPopupBtn = document.getElementById('showPopup');

let anotherPopup = window.msgPopup = new Popup(document.querySelector('.popup-oneMore'), {isDraggable: true});
let showOneMorePopupBtn = document.getElementById('showOneMorePopup');

showPopupBtn.addEventListener('click', () => {
	messagePopup.show();
});

showOneMorePopupBtn.addEventListener('click', () => {
	anotherPopup.show();
});
window.messagePopup = messagePopup;