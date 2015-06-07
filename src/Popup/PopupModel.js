'use strict';

import interact from 'interact';
import State from '../State/State';
import {defaultPopupManager} from './PopupManager';

const DEFAULT_POPUP_STATE = {
	isVisible: false,
	isDraggable: true,
	isCentered: false,
	isDraggingAllowed: true,
	isModal: false,
	posX: 0,
	posY: 0,
	dragStep: 5
};

class PopupModel extends State {
	constructor(initialState, manager = defaultPopupManager) {
		let state = Object.assign({}, DEFAULT_POPUP_STATE, initialState);

		super();

		manager.register(this);
		this._manager = manager;
		this.on(`${PopupModel.E_CHANGE}:${PopupModel.PROP_IS_DRAGGABLE}`, this._toggleDraggingAllowed);
		this.on(`${PopupModel.E_CHANGE}:${PopupModel.PROP_IS_MODAL}`, this._toggleDraggingAllowed);
		this.set(state);
	}

	show() {
		this.set({
			[PopupModel.PROP_IS_VISIBLE]: true
		});
	}

	showAt(x, y) {
		this.moveTo(x, y);
		this.show();
	}

	showModal() {
		this.set({
			[PopupModel.PROP_IS_MODAL]: true
		});
		this.show();
	}

	showCentered() {
		this.set({
			[PopupModel.PROP_IS_CENTERED]: true
		});

		this.show();
	}

	hide() {
		this.set({
			[PopupModel.PROP_IS_VISIBLE]: false,
			[PopupModel.PROP_IS_CENTERED]: false,
			[PopupModel.PROP_IS_MODAL]: false,
			[PopupModel.PROP_POS_X]: '',
			[PopupModel.PROP_POS_Y]: ''
		});
	}

	toFront() {
		this._manager.toFront(this);
	}

	toBack() {
		this._manager.toBack(this);
	}

	move(dx, dy) {
		let {posX, posY} = this.get(PopupModel.PROP_POS_X, PopupModel.PROP_POS_Y);

		[posX, posY] = [posX, posY].map((num) => {
			num = parseInt(num);

			return isNaN(num) ? 0 : num;
		});

		this.moveTo(posX + dx, posY + dy);
	}

	moveTo(x, y) {
		this.set({
			[PopupModel.PROP_POS_X]: x,
			[PopupModel.PROP_POS_Y]: y
		});
	}

	_toggleDraggingAllowed() {
		let {isDraggable, isModal} = this.get(PopupModel.PROP_IS_MODAL, PopupModel.PROP_IS_DRAGGABLE);

		this.set({
			[PopupModel.PROP_IS_DRAGGING_ALLOWED]: isDraggable && !isModal
		});
	}
}

PopupModel.PROP_POS_X = 'posX';
PopupModel.PROP_POS_Y = 'posY';
PopupModel.PROP_IS_MODAL = 'isModal';
PopupModel.PROP_IS_VISIBLE = 'isVisible';
PopupModel.PROP_IS_DRAGGABLE = 'isDraggable';
PopupModel.PROP_IS_CENTERED = 'isCentered';
PopupModel.PROP_IS_DRAGGING_ALLOWED = 'isDraggingAllowed';
PopupModel.PROP_ORDER_POSITION = 'orderPosition';

export default PopupModel;