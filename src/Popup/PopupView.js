import Popup from './Popup';

const CN_POPUP = 'popup';
const CN_POPUP_VISIBLE = `${CN_POPUP}-visible`;
const CN_POPUP_HIDDEN = `${CN_POPUP}-hidden`;

const S_POPUP_WINDOW = `.${CN_POPUP}--window`;

const A_POPUP = 'data-popup';
const A_POPUP_DRAG_TRIGGER = `${A_POPUP}-drag-trigger`;
const A_POPUP_CLOSE = `${A_POPUP}-close`;


function getPopupElements(popupElement) {
	let window = popupElement.querySelector(S_POPUP_WINDOW);
	let dragTriggers = Array.from(popupElement.querySelectorAll(`[${A_POPUP_DRAG_TRIGGER}]`));
	let closers = Array.from(popupElement.querySelectorAll(`[${A_POPUP_CLOSE}]`));

	return {
		popup: popupElement,
		window,
		dragTriggers,
		closers
	};
}

class PopupView {
	constructor(...args) {
		let elements = (args[0] instanceof HTMLElement) ? getPopupElements(args[0]) : () => {};
		let initialPopupProps = Object.assign({elements}, args[1]);

		this._model = new Popup(initialPopupProps);
		this._initModelListeners(args[0]);
	}

	show() {
		this._model.show();
	}

	hide() {
		this._model.hide();
	}

	_initModelListeners() {
		let {window} = this._model.get('elements');

		this._model.on(`${Popup.E_CHANGED}:posX`, (x) => {
			window.style.left = x + 'px';
		});

		this._model.on(`${Popup.E_CHANGED}:posY`, (y) => {
			window.style.top = y + 'px';
		});

		this._model.on(`${Popup.E_CHANGED}:isVisible`, (isVisible) => {
			let {popup} = this._model.get('elements');

			popup.classList.add(isVisible ? CN_POPUP_VISIBLE : CN_POPUP_HIDDEN);
			popup.classList.remove(!isVisible ? CN_POPUP_VISIBLE : CN_POPUP_HIDDEN);
		});
	}
}

export default PopupView;