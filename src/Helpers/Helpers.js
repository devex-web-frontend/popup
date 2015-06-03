export default {
	/**
	 * Compute element sizes if it is hidden
	 * @param {HTMLElement} element
	 * @param {HTMLElement} [hiddenParent]
	 */
	getBoundsOfHiddenElement(element, hiddenParent) {
		let hiddenElement = hiddenParent || element;

		hiddenElement.style.visibility = 'hidden';
		hiddenElement.style.display = 'block';
		hiddenElement.style.position = 'absolute';

		let [width, height] = this.getBounds(element);

		hiddenElement.style.visibility = '';
		hiddenElement.style.display = '';
		hiddenElement.style.position = '';

		return [width, height];
	},

	/**
	 * Compute sizes of visible elements
	 * @param {HTMLElement} element
	 */
	getBounds(element) {
		let {width, height} = element.getBoundingClientRect();

		return [width, height];
	}
};