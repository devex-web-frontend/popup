import Storage from './Storage';

describe('#set', () => {
	it('should fire Storage.E_CHANGED', () => {
		let storage = new Storage();
		let spy = jasmine.createSpy('E_CHANGED  handler');

		storage.on(Storage.E_CHANGED, spy);
		storage.set('test', 'one');

		expect(spy).toHaveBeenCalled();
	});

	it('should not fire Storage.E_CHANGED if property didn\'t change', () => {
		let storage = new Storage();
		let spy = jasmine.createSpy('E_CHANGED  handler');

		storage.on(Storage.E_CHANGED, spy);
		storage.set('test', 'one');
		storage.set('test', 'one');

		expect(spy.calls.count()).toBe(1);
	});

	it('should fire Storage.E_CHANGED and pass storage state as argument', () => {
		let storage = new Storage();
		let spy = jasmine.createSpy('E_CHANGED  handler');

		storage.on(Storage.E_CHANGED, spy);

		storage.set('test', 'one');
		storage.set('test', 'two');
		storage.set('oneMoreTest', 'test');

		expect(spy.calls.argsFor(0)).toEqual([{test: 'one'}]);
		expect(spy.calls.argsFor(1)).toEqual([{test: 'two'}]);
		expect(spy.calls.argsFor(2)).toEqual([{test: 'two', oneMoreTest: 'test'}]);
	});

	it('should fire Storage.E_CHANGED:{key} for each updated property', () => {
		let storage = new Storage();
		let spyOnTestChange = jasmine.createSpy('test-change-handler');
		let spyOnOtherChange = jasmine.createSpy('other-change-handler');
		let testPropChanged = `${Storage.E_CHANGED}:test`;
		let otherPropChanged = `${Storage.E_CHANGED}:other`;

		storage.on(testPropChanged, spyOnTestChange);
		storage.on(otherPropChanged, spyOnOtherChange);

		storage.set('test', 'qwe');
		storage.set({
			test: 'zxc',
			other: 'test'
		});

		expect(spyOnTestChange).toHaveBeenCalled();
		expect(spyOnTestChange.calls.count()).toBe(2);
		expect(spyOnOtherChange).toHaveBeenCalled();
	});

	it('should not fire Storage.E_CHANGED:{key} if property value did not change', () => {
		let storage = new Storage();
		let spy = jasmine.createSpy('E_CHANGED:test handler');

		storage.on(`${Storage.E_CHANGED}:test`, spy);

		storage.set('test', 'qwe');
		storage.set('test', 'qwe');

		expect(spy.calls.count()).toBe(1);

	});
});