"use strict";
/* @flow */
// ------------------------------------
// Constants
// ------------------------------------
exports.COUNTER_INCREMENT = 'COUNTER_INCREMENT';
// ------------------------------------
// Actions
// ------------------------------------
// NOTE: "Action" is a Flow interface defined in https://github.com/TechnologyAdvice/flow-interfaces
// If you're unfamiliar with Flow, you are completely welcome to avoid annotating your code, but
// if you'd like to learn more you can check out: flowtype.org.
// DOUBLE NOTE: there is currently a bug with babel-eslint where a `space-infix-ops` error is
// incorrectly thrown when using arrow functions, hence the oddity.
function increment(value = 1) {
    return {
        type: exports.COUNTER_INCREMENT,
        payload: value
    };
}
exports.increment = increment;
// This is a thunk, meaning it is a function that immediately
// returns a function for lazy evaluation. It is incredibly useful for
// creating async actions, especially when combined with redux-thunk!
// NOTE: This is solely for demonstration purposes. In a real application,
// you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
// reducer take care of this logic.
exports.doubleAsync = () => {
    return (dispatch, getState) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                dispatch(increment(getState().counter));
                resolve();
            }, 200);
        });
    };
};
exports.actions = {
    increment: increment,
    doubleAsync: exports.doubleAsync
};
// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
    [exports.COUNTER_INCREMENT]: (state, action) => state + action.payload
};
// ------------------------------------
// Reducer
// ------------------------------------
const initialState = 0;
function counterReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : state;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = counterReducer;
//# sourceMappingURL=counter.js.map