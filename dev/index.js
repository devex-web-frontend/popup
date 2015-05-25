import Popup from '../src/Popup/PopupView';


let messagePopup = window.msgPopup = new Popup(document.querySelector('.popup-message'), {isDraggable: true, isVisible: true});
let showPopupBtn = document.getElementById('showPopup');

showPopupBtn.addEventListener('click', () => {
	messagePopup.show();
});
window.messagePopup = messagePopup;