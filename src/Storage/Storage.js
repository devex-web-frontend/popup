import Emitter from 'emitter';

function isObject(obj) {
	return obj === Object(obj);
}
function normalizeArgs(...args) {
	let result = {};

	if (args.length === 2) {
		result[args[0]] = args[1];
	}

	if (args.length === 1 && isObject(args[0])) {
		result = args[0];
	}

	return result;
}

class Storage extends Emitter {
	constructor() {
		super();
		this._state = {};
	}

	_notify(newProps, oldState) {
		let newState = this.getState();

		Object.keys(newProps).forEach(key => {
			let newValue = newProps[key];
			let oldValue = oldState[key];

			if (newValue !== oldValue) {
				this.emitSync(`${Storage.E_CHANGED}:${key}`, newValue, oldValue, newState);
			}
		});

		//TODO: don't fire this event if state hasn't changed (should be implemented after object-array-utlis moved to es6)
		this.emitSync(Storage.E_CHANGED, newState);
	}

	set(...args) {
		let props = normalizeArgs(...args);
		let oldState = this.getState();

		Object.keys(props).forEach(key => {
			this._state[key] = props[key];
		});

		this._notify(props, oldState);
	}

	get(...keys) {
		return (keys.length === 1) ?
			this._state[keys[0]]
			:
			keys.reduce((acc, key) => {
				acc[key] = this._state[key];
				return acc;
			}, {});
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

Storage.E_CHANGED = 'Storage:changed';

export default Storage;