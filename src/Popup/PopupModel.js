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
			[PopupModel.PROP_IS_VISIBLE]: true
		});
	}

	showAt(x, y) {
		this.moveTo(x, y);
		this.show();
	}

	showModal() {
		this.set({
			[PopupModel.PROP_IS_MODAL]: true,
			[PopupModel.PROP_POS_X]: '',
			[PopupModel.PROP_POS_Y]: ''
		});
		this.show();
	}

	hide() {
		this.set({
			[PopupModel.PROP_IS_VISIBLE]: false
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

		this.moveTo(posX + dx, posY + dy);
	}

	moveTo(x, y) {
		this.set({
			[PopupModel.PROP_POS_X]: x,
			[PopupModel.PROP_POS_Y]: y
		});
	}
}

PopupModel.PROP_POS_X = 'posX';
PopupModel.PROP_POS_Y = 'posY';
PopupModel.PROP_IS_MODAL = 'isModal';
PopupModel.PROP_IS_VISIBLE = 'isVisible';
PopupModel.PROP_IS_DRAGGABLE = 'isDraggable';

export default PopupModel;