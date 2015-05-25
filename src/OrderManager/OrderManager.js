const ORDER_POSITION_PROP = 'orderPosition';

class OrderManager {

	constructor() {
		this._stack = [];
	}

	getPosition(item) {
		return this._stack.indexOf(item);
	}

	toFront(item) {
		this._remove(item);
		this.push(item);
		this._notifyAll();
	}

	toBack(item) {
		this._remove(item);
		this._stack.unshift(item);
		this._notifyAll();
	}

	push(item) {
		this._stack.push(item);
		return this.getPosition(item);
	}

	remove(item) {
		this._remove(item);
		this._notifyAll();
	}

	_remove(item) {
		let index = this.getPosition(item);

		this._stack.splice(index, 1);
	}

	_notifyAll() {
		this._stack.forEach((item) => {
			item.set(ORDER_POSITION_PROP, this.getPosition(item));
		});
	}
}

export default OrderManager;