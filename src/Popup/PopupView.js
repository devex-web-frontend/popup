import Popup from './Popup';
import Draggable from '../Draggable/Draggable';

const CN_POPUP = 'popup';
const CN_POPUP_VISIBLE = `${CN_POPUP}-visible`;
const CN_POPUP_HIDDEN = `${CN_POPUP}-hidden`;

const S_POPUP_WINDOW = `.${CN_POPUP}--window`;

const A_POPUP = 'data-popup';
const A_POPUP_DRAG_TRIGGER = `${A_POPUP}-drag-trigger`;
const A_POPUP_CLOSE = `${A_POPUP}-close`;

const Z_INDEX_OFFSET = 30;

const DRAGGABLE_OPTIONS = {
		enabled: false,
		restrict: {
			restriction: document.body,
			elementRect: {
				top: 0,
				right: 1,
				left: 0,
				bottom: 1
			}
		},
		maxPerElement: Infinity
};

/**
 * Compute element sizes if it is hidden
 * @param {HTMLElement} element
 * @param {HTMLElement} [hiddenParent]
 */
function getSizesOfHiddenElement(element, hiddenParent) {
	let hiddenElement = hiddenParent || element;
	let width;
	let height;

	hiddenElement.style.visibility = 'hidden';
	hiddenElement.style.display = 'block';
	hiddenElement.style.position = 'absolute';

	[width, height] = getElementSizes(element);

	hiddenElement.style.visibility = '';
	hiddenElement.style.display = '';
	hiddenElement.style.position = '';

	return [width, height];
}

function getElementSizes(element) {
	let {width, height} = element.getBoundingClientRect();

	return [width, height];
}


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

		this._model = new Popup();
		this.elements = elements;

		this._initDraggables();
		this._initModelListeners(args[0]);
		this._initUIListeners();

		this._model.set(args[1]);
	}


	/**
	 * Shows popup
	 * @param {Number} [x]
	 * @param {Number} [y]
	 */
	show(x, y) {
		if (typeof x !== 'undefined' && typeof y !== 'undefined') {
			this._model.set({
				posX: x,
				posY: y
			});
		}

		this._model.show();
	}

	/**
	 * Shows popup at center of window or element if it provided
	 * @param {HTMLElement} [origin]
	 */
	showCentered(origin) {
		let parentOffsetX = 0;
		let parentOffsetY = 0;
		let parentWidth = window.innerWidth;
		let parentHeight = window.innerHeight;
		let [popupWindowWidth, popupWindowHeight] = this.getWindowSizes();

		if (origin) {
			let bounds = origin.getBoundingClientRect();
			parentWidth = bounds.width;
			parentHeight = bounds.height;
			parentOffsetX = bounds.left;
			parentOffsetY = bounds.top;
		}

		let x = (parentWidth / 2) - (popupWindowWidth / 2) + parentOffsetX;
		let y = (parentHeight / 2) - (popupWindowHeight / 2) + parentOffsetY;

		this.show(x, y);
	}


	/**
	 * Computes and return popup window sizes
	 * @returns [width:number, height:number]
	 */
	getWindowSizes() {
		let {popup, window} = this.elements;
		let isVisible = this._model.get('isVisible');

		return isVisible ? getElementSizes(window) : getSizesOfHiddenElement(window, popup);
	}

	/**
	 * hides popup
	 */
	hide() {
		this._model.hide();
	}

	_initDraggables() {
		let elements = this.elements;
		let draggableOptions = Object.assign({}, DRAGGABLE_OPTIONS, {origin: elements.popup});

		this._draggables = elements.dragTriggers.map((trigger) => {
			let draggable = new Draggable(trigger, draggableOptions);
			draggable.onMove((e) => {
				this._model.move(e.dx, e.dy);
			});

			return draggable;
		});
	}

	_initUIListeners() {
		let {popup} = this.elements;

		popup.addEventListener('mousedown', () => {
			this._model.toFront();
		});

		popup.addEventListener('click', (e) => {
			//TODO: Use get ascendant from DXJS lib
			if (e.target.hasAttribute(A_POPUP_CLOSE)) {
				this.hide();
			}
		});
	}

	_enableDragging() {
		this._draggables.forEach((draggable) => {
			draggable.enable();
		});
	}

	_disableDragging() {
		this._draggables.forEach((draggable) => {
			draggable.disable();
		});
	}

	_initModelListeners() {
		let {window} = this.elements;

		this._model.on(`${Popup.E_CHANGED}:posX`, (x) => {
			window.style.left = x + 'px';
		});

		this._model.on(`${Popup.E_CHANGED}:posY`, (y) => {
			window.style.top = y + 'px';
		});

		this._model.on(`${Popup.E_CHANGED}:isVisible`, (isVisible) => {
			let {popup} = this.elements;

			popup.classList.add(isVisible ? CN_POPUP_VISIBLE : CN_POPUP_HIDDEN);
			popup.classList.remove(!isVisible ? CN_POPUP_VISIBLE : CN_POPUP_HIDDEN);
		});

		this._model.on(`${Popup.E_CHANGED}:isDraggable`, (isDraggable) => {
			return (isDraggable) ? this._enableDragging() : this._disableDragging();
		});

		this._model.on(`${Popup.E_CHANGED}:orderPosition`, (position) => {
			let {popup} = this.elements;

			popup.style.zIndex = Z_INDEX_OFFSET + position;
		});
	}
}

export default PopupView;