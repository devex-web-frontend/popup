import OrderManager from './OrderManager';


function createItem(name) {
	return jasmine.createSpyObj(name, ['set']);
}

describe('OrderManager', () => {
	describe('#push', () => {
		it('should push item to order stack and return id', () => {
			let manager = new OrderManager();

			let one = createItem('one');
			let two = createItem('two');
			let id0 = manager.push(one);
			let id1 = manager.push(two);

			expect(id0).toBe(0);
			expect(id1).toBe(1);
		});
	});

	describe('#remove', () => {
		it('should remove item from stack', () => {
			let manager = new OrderManager();

			let one = createItem('one');
			let two = createItem('two');
			manager.push(one);
			manager.push(two);
			manager.remove(one);

			expect(manager.getPosition(two)).toBe(0);
		});

		it('should set new orderPosition to each item', function() {
			let manager = new OrderManager();

			let one = createItem('one');
			let two = createItem('two');
			manager.push(one);
			manager.push(two);
			manager.remove(one);

			expect(two.set).toHaveBeenCalled();
		});
	});


	describe('#toFront', () => {
		it('should move item to front of the stack', () => {
			let manager = new OrderManager();

			let one = createItem('one');
			let two = createItem('two');
			let oneMore = createItem('oneMore');
			manager.push(one);
			manager.push(two);
			manager.push(oneMore);

			manager.toFront(two);

			expect(manager.getPosition(two)).toBe(2);
		});

		it('should set new orderPosition to each item', function() {
			let manager = new OrderManager();

			let one = createItem('one');
			let two = createItem('two');
			let oneMore = createItem('oneMore');
			manager.push(one);
			manager.push(two);
			manager.push(oneMore);

			manager.toFront(two);

			expect(one.set).toHaveBeenCalled();
			expect(two.set).toHaveBeenCalled();
			expect(oneMore.set).toHaveBeenCalled();
		});
	});

	describe('#toBack', () => {
		it('should move item to front of the stack', () => {
			let manager = new OrderManager();

			let one = createItem('one');
			let two = createItem('two');
			let oneMore = createItem('oneMore');
			manager.push(one);
			manager.push(two);
			manager.push(oneMore);

			manager.toBack(two);

			expect(manager.getPosition(two)).toBe(0);
			expect(manager.getPosition(oneMore)).toBe(2);
		});

		it('should set new orderPosition to each item', function() {
			let manager = new OrderManager();

			let one = createItem('one');
			let two = createItem('two');
			let oneMore = createItem('oneMore');
			manager.push(one);
			manager.push(two);
			manager.push(oneMore);

			manager.toBack(two);

			expect(one.set).toHaveBeenCalled();
			expect(two.set).toHaveBeenCalled();
			expect(oneMore.set).toHaveBeenCalled();
		});
	});

	describe('#getPosition()', () => {
		it('should return orderPosition', () => {
			let manager = new OrderManager();

			let one = createItem('one');
			let two = createItem('two');
			let oneMore = createItem('oneMore');
			manager.push(one);
			manager.push(two);
			manager.push(oneMore);

			expect(manager.getPosition(one)).toBe(0);
			expect(manager.getPosition(two)).toBe(1);
			expect(manager.getPosition(oneMore)).toBe(2);
		});
	});
});