/**
 * Created by hanrui on 2016/1/29.
 */
import {createAction, handleActions} from 'redux-actions'
export const UPDATE_MENU = 'UPDATE_MENU';
import {push} from 'react-router-redux'
interface menu {
  get?:boolean,
  items:any[]
}

export let updateMenu = createAction(UPDATE_MENU);

export function getMenu():ReduxThunk.ThunkInterface {
  return (dispatch, getState) => {
    let state = getState();
    if (state.menu.get) {
      return
    }
    else {
      return fetch('/api/menu/get-menu',{
        credentials:'include',
      }).then(response=> {
        switch (response.status) {
          case 200:
            response.json().then(json=>dispatch(updateMenu(json)));
            break;
          case 403:
            dispatch(push('/login'))
        }
      })
    }
  }
}

export default handleActions({
  UPDATE_MENU: (state,
                action) => {
    return {
      items: action.payload,
      get: true
    }
  }
}, {get: false, items: []})
