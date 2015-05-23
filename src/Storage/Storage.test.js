import Storage from './Storage';

describe('#set', () => {
	it('should fire Storage.E_CHANGED', () => {
		let storage = new Storage();
		let spy = jasmine.createSpy('E_CHANGED  handler');

		storage.on(Storage.E_CHANGED, spy);
		storage.set('test', 'one');

		expect(spy).toHaveBeenCalled();
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
});