'use strict';

import PopupModel from './PopupModel';
import PopupView from './PopupView';
import PopupManager from './PopupManager';

export default window.PopupFactory = {
	create(element, options = {}) {
		let popupModel = new PopupModel(options);
		let popupView = new PopupView(element, popupModel);

		return popupModel;
	}
}