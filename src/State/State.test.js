'use strict';

import State from './State';

describe('State', () => {
	describe('#set', () => {
		it('should set property provided as key value pair', () => {
			let storage = new State();

			storage.set('test', 'some');

			expect(storage._state.test).toBe('some');
		});

		it('should set properties provided as hash', () => {
			let storage = new State();

			storage.set({
				test: 'one',
				one: 'test'
			});

			expect(storage._state.test).toBe('one');
			expect(storage._state.one).toBe('test');
		});

		it('should fire State.E_CHANGE', () => {
			let storage = new State();
			let spy = jasmine.createSpy('E_CHANGE  handler');

			storage.on(State.E_CHANGE, spy);
			storage.set('test', 'one');

			expect(spy).toHaveBeenCalled();
		});

		it('should fire State.E_CHANGE and pass changed parameters as 2 arguments after set and before set', () => {
			let storage = new State();
			let spy = jasmine.createSpy('E_CHANGE  handler');

			storage.on(State.E_CHANGE, spy);

			storage.set('test', 'one');
			storage.set('test', 'two');
			storage.set('oneMoreTest', 'test');

			expect(spy.calls.argsFor(0)).toEqual([{test: 'one'}, {test: undefined}]);
			expect(spy.calls.argsFor(1)).toEqual([{test: 'two'}, {test: 'one'}]);
			expect(spy.calls.argsFor(2)).toEqual([{oneMoreTest: 'test'}, {oneMoreTest: undefined}]);
		});

		it('should fire State.E_CHANGE:{key} for each updated property', () => {
			let storage = new State();
			let spyOnTestChange = jasmine.createSpy('test-change-handler');
			let spyOnOtherChange = jasmine.createSpy('other-change-handler');
			let testPropChanged = `${State.E_CHANGE}:test`;
			let otherPropChanged = `${State.E_CHANGE}:other`;

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

		it('should not fire State.E_CHANGE:{key} if property value did not change', () => {
			let storage = new State();
			let spy = jasmine.createSpy('E_CHANGE:test handler');

			storage.on(`${State.E_CHANGE}:test`, spy);

			storage.set('test', 'qwe');
			storage.set('test', 'qwe');

			expect(spy.calls.count()).toBe(1);

		});
	});

	describe('#get', () => {
		it('should return value by key', () => {
			let storage = new State();

			storage._state = {test: 'get'};

			expect(storage.get('test')).toBe('get');
		});

		it('should return hash if several keys provided', () => {
			let storage = new State();

			storage._state = {
				test: 'some',
				one: 'test'
			};

			expect(storage.get('test', 'one', 'notFound')).toEqual({
				test: 'some',
				one: 'test',
				notFound: undefined
			});
		});
	});
	describe('#remove', () => {
		it('should remove property from state', () => {
			let storage = new State();

			storage._state = {
				some: 'test'
			};
			storage.remove('some');

			expect(storage._state.some).not.toBeDefined();
			expect(storage._state).not.toEqual(jasmine.objectContaining({
				some: undefined
			}));
		});

		it('should remove all properties by provided keys', () => {
			let storage = new State();

			storage._state = {
				some: 'test',
				other: 'prop'
			};
			storage.remove('some', 'other');

			expect(storage._state.some).not.toBeDefined();
			expect(storage._state).not.toEqual(jasmine.objectContaining({
				some: undefined
			}));

			expect(storage._state.other).not.toBeDefined();
			expect(storage._state).not.toEqual(jasmine.objectContaining({
				other: undefined
			}));
		});

		it('should fire State.E_CHANGE event', () => {
			let storage = new State();
			let spy = jasmine.createSpy('E_CHANGE  handler');

			storage.on(State.E_CHANGE, spy);
			storage._state = {
				some: 'test'
			};
			storage.remove('some');

			expect(spy).toHaveBeenCalled();
		});

		it('should fire State.E_CHANGE:{key} for each removed property', () => {
			let storage = new State();
			let spyOnTestChange = jasmine.createSpy('test-change-handler');
			let spyOnOtherChange = jasmine.createSpy('other-change-handler');
			let testPropChanged = `${State.E_CHANGE}:test`;
			let otherPropChanged = `${State.E_CHANGE}:other`;

			storage.on(testPropChanged, spyOnTestChange);
			storage.on(otherPropChanged, spyOnOtherChange);
			storage._state = {
				test: 'some',
				other: 'test'
			};

			storage.remove('test', 'other');
			expect(spyOnTestChange).toHaveBeenCalled();
			expect(spyOnOtherChange).toHaveBeenCalled();
		});
	});

	describe('#getState', () => {
		it('should return copy of storage state', () => {
			let storage = new State();

			storage._state = {
				test: 'one'
			};

			expect(storage.getState()).toEqual(storage._state);
			expect(storage.getState()).not.toBe(storage._state);
		});
	});
});
