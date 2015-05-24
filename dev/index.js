import view from '../src/Popup/PopupView';
import  Popup from '../src/Popup/Popup';

let popup = new Popup();


view.say();
console.log('loaded!!!');
console.log(popup.getState());
window.VV = view;