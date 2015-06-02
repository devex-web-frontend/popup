'use strict';

import PopupModel from './PopupModel';


describe('PopupModel', () => {

	afterEach(() => {
		PopupModel.hideAll();
	});

	it('should be invisible by default', () => {
		let popup = new PopupModel();

		expect(popup._state.isVisible).toBe(false);
	});

	describe('#show', () => {
		it('should show popup', () => {
			let popup = new PopupModel();

			popup.show();

			expect(popup._state.isVisible).toBe(true);
		});

		xit('should set orderPosition of popup element', () => {
			let firstPopup = new PopupModel();
			let secondPopup = new PopupModel();

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
			let popup = new PopupModel();

			popup.hide();

			expect(popup._state.isVisible).toBe(false);
		});

		xit('should update orderPosition of one of popups have been closed', () => {
			let firstPopup = new PopupModel();
			let secondPopup = new PopupModel();

			firstPopup.show();
			secondPopup.show();

			spyOn(secondPopup, 'set');
			firstPopup.hide();

			expect(secondPopup.set).toHaveBeenCalledWith('orderPosition', 0);
		});
	});

	describe('#move', () => {
		it('should change position according provided deltas', () => {
			let popup =  new PopupModel();

			popup._state.posX = 100;
			popup._state.posY = 105;

			popup.move(15, 5);

			expect(popup._state.posX).toBe(115);
			expect(popup._state.posY).toBe(110);
		});
	});

	describe('#hideAll', () => {
		it('should hide all popups', () => {
			let firstPopup = new PopupModel({isVisible: true});
			let secondPopup = new PopupModel({isVisible: true});

			PopupModel.hideAll();

			expect(firstPopup._state.isVisible).toBe(false);
			expect(secondPopup._state.isVisible).toBe(false);
		});
	});

	xdescribe('#toFront', () => {
		it('should set orderPosition of popup element', () => {
			let firstPopup = new PopupModel();
			let secondPopup = new PopupModel();

			firstPopup.show();
			secondPopup.show();
			spyOn(firstPopup, 'set');
			spyOn(secondPopup, 'set');

			firstPopup.toFront();

			expect(firstPopup.set).toHaveBeenCalled();
			expect(firstPopup.set.calls.mostRecent().args).toEqual(['orderPosition', 1]);
		});
	});

	xdescribe('#toBack', () => {
		it('should set orderPosition of popup element', () => {
			let firstPopup = new PopupModel();
			let secondPopup = new PopupModel();

			firstPopup.show();
			secondPopup.show();
			spyOn(firstPopup, 'set');
			spyOn(secondPopup, 'set');

			secondPopup.toBack();

			expect(secondPopup.set).toHaveBeenCalled();
			expect(secondPopup.set.calls.mostRecent().args).toEqual(['orderPosition', 0]);
		});
	});

	xdescribe('if z-index management disabled', () => {
		beforeEach(() => {
			PopupModel.disableZIndexManagement();
		});
		afterEach(() => {
			PopupModel.enableZIndexManagement();
		});

		describe('#show', () => {
			it('should not set orderPosition of popup element', () => {
				let firstPopup = new PopupModel();
				let secondPopup = new PopupModel();

				spyOn(firstPopup, 'set');
				spyOn(secondPopup, 'set');

				firstPopup.show();
				secondPopup.show();

				expect(firstPopup.set).not.toHaveBeenCalledWith('orderPosition', 0);
				expect(secondPopup.set).not.toHaveBeenCalledWith('orderPosition', 1);
			});

			describe('#toBack', () => {
				it('should not set orderPosition of popup element', () => {
					let firstPopup = new PopupModel();
					let secondPopup = new PopupModel();

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
					let firstPopup = new PopupModel();
					let secondPopup = new PopupModel();

					firstPopup.show();
					secondPopup.show();

					spyOn(secondPopup, 'set');
					firstPopup.hide();

					expect(secondPopup.set).not.toHaveBeenCalledWith('orderPosition', 0);
				});
			});

			describe('#toFront', () => {
				it('should set orderPosition of popup element', () => {
					let firstPopup = new PopupModel();
					let secondPopup = new PopupModel();

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