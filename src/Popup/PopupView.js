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

function tplDefault(data) {
	return `
		<div class="${CN_POPUP_WINDOW}">
			<header ${A_POPUP_DRAG_TRIGGER} class="popup--header">
				<h6 class="${CN_POPUP_TITLE}">${data.title}</h6>
				<span ${A_POPUP_CLOSE} class="popup--close">×</span>
			</header>
			<div class="${CN_POPUP_CONTENT}">
			</div>
			<footer class="popup--footer">
				<div class="${CN_POPUP_BUTTONS}">

				</div>
			</footer>
		</div>`;
}

class PopupView{

	/**
	 * @param {HTMLElement|Object} element
	 * @param {Object} model
	 * @param {Function} [template]
	 */
	constructor(element, model, template) {
		template = template || tplDefault;

		this.elements = (element instanceof HTMLElement) ? getPopupElements(element) : createPopupElements(element, template);

		this._model = model;
		this._initModelListeners();
		this._initDraggables();
		this._initUIListeners();
	}

	_initDraggables() {
		let elements = this.elements;
		let draggableOptions = Object.assign({
			enabled: this._model.get('isDraggable')
		}, DRAGGABLE_OPTIONS, {origin: elements.popupElement});

		this._draggables = elements.dragTriggers.map((trigger) => {
			let draggable = new Draggable(trigger, draggableOptions);
			draggable.onMove((e) => {
				this._model.move(e.dx, e.dy);
			});

			return draggable;
		});
	}

	_initUIListeners() {
		let {popupElement} = this.elements;

		popupElement.addEventListener('mousedown', () => {
			this._model.toFront();
		});

		popupElement.addEventListener('click', (e) => {
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
		let {popupWindow} = this.elements;

		this._model.on(`${PopupModel.E_CHANGE}:${PopupModel.PROP_POS_X}`, (x) => {
			popupWindow.style.left = (x === '') ? x : x + 'px';
		});

		this._model.on(`${PopupModel.E_CHANGE}:${PopupModel.PROP_POS_Y}`, (y) => {
			popupWindow.style.top = (y === '') ? y : y + 'px';
		});

		this._model.on(`${PopupModel.E_CHANGE}:${PopupModel.PROP_IS_VISIBLE}`, (isVisible) => {
			let {popupElement} = this.elements;

			popupElement.classList.add(isVisible ? CN_POPUP_VISIBLE : CN_POPUP_HIDDEN);
			popupElement.classList.remove(!isVisible ? CN_POPUP_VISIBLE : CN_POPUP_HIDDEN);
		});

		this._model.on(`${PopupModel.E_CHANGE}:${PopupModel.PROP_IS_DRAGGING_ALLOWED}`, (isDraggingAllowed) => {
			return (isDraggingAllowed) ? this._enableDragging() : this._disableDragging();
		});

		this._model.on(`${PopupModel.E_CHANGE}:${PopupManager.PROP_ORDER_POSITION}`, (position) => {
			let {popupElement} = this.elements;

			popupElement.style.zIndex = Z_INDEX_OFFSET + position;
		});

		this._model.on(`${PopupModel.E_CHANGE}:${PopupModel.PROP_IS_MODAL}`, (isModal) => {
			let {popupElement} = this.elements;

			return isModal ? popupElement.classList.add(CN_POPUP_MODAL) : popupElement.classList.remove(CN_POPUP_MODAL);
		});

		this._model.on(`${PopupModel.E_CHANGE}:${PopupModel.PROP_IS_CENTERED}`, (isCentered) => {
			let {popupElement} = this.elements;

			return isCentered ? popupElement.classList.add(CN_POPUP_CENTERED) : popupElement.classList.remove(CN_POPUP_CENTERED);
		});
	}
}

function getPopupElements(popupElement) {
	let popupWindow = popupElement.querySelector(S_POPUP_WINDOW);
	let dragTriggers = Array.from(popupElement.querySelectorAll(`[${A_POPUP_DRAG_TRIGGER}]`));
	let closers = Array.from(popupElement.querySelectorAll(`[${A_POPUP_CLOSE}]`));

	return {
		popupElement,
		popupWindow,
		dragTriggers,
		closers
	};
}

function createPopupElements(config, template) {
	let popupElement = document.createElement('section');

	popupElement.innerHTML = template(config);

	let popupContent = popupElement.querySelector(`.${CN_POPUP_CONTENT}`);

	popupContent.innerHTML = config.content;

	if (config.buttons) {
		let popupButtons = popupElement.querySelector(`.${CN_POPUP_BUTTONS}`);

		config.buttons.map(createBtnFromConfig)
			.forEach(btn => popupButtons.appendChild(btn));
	}

	document.body.appendChild(popupElement);

	return getPopupElements(popupElement);
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