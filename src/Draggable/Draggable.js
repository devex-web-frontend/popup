'use strict';

import interact from 'interact';

class Draggable {

	/**
	 * @param {HTMLElement} element
	 * @param {Object} options
	 */
	constructor(element, options = {}) {
		let {origin} = options;

		origin = origin || 'self';

		this._interactable = interact(element)
			.origin(origin)
			.draggable(options);
	}

	onMove(handler) {
		this._interactable.on(Draggable.E_DRAG_MOVE, handler);
	}

	disable() {
		this._interactable.draggable(false);
	}

	enable() {
		this._interactable.draggable(true);
	}
}

Draggable.E_DRAG_MOVE = 'dragmove';

export default Draggable;