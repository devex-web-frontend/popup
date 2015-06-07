'use strict';
import PopupModel from './PopupModel';

class PopupManager {

	constructor() {
		this._stack = [];
		this._list = [];
		this._isZIndexManagementEnabled = true;
	}

	register(popup) {
		this._list.push(popup);

		popup.on(`${PopupModel.E_CHANGE}:${PopupModel.PROP_IS_VISIBLE}`, (isVisible) => {
			if (this._isZIndexManagementEnabled) {
				if (isVisible) {
					this._pushToStack(popup);
				} else {
					this._removeFromStack(popup);
				}
				this._notifyAll();
			}
		});
	}

	unregister(popup) {
		removeItemFromArray(popup, this._list);
	}

	disableZIndexManagement() {
		this._isZIndexManagementEnabled = false;
	}

	enableZIndexManagement() {
		this._isZIndexManagementEnabled = true;
	}

	getPosition(popup) {
		return this._stack.indexOf(popup);
	}

	toFront(popup) {
		if (this._isZIndexManagementEnabled) {
			this._removeFromStack(popup);
			this._pushToStack(popup);
			this._notifyAll();
		}
	}

	toBack(popup) {
		if (this._isZIndexManagementEnabled) {
			this._removeFromStack(popup);
			this._stack.unshift(popup);
			this._notifyAll();
		}
	}

	hideAll() {
		this._list.forEach((popup) => {
			popup.hide();
		});
	}

	_pushToStack(popup) {
		this._stack.push(popup);
		return this.getPosition(popup);
	}

	_removeFromStack(popup) {
		removeItemFromArray(popup, this._stack);
	}

	_notifyAll() {
		this._stack.forEach((popup) => {
			popup.set(PopupModel.PROP_ORDER_POSITION, this.getPosition(popup));
		});
	}
}

function removeItemFromArray(popup, array) {
	let index = array.indexOf(popup);

	array.splice(index, 1);
}

export default PopupManager;
export let defaultPopupManager = new PopupManager();