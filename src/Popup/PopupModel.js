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
let popupList = [];
let isZIndexManagementEnabled = true;

class PopupModel extends State {
	constructor(initialState) {
		let state = Object.assign({}, DEFAULT_POPUP_STATE, initialState);

		super();

		popupList.push(this);
		this.set(state);
	}

	static hideAll() {
		popupList.forEach((popup) => {
			popup.hide();
		});
	}

	static disableZIndexManagement() {
		isZIndexManagementEnabled = false;
	}

	static enableZIndexManagement() {
		isZIndexManagementEnabled = true;
	}

	show() {
		if (isZIndexManagementEnabled) {
			this.set('orderPosition', popupManager.push(this));
		}

		this.set({
			isVisible: true
		});
	}

	hide() {
		if (isZIndexManagementEnabled) {
			popupManager.remove(this);
		}

		this.set({
			isVisible: false
		});
	}

	toFront() {
		if (isZIndexManagementEnabled) {
			popupManager.toFront(this);
		}
	}

	toBack() {
		if (isZIndexManagementEnabled) {
			popupManager.toBack(this);
		}
	}

	move(dx, dy) {
		let {posX, posY} = this.get('posX', 'posY');

		posX += dx;
		posY += dy;

		this.set({posX, posY});
	}
}

export default window.PopupModel = PopupModel;