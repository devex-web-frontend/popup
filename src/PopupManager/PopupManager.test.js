'use strict';

import PopupManager from './PopupManager';
import PopupModel from '../Popup/PopupModel';
import Emitter from 'emitter';


function createItem(name) {
	let emitterInstance = new Emitter();

	emitterInstance.set = jasmine.createSpy(`set ${name}`);
	emitterInstance.hide = jasmine.createSpy(`hide ${name}`);

	return emitterInstance;
}

describe('PopupManager', () => {
	describe('#register', () => {
		it('should add popup instance to list of managed popups', () => {
			let manager = new PopupManager();

			let one = createItem('one');
			let two = createItem('two');

			manager.register(one);
			manager.register(two);

			expect(manager._list[0]).toBe(one);
			expect(manager._list[1]).toBe(two);
		});

		describe('after registration', () => {

			describe('when popup became visible', () => {
				it('should push popup to stack', () => {
					let manager = new PopupManager();
					let one = createItem('one');

					manager.register(one);

					one.emitSync(`${PopupModel.E_CHANGE}:isVisible`, true);

					expect(manager._stack[0]).toBe(one);
				});
			});

			describe('when popup became invisible', () => {
				it('should remove popup from stack', () => {
					let manager = new PopupManager();

					let one = createItem('one');
					let two = createItem('two');
					manager.register(one);
					manager.register(two);
					one.emitSync(`${PopupModel.E_CHANGE}:isVisible`, true);
					two.emitSync(`${PopupModel.E_CHANGE}:isVisible`, true);
					one.emitSync(`${PopupModel.E_CHANGE}:isVisible`, false);

					expect(manager.getPosition(two)).toBe(0);
				});

				it('should set new orderPosition to each item in stack', function() {
					let manager = new PopupManager();

					let one = createItem('one');
					let two = createItem('two');
					manager.register(one);
					manager.register(two);

					one.emitSync(`${PopupModel.E_CHANGE}:isVisible`, true);
					two.emitSync(`${PopupModel.E_CHANGE}:isVisible`, true);
					one.emitSync(`${PopupModel.E_CHANGE}:isVisible`, false);


					expect(two.set).toHaveBeenCalled();
				});
			});
		});
	});

	describe('#toFront', () => {
		it('should move item to front of the stack', () => {
			let manager = new PopupManager();

			let one = createItem('one');
			let two = createItem('two');
			let oneMore = createItem('oneMore');
			manager.register(one);
			manager.register(two);
			manager.register(oneMore);
			one.emitSync(`${PopupModel.E_CHANGE}:isVisible`, true);
			two.emitSync(`${PopupModel.E_CHANGE}:isVisible`, true);
			oneMore.emitSync(`${PopupModel.E_CHANGE}:isVisible`, true);

			manager.toFront(two);

			expect(manager.getPosition(two)).toBe(2);
		});

		it('should set new orderPosition to each item', function() {
			let manager = new PopupManager();

			let one = createItem('one');
			let two = createItem('two');
			let oneMore = createItem('oneMore');
			manager.register(one);
			manager.register(two);
			manager.register(oneMore);
			one.emitSync(`${PopupModel.E_CHANGE}:isVisible`, true);
			two.emitSync(`${PopupModel.E_CHANGE}:isVisible`, true);
			oneMore.emitSync(`${PopupModel.E_CHANGE}:isVisible`, true);

			manager.toFront(two);

			expect(one.set).toHaveBeenCalled();
			expect(two.set).toHaveBeenCalled();
			expect(oneMore.set).toHaveBeenCalled();
		});
	});

	describe('#toBack', () => {
		it('should move item to front of the stack', () => {
			let manager = new PopupManager();

			let one = createItem('one');
			let two = createItem('two');
			let oneMore = createItem('oneMore');
			manager.register(one);
			manager.register(two);
			manager.register(oneMore);
			one.emitSync(`${PopupModel.E_CHANGE}:isVisible`, true);
			two.emitSync(`${PopupModel.E_CHANGE}:isVisible`, true);
			oneMore.emitSync(`${PopupModel.E_CHANGE}:isVisible`, true);

			manager.toBack(two);

			expect(manager.getPosition(two)).toBe(0);
			expect(manager.getPosition(oneMore)).toBe(2);
		});

		it('should set new orderPosition to each item', function() {
			let manager = new PopupManager();

			let one = createItem('one');
			let two = createItem('two');
			let oneMore = createItem('oneMore');
			manager.register(one);
			manager.register(two);
			manager.register(oneMore);
			one.emitSync(`${PopupModel.E_CHANGE}:isVisible`, true);
			two.emitSync(`${PopupModel.E_CHANGE}:isVisible`, true);
			oneMore.emitSync(`${PopupModel.E_CHANGE}:isVisible`, true);

			manager.toBack(two);

			expect(one.set).toHaveBeenCalled();
			expect(two.set).toHaveBeenCalled();
			expect(oneMore.set).toHaveBeenCalled();
		});
	});

	describe('#getPosition()', () => {
		it('should return orderPosition', () => {
			let manager = new PopupManager();

			let one = createItem('one');
			let two = createItem('two');
			let oneMore = createItem('oneMore');
			manager.register(one);
			manager.register(two);
			manager.register(oneMore);
			one.emitSync(`${PopupModel.E_CHANGE}:isVisible`, true);
			two.emitSync(`${PopupModel.E_CHANGE}:isVisible`, true);
			oneMore.emitSync(`${PopupModel.E_CHANGE}:isVisible`, true);

			expect(manager.getPosition(one)).toBe(0);
			expect(manager.getPosition(two)).toBe(1);
			expect(manager.getPosition(oneMore)).toBe(2);
		});
	});
	describe('#hideAll', () => {
		it('should hide all popups', () => {
			let manager = new PopupManager();

			let one = createItem('one');
			let two = createItem('two');
			let oneMore = createItem('oneMore');
			manager.register(one);
			manager.register(two);
			manager.register(oneMore);
			one.emitSync(`${PopupModel.E_CHANGE}:isVisible`, true);
			two.emitSync(`${PopupModel.E_CHANGE}:isVisible`, true);
			oneMore.emitSync(`${PopupModel.E_CHANGE}:isVisible`, true);

			manager.hideAll();

			expect(one.hide).toHaveBeenCalled();
			expect(two.hide).toHaveBeenCalled();
			expect(oneMore.hide).toHaveBeenCalled();
		});
	});

	describe('#disableZIndexManagement', () => {
		it('should disable z-index management', () => {
			let manager = new PopupManager();

			manager.disableZIndexManagement();

			expect(manager.isZIndexManagementEnabled).toBe(false);
		});
	});

	describe('#enableZIndexManagement', () => {
		it('should enable z-index management', () => {
			let manager = new PopupManager();

			manager.disableZIndexManagement();
			manager.enableZIndexManagement();

			expect(manager.isZIndexManagementEnabled).toBe(true);
		});
	});

	describe('if z-index management disabled', () => {
		let manager;

		beforeEach(() => {
			manager = new PopupManager();
			manager.disableZIndexManagement();
		});

		describe('after registration', () => {
			describe('when popup became visible', () => {
				it('should not push popup to stack', () => {
					let one = createItem('one');

					manager.register(one);

					one.emitSync(`${PopupModel.E_CHANGE}:isVisible`, true);

					expect(manager._stack[0]).toBe(undefined);
				});
			});
		});
	});
});