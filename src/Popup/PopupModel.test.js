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
		});
	});

	describe('#hide', () => {
		it('should hide popup', () => {
			let popup = new PopupModel({}, popupManager);

			popup.hide();

			expect(popup._state.isVisible).toBe(false);
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