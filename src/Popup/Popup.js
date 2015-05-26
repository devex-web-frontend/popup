import Storage from '../Storage/Storage';
import interact from 'interact';
import OrderManager from '../OrderManager/OrderManager';

const DEFAULT_POPUP_STATE = {
	isVisible: false,
	isDraggable: false,
	posX: 0,
	posY: 0,
	dragStep: 5
};


let orderManager = new OrderManager();
let popupList = [];

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

	show() {
		this.set('orderPosition', orderManager.push(this));

		this.set({
			isVisible: true
		});
	}

	hide() {
		orderManager.remove(this);

		this.set({
			isVisible: false
		});
	}

	toFront() {
		orderManager.toFront(this);
	}

	toBack() {
		orderManager.toBack(this);
	}

	move(dx, dy) {
		let {posX, posY} = this.get('posX', 'posY');

		posX += dx;
		posY += dy;

		this.set({posX, posY});
	}
}

export default Popup;