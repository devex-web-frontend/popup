import Popup from './Popup';


describe('Popup', () => {
	let fakePopupElement;

	beforeEach(() => {
		fakePopupElement = {
			popup: document.createElement('div'),
			window: document.createElement('div'),
			dragTriggers: [document.createElement('div')],
			closers: [document.createElement('div'), document.createElement('div')]
		};
	});

	it('should be invisible by default', () => {
		let popup = new Popup({elements: fakePopupElement});

		expect(popup._state.isVisible).toBe(false);
	});

	describe('#show', () => {
		it('should show popup', () => {
			let popup = new Popup({elements: fakePopupElement});

			popup.show();

			expect(popup._state.isVisible).toBe(true);
		});
	});

	describe('#hide', () => {
		it('should hide popup', () => {
			let popup = new Popup({elements: fakePopupElement});

			popup.hide();

			expect(popup._state.isVisible).toBe(false);
		});
	});

	describe('#move', () => {
		it('should change position according provided deltas', () => {
			let popup =  new Popup({elements: fakePopupElement});

			popup._state.posX = 100;
			popup._state.posY = 105;

			popup.move(15, 5);

			expect(popup._state.posX).toBe(115);
			expect(popup._state.posY).toBe(110);
		});
	});
});