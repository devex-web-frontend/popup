'use strict';

import PopupModel from './PopupModel';
import PopupView from './PopupView';
import PopupManager from './PopupManager';

let defaultPopupManager = new PopupManager();

export default {
	createPopup(element, options = {}, manager = defaultPopupManager) {
		let popupModel = new PopupModel(options, manager);
		let popupView = new PopupView(element, popupModel);

		return popupModel;
	},

	getDefaultPopupManager() {
		return defaultPopupManager;
	}
}