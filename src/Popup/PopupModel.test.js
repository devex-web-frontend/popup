'use strict';

import PopupModel from './PopupModel';
import PopupManager from './PopupManager';

let popupManager = new PopupManager();

describe('PopupModel', () => {

	afterEach(() => {
		popupManager.hideAll();
	});

	it('should be invisible by default', () => {
		let popup = new PopupModel({}, popupManager);

		expect(popup._state.isVisible).toBe(false);
	});

	describe('#show', () => {
		it('should show popup', () => {
			let popup = new PopupModel({}, popupManager);

			popup.show();

			expect(popup._state.isVisible).toBe(true);
			expect(popup._state.posX).toBe('');
			expect(popup._state.posY).toBe('');
		});
	});

	describe('#showAt', () => {
		it('should set popup to provided position and show', () => {
			let popup = new PopupModel({}, popupManager);

			popup.showAt(777, 432);

			expect(popup._state.isVisible).toBe(true);
			expect(popup._state.posX).toBe(777);
			expect(popup._state.posY).toBe(432);
		});
	});

	describe('#showModal', () => {
		it('should show modal popup', () => {
			let popup = new PopupModel({}, popupManager);

			popup.showModal();

			expect(popup._state.isVisible).toBe(true);
			expect(popup._state.isModal).toBe(true);
		});
	});

	describe('#hide', () => {
		it('should hide popup', () => {
			let popup = new PopupModel({}, popupManager);

			popup.show();
			popup.hide();

			expect(popup._state.isVisible).toBe(false);
		});

		it('should reset popup', () => {
			let popup = new PopupModel({}, popupManager);

			popup._state.isModal = true;
			popup._state.isCentered = true;
			popup._state.posX = 10;
			popup._state.posY = 15;

			popup.hide();

			expect(popup._state.isModal).toBe(false);
			expect(popup._state.isCentered).toBe(false);
		});
	});

	describe('#move', () => {
		it('should change position according provided deltas', () => {
			let popup =  new PopupModel({}, popupManager);

			popup._state.posX = 100;
			popup._state.posY = 105;

			popup.move(15, 5);

			expect(popup._state.posX).toBe(115);
			expect(popup._state.posY).toBe(110);
		});
	});

	describe('#moveTo', () => {
		it('should set popup position according provided arguments', () => {
			let popup = new PopupModel({}, popupManager);

			popup.moveTo(50, 60);

			expect(popup._state.posX).toBe(50);
			expect(popup._state.posY).toBe(60);
		});
	});

	describe('#toFront', () => {
		it('should move to front trough popupManager', () => {
			let firstPopup = new PopupModel({}, popupManager);
			let secondPopup = new PopupModel({}, popupManager);

			firstPopup.show();
			secondPopup.show();
			spyOn(popupManager, 'toFront');

			firstPopup.toFront();

			expect(popupManager.toFront.calls.mostRecent().args[0]).toBe(firstPopup);
		});
	});

	describe('#toBack', () => {
		it('should move to back trough popupManager', () => {
			let firstPopup = new PopupModel({}, popupManager);
			let secondPopup = new PopupModel({}, popupManager);

			firstPopup.show();
			secondPopup.show();

			spyOn(popupManager, 'toBack');

			secondPopup.toBack();

			expect(popupManager.toBack.calls.mostRecent().args[0]).toBe(secondPopup);
		});
	});
});