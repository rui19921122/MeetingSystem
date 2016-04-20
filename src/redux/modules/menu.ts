/**
 * Created by hanrui on 2016/1/29.
 */
import {createAction, handleActions} from 'redux-actions'
import {History} from 'react-router';
import _fetch from '../../method/fetch'
export const UPDATE_MENU = 'UPDATE_MENU';

export let updateMenu = createAction(UPDATE_MENU, (i)=>i);

export function getMenu():ReduxThunk.ThunkInterface {
  return (dispatch, getState) => {
    let state = getState();
    if (state.menu.get) {
      return
    }
    else {
      return _fetch('/api/menu/get-menu').then(response=> {
          return response.json()
        }
        )
        .then(json=>dispatch(updateMenu(json)))
    }
  }
}

export default handleActions({
  UPDATE_MENU: (state,
                action) => ({
    items: action.payload,
    get: true
  })
}, {get: false, items: []})
