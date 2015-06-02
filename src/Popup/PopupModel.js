'use strict';

import interact from 'interact';
import State from '../State/State';

const DEFAULT_POPUP_STATE = {
	isVisible: false,
	isDraggable: true,
	isModal: false,
	posX: 0,
	posY: 0,
	dragStep: 5
};

class PopupModel extends State {
	constructor(initialState, manager) {
		let state = Object.assign({}, DEFAULT_POPUP_STATE, initialState);

		super();

		manager.register(this);
		this._manager = manager;
		this.set(state);
	}

	show() {
		this.set({
			isVisible: true
		});
	}

	hide() {
		this.set({
			isVisible: false
		});
	}

	toFront() {
		this._manager.toFront(this);
	}

	toBack() {
		this._manager.toBack(this);
	}

	move(dx, dy) {
		let {posX, posY} = this.get('posX', 'posY');

		posX += dx;
		posY += dy;

		this.set({posX, posY});
	}
}

export default PopupModel;