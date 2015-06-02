'use strict';

import interact from 'interact';
import State from '../State/State';
import PopupManager from '../PopupManager/PopupManager';

const DEFAULT_POPUP_STATE = {
	isVisible: false,
	isDraggable: true,
	isModal: false,
	posX: 0,
	posY: 0,
	dragStep: 5
};


let popupManager = new PopupManager();

class PopupModel extends State {
	constructor(initialState) {
		let state = Object.assign({}, DEFAULT_POPUP_STATE, initialState);

		super();
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
		popupManager.toFront(this);
	}

	toBack() {
		popupManager.toBack(this);
	}

	move(dx, dy) {
		let {posX, posY} = this.get('posX', 'posY');

		posX += dx;
		posY += dy;

		this.set({posX, posY});
	}
}

export default window.PopupModel = PopupModel;
export {popupManager as popupManager};