'use strict';

import Emitter from 'emitter';

class State extends Emitter {
	constructor() {
		super();
		this._state = {};
	}

	_notify(newProps, oldState) {
		let changedPropsBefore = {};
		let changedPropsAfter = {};

		Object.keys(newProps).forEach(key => {
			let newValue = newProps[key];
			let oldValue = oldState[key];

			if (newValue !== oldValue) {
				changedPropsBefore[key] = oldValue;
				changedPropsAfter[key] = newValue;

				this.emitSync(`${State.E_CHANGED}:${key}`, newValue, oldValue);
			}
		});

		this.emitSync(State.E_CHANGED, changedPropsAfter, changedPropsBefore);
	}

	set(key, value) {
		let props = (typeof key === 'object') ? key : {[key]: value};
		let oldState = this.getState();

		Object.keys(props).forEach(key => {
			this._state[key] = props[key];
		});

		this._notify(props, oldState);
	}

	get(...keys) {
		let result;

		if (keys.length === 1) {
			result = this._state[keys[0]];
		} else {
			result = keys.reduce((acc, key) => {
				acc[key] = this._state[key];
				return acc;
			}, {});
		}

		return result;
	}

	remove(...keys) {
		let oldState = this.getState();

		keys.forEach((key) => {
			delete this._state[key];
		});

		this._notify(keys.reduce((acc, key) => {
			acc[key] = undefined;
			return acc;
		}, {}), oldState);
	}

	getState() {
		return Object.assign({}, this._state);
	}
}

State.E_CHANGED = 'State:changed';

export default State;