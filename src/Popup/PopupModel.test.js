'use strict';

import Popup from './PopupModel';


describe('PopupModel', () => {

	afterEach(() => {
		Popup.hideAll();
	});

	it('should be invisible by default', () => {
		let popup = new Popup();

		expect(popup._state.isVisible).toBe(false);
	});

	describe('#show', () => {
		it('should show popup', () => {
			let popup = new Popup();

			popup.show();

			expect(popup._state.isVisible).toBe(true);
		});

		it('should set orderPosition of popup element', () => {
			let firstPopup = new Popup();
			let secondPopup = new Popup();

			spyOn(firstPopup, 'set');
			spyOn(secondPopup, 'set');

			firstPopup.show();
			secondPopup.show();

			expect(firstPopup.set).toHaveBeenCalledWith('orderPosition', 0);
			expect(secondPopup.set).toHaveBeenCalledWith('orderPosition', 1);
		});
	});

	describe('#hide', () => {
		it('should hide popup', () => {
			let popup = new Popup();

			popup.hide();

			expect(popup._state.isVisible).toBe(false);
		});

		it('should update orderPosition of one of popups have been closed', () => {
			let firstPopup = new Popup();
			let secondPopup = new Popup();

			firstPopup.show();
			secondPopup.show();

			spyOn(secondPopup, 'set');
			firstPopup.hide();

			expect(secondPopup.set).toHaveBeenCalledWith('orderPosition', 0);
		});
	});

	describe('#move', () => {
		it('should change position according provided deltas', () => {
			let popup =  new Popup();

			popup._state.posX = 100;
			popup._state.posY = 105;

			popup.move(15, 5);

			expect(popup._state.posX).toBe(115);
			expect(popup._state.posY).toBe(110);
		});
	});

	describe('#hideAll', () => {
		it('should hide all popups', () => {
			let firstPopup = new Popup({isVisible: true});
			let secondPopup = new Popup({isVisible: true});

			Popup.hideAll();

			expect(firstPopup._state.isVisible).toBe(false);
			expect(secondPopup._state.isVisible).toBe(false);
		});
	});

	describe('#toFront', () => {
		it('should set orderPosition of popup element', () => {
			let firstPopup = new Popup();
			let secondPopup = new Popup();

			firstPopup.show();
			secondPopup.show();
			spyOn(firstPopup, 'set');
			spyOn(secondPopup, 'set');

			firstPopup.toFront();

			expect(firstPopup.set).toHaveBeenCalled();
			expect(firstPopup.set.calls.mostRecent().args).toEqual(['orderPosition', 1]);
		});
	});

	describe('#toBack', () => {
		it('should set orderPosition of popup element', () => {
			let firstPopup = new Popup();
			let secondPopup = new Popup();

			firstPopup.show();
			secondPopup.show();
			spyOn(firstPopup, 'set');
			spyOn(secondPopup, 'set');

			secondPopup.toBack();

			expect(secondPopup.set).toHaveBeenCalled();
			expect(secondPopup.set.calls.mostRecent().args).toEqual(['orderPosition', 0]);
		});
	});

	describe('if z-index management disabled', () => {
		beforeEach(() => {
			Popup.disableZIndexManagement();
		});
		afterEach(() => {
			Popup.enableZIndexManagement();
		});

		describe('#show', () => {
			it('should not set orderPosition of popup element', () => {
				let firstPopup = new Popup();
				let secondPopup = new Popup();

				spyOn(firstPopup, 'set');
				spyOn(secondPopup, 'set');

				firstPopup.show();
				secondPopup.show();

				expect(firstPopup.set).not.toHaveBeenCalledWith('orderPosition', 0);
				expect(secondPopup.set).not.toHaveBeenCalledWith('orderPosition', 1);
			});

			describe('#toBack', () => {
				it('should not set orderPosition of popup element', () => {
					let firstPopup = new Popup();
					let secondPopup = new Popup();

					firstPopup.show();
					secondPopup.show();
					spyOn(firstPopup, 'set');
					spyOn(secondPopup, 'set');

					secondPopup.toBack();

					expect(secondPopup.set).not.toHaveBeenCalled();
				});
			});

			describe('#hide', () => {
				it('should not update orderPosition of one of popups have been closed', () => {
					let firstPopup = new Popup();
					let secondPopup = new Popup();

					firstPopup.show();
					secondPopup.show();

					spyOn(secondPopup, 'set');
					firstPopup.hide();

					expect(secondPopup.set).not.toHaveBeenCalledWith('orderPosition', 0);
				});
			});

			describe('#toFront', () => {
				it('should set orderPosition of popup element', () => {
					let firstPopup = new Popup();
					let secondPopup = new Popup();

					firstPopup.show();
					secondPopup.show();
					spyOn(firstPopup, 'set');
					spyOn(secondPopup, 'set');

					firstPopup.toFront();

					expect(firstPopup.set).not.toHaveBeenCalled();
				});
			});
		});
	});
});