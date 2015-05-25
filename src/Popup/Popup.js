import Storage from '../Storage/Storage';
import interact from 'interact';

const DEFAULT_POPUP_STATE = {
	isVisible: false,
	isDraggable: false,
	posX: 0,
	posY: 0,
	dragStep: 5
};

class Popup extends Storage {
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

	move(dx, dy) {
		let {posX, posY} = this.get('posX', 'posY');

		posX += dx;
		posY += dy;

		this.set({posX, posY});
	}
}

export default Popup;