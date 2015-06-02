import Popup from '../index';

let messagePopup = Popup.createPopup(document.querySelector('.popup-message'));
let anotherPopup = Popup.createPopup(document.querySelector('.popup-oneMore'));

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
		case 'createPopupFromCfg':
			let popup = window.cfgPopup =  Popup.createPopup({
				title: 'Test title from cfg',
				content: '<a href="http://google.com">google.com</a>',
				buttons: [
					{
						text: 'cancel',
						modifiers: ['secondary'],
						isCloser: true
					},
					{
						text: 'ok',
						modifiers: ['primary']
					}
				]
			});
			popup.show();
			break;
	}
});

window.messagePopup = messagePopup;