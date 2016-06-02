"use strict";
/**
 * Created by hanrui on 2016/1/29.
 */
const redux_actions_1 = require('redux-actions');
exports.UPDATE_MENU = 'UPDATE_MENU';
const react_router_redux_1 = require('react-router-redux');
exports.updateMenu = redux_actions_1.createAction(exports.UPDATE_MENU);
function getMenu() {
    return (dispatch, getState) => {
        let state = getState();
        if (state.menu.get) {
            return;
        }
        else {
            return fetch('/api/menu/get-menu', {
                credentials: 'include',
            }).then(response => {
                switch (response.status) {
                    case 200:
                        response.json().then(json => dispatch(exports.updateMenu(json)));
                        break;
                    case 403:
                        dispatch(react_router_redux_1.push('/login'));
                }
            });
        }
    };
}
exports.getMenu = getMenu;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = redux_actions_1.handleActions({
    UPDATE_MENU: (state, action) => {
        return {
            items: action.payload,
            get: true
        };
    }
}, { get: false, items: [] });
//# sourceMappingURL=menu.js.map