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
		this.model = {};
	}

	_notify(newProps, oldState) {
		let newState = this.getModelState();

		Object.keys(newProps).forEach(key => {
			let newValue = newProps[key];
			let oldValue = oldState[key];

			if (newValue !== oldValue) {
				this.emitSync(`${Storage.E_CHANGED}:${key}`, newValue, oldValue, newState);
			}
		});

		this.emitSync(Storage.E_CHANGED, newState);
	}

	set(...args) {
		let props = normalizeArgs(...args);
		let oldState = this.getModelState();

		Object.keys(props).forEach(key => {
			this.model[key] = props[key];
		});

		this._notify(props, oldState);
	}

	get(key) {
		return this.model[key];
	}

	remove(key) {
		delete this.model[key];
	}

	getModelState() {
		return Object.assign({}, this.model);
	}
}

Storage.E_CHANGED = 'Storage:changed';

export default Storage;