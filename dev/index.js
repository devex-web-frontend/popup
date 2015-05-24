import Popup from '../src/Popup/PopupView';


let messagePopup = new Popup(document.querySelector('.popup-message'), {isDraggable: true});
let showPopupBtn = document.getElementById('showPopup');

showPopupBtn.addEventListener('click', () => {
	messagePopup.show();
});
window.messagePopup = messagePopup;