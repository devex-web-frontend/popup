import Storage from '../Storage/Storage';
import interact from 'interact';

const DEFAULT_POPUP_STATE = {
	isVisible: false,
	isDraggable: false,
	posX: 0,
	posY: 0,
	dragStep: 5
};

class Popup extends Storage {
	constructor(initialState) {
		let state = Object.assign({}, DEFAULT_POPUP_STATE, initialState);
		let {dragTriggers, closers} = state.elements;

		super();

		this.set(state);
		this._initDragTriggers(dragTriggers);
		this._initClosers(closers);
	}

	_initClosers(closers) {
		closers.forEach((closer) => {
			closer.addEventListener('click', () => {
				this.hide();
			});
		});
	}

	_initDragTriggers(triggers) {
		let {popup} = this.get('elements');
		let dragStep = this.get('dragStep');

		triggers.forEach((element) => {
			interact(element)
				.origin(popup)
				.draggable({
					restrict: {
						restriction: document.body,
						elementRect: {
							top: 0,
							right: 1,
							left: 0,
							bottom: 1
						}
					},
					snap: {
						targets: [interact.createSnapGrid({
							x: dragStep, y: dragStep
						})]
					},
					maxPerElement: Infinity

				})
				.on('dragmove', (e) => {
					this.move(e.dx, e.dy);
				});
		});
	}

	show() {
		this.set({
			isVisible: true
		});
	}

	hide() {
		this.set({
			isVisible: false
		});
	}

	move(dx, dy) {
		let {posX, posY} = this.get('posX', 'posY');

		posX += dx;
		posY += dy;

		this.set({posX, posY});
	}
}

export default Popup;