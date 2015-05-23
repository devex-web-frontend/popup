//import eventEmitter from 'eventEmitter';
//let EventEmitter = window.EventEmitter;

import Storage from './Storage';

class Popup extends Storage {
	constructor(...args) {
		super();
	}

	sayHi() {
		console.log('hi');
	}
}


export default Popup;