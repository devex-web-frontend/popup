import Popup from '../src/Popup/PopupView';

let messagePopup = new Popup(document.querySelector('.popup-message'), {isDraggable: true});
let anotherPopup = new Popup(document.querySelector('.popup-oneMore'), {isDraggable: true});

let rectangle = document.getElementById('rectangle');

document.body.addEventListener('click', function(e) {
	switch (e.target.getAttribute('id')) {
		case 'showPopup':
			messagePopup.show();
			break;
		case 'showOneMorePopup':
			anotherPopup.show(50, 50);
			break;
		case 'showCenteredPopup':
			messagePopup.showCentered();
			break;
		case 'showCenteredPopupByElement':
			messagePopup.showCentered(rectangle);
			break;
		case 'showModalPopup':
			messagePopup.showModal();
			break;
	}
});

window.messagePopup = messagePopup;