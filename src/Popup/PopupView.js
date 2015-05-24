import Model from './Popup';

let model = new Model();

window.qq = model;
window.tt = new Model();

console.log('model', model);
export default {
	say() {
		model.sayHi();
	}
};