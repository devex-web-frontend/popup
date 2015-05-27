import interact from 'interact';
import Storage from '../Storage/Storage';
import OrderManager from '../OrderManager/OrderManager';

const DEFAULT_POPUP_STATE = {
	isVisible: false,
	isDraggable: true,
	isModal: false,
	posX: 0,
	posY: 0,
	dragStep: 5
};


let orderManager = new OrderManager();
let popupList = [];
let isZIndexManagementEnabled = true;

class Popup extends Storage {
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
			this.set('orderPosition', orderManager.push(this));
		}

		this.set({
			isVisible: true
		});
	}

	hide() {
		if (isZIndexManagementEnabled) {
			orderManager.remove(this);
		}

		this.set({
			isVisible: false
		});
	}

	toFront() {
		if (isZIndexManagementEnabled) {
			orderManager.toFront(this);
		}
	}

	toBack() {
		if (isZIndexManagementEnabled) {
			orderManager.toBack(this);
		}
	}

	move(dx, dy) {
		let {posX, posY} = this.get('posX', 'posY');

		posX += dx;
		posY += dy;

		this.set({posX, posY});
	}
}

export default window.Popup = Popup;