'use strict';

import PopupModel from './PopupModel';
import PopupManager from './PopupManager';
import Draggable from '../Draggable/Draggable';
import helpers from '../Helpers/Helpers';

const CN_POPUP = 'popup';
const CN_POPUP_VISIBLE = `${CN_POPUP}-visible`;
const CN_POPUP_HIDDEN = `${CN_POPUP}-hidden`;
const CN_POPUP_MODAL = `${CN_POPUP}-modal`;
const CN_POPUP_CENTERED = `${CN_POPUP}-centered`;
const CN_POPUP_WINDOW = `${CN_POPUP}--window`;
const CN_POPUP_TITLE = `${CN_POPUP}--title`;
const CN_POPUP_CONTENT = `${CN_POPUP}--content`;
const CN_POPUP_BUTTONS = `${CN_POPUP}--buttons`;

const CN_BUTTON = 'button';

const S_POPUP_WINDOW = `.${CN_POPUP_WINDOW}`;

const A_POPUP = 'data-popup';
const A_POPUP_DRAG_TRIGGER = `${A_POPUP}-drag-trigger`;
const A_POPUP_CLOSE = `${A_POPUP}-close`;

const Z_INDEX_OFFSET = 30;

const DRAGGABLE_OPTIONS = {
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

class PopupView{

	/**
	 * @param {HTMLElement} element
	 * @param {Object} model
	 */
	constructor(element, model) {

		this.elements = (element instanceof HTMLElement) ? getPopupElements(element) : createPopupElements(element);

		this._model = model;
		this._initModelListeners();
		this._initDraggables();
		this._initUIListeners();
	}

	_initDraggables() {
		let elements = this.elements;
		let draggableOptions = Object.assign({
			enabled: this._model.get('isDraggable')
		}, DRAGGABLE_OPTIONS, {origin: elements.popup});

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
				this._model.hide();
			}
		});
	}

	_enableDragging() {
		let isDraggable = this._model.get('isDraggable');

		if (isDraggable) {
			this._draggables.forEach((draggable) => {
				draggable.enable();
			});
		}
	}

	_disableDragging() {
		this._draggables.forEach((draggable) => {
			draggable.disable();
		});
	}

	_initModelListeners() {
		let {window} = this.elements;

		this._model.on(`${PopupModel.E_CHANGE}:${PopupModel.PROP_POS_X}`, (x) => {
			window.style.left = (x === '') ? x : x + 'px';
		});

		this._model.on(`${PopupModel.E_CHANGE}:${PopupModel.PROP_POS_Y}`, (y) => {
			window.style.top = (y === '') ? y : y + 'px';
		});

		this._model.on(`${PopupModel.E_CHANGE}:${PopupModel.PROP_IS_VISIBLE}`, (isVisible) => {
			let {popup} = this.elements;

			popup.classList.add(isVisible ? CN_POPUP_VISIBLE : CN_POPUP_HIDDEN);
			popup.classList.remove(!isVisible ? CN_POPUP_VISIBLE : CN_POPUP_HIDDEN);
		});

		this._model.on(`${PopupModel.E_CHANGE}:${PopupModel.PROP_IS_DRAGGING_ALLOWED}`, (isDraggingAllowed) => {
			return (isDraggingAllowed) ? this._enableDragging() : this._disableDragging();
		});

		this._model.on(`${PopupModel.E_CHANGE}:${PopupManager.PROP_ORDER_POSITION}`, (position) => {
			let {popup} = this.elements;

			popup.style.zIndex = Z_INDEX_OFFSET + position;
		});

		this._model.on(`${PopupModel.E_CHANGE}:${PopupModel.PROP_IS_MODAL}`, (isModal) => {
			let {popup} = this.elements;

			return isModal ? popup.classList.add(CN_POPUP_MODAL) : popup.classList.remove(CN_POPUP_MODAL);
		});

		this._model.on(`${PopupModel.E_CHANGE}:${PopupModel.PROP_IS_CENTERED}`, (isCentered) => {
			let {popup} = this.elements;

			return isCentered ? popup.classList.add(CN_POPUP_CENTERED) : popup.classList.remove(CN_POPUP_CENTERED);
		});
	}
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

function createPopupElements(config) {
	let popup = document.createElement('section');

	popup.innerHTML = `
		<div class="${CN_POPUP_WINDOW}">
			<header ${A_POPUP_DRAG_TRIGGER} class="popup--header">
				<h6 class="${CN_POPUP_TITLE}">${config.title}</h6>
				<span ${A_POPUP_CLOSE} class="popup--close">×</span>
			</header>
			<div class="${CN_POPUP_CONTENT}">
			</div>
			<footer class="popup--footer">
				<div class="${CN_POPUP_BUTTONS}">

				</div>
			</footer>
		</div>`;

	let popupContent = popup.querySelector(`.${CN_POPUP_CONTENT}`);

	popupContent.innerHTML = config.content;

	if (config.buttons) {
		let popupButtons = popup.querySelector(`.${CN_POPUP_BUTTONS}`);

		config.buttons.map(createBtnFromConfig)
			.forEach(btn => popupButtons.appendChild(btn));
	}
	document.body.appendChild(popup);
	return getPopupElements(popup);
}

function createBtnFromConfig(cfg) {
	let btn = document.createElement('button');
	btn.classList.add(CN_BUTTON);

	btn.innerHTML = `<span>${cfg.text}</span>`;

	cfg.modifiers
		.map(modifier => `${CN_BUTTON}-${modifier}`)
		.forEach(modifier => btn.classList.add(modifier));

	if (cfg.isCloser) {
		btn.setAttribute(A_POPUP_CLOSE, true);
	}

	return btn;
}

export default window.PopupView = PopupView