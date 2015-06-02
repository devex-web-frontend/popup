'use strict';
import PopupModel from '../Popup/PopupModel';

class PopupManager {

	constructor() {
		this._stack = [];
		this._list = [];
		this.isZIndexManagementEnabled = true;
	}

	register(item) {
		this._list.push(item);

		item.on(`${PopupModel.E_CHANGE}:isVisible`, (isVisible) => {
			if (this.isZIndexManagementEnabled) {
				if (isVisible) {
					this._pushToStack(item);
				} else {
					this._removeFromStack(item);
				}
				this._notifyAll();
			}
		});
	}

	deregister(item) {
		removeItemFromArray(item, this._list);
	}

	getPosition(item) {
		return this._stack.indexOf(item);
	}

	toFront(item) {
		this._removeFromStack(item);
		this._pushToStack(item);
		this._notifyAll();
	}

	toBack(item) {
		this._removeFromStack(item);
		this._stack.unshift(item);
		this._notifyAll();
	}

	hideAll() {

	}

	_pushToStack(item) {
		this._stack.push(item);
		return this.getPosition(item);
	}

	_removeFromStack(item) {
		removeItemFromArray(item, this._stack);
	}

	_notifyAll() {
		this._stack.forEach((item) => {
			item.set(PopupManager.PROP_ORDER_POSITION, this.getPosition(item));
		});
	}
}

function removeItemFromArray(item, array) {
	let index = array.indexOf(item);

	array.splice(index, 1);
}

PopupManager.PROP_ORDER_POSITION = 'orderPosition';

export default PopupManager;