///<reference path="../../../typings/browser.d.ts"/>

/**
 *
 * Created by HanRui on 2016/4/15.
 */

import {createAction, handleActions} from "redux-actions";
import {message} from 'antd'
import {push} from 'react-router-redux'
import Dispatch = Redux.Dispatch;
let BeginGetData = createAction('BeginGetData');
let FinishGetData = createAction('FinishGetData');
let ChangeDatePicker = createAction('ChangeDatePicker');
let ChangeSelect = createAction('ChangeSelect');
let showModal = createAction('showModal');
let ChangeUrlValue = createAction('ChangeUrlValue');
let GetData = (date?: Date, classNumber?: number): ReduxThunk.ThunkInterface => (
  (dispatch: Redux.Dispatch, getState: () => any) => {
    let state = getState();
    let url = '/api/call_over/get-call-over-person/?';
    url = url + 'date=' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    url = url + '&day-number=' + classNumber;
    fetch(url,
      {credentials: 'include',}
    ).then(response => {
      switch (response.status) {
        case 200:
          response.json().then(json => dispatch(FinishGetData({ sucess: true, data: json })));
          break;
        case 403:
          dispatch(push('/login'));
          break;
        default:
          message.error(response.json().toString());
          FinishGetData({ sucess: false })
      }
    })
  }
);
let DeleteData = (id: number): ReduxThunk.ThunkInterface => (
  (dispatch: Redux.Dispatch, getState: () => any) => {
    let url = `/api/call_over/update-call-over-person/${id}`;
    fetch(url, { method: 'delete' }).then(response => {
      if (response.status != 202) {
        message.error("删除失败")
      } else {
        let state = getState();
        dispatch(GetData((state.manage_check as manage_check_store).selectDate, (state.manage_check as manage_check_store).selectClassName))
      }
    }
    )
  }
);
let ReplaceData = (id: number, replace: number): ReduxThunk.ThunkInterface => (
  (dispatch: Redux.Dispatch, getState: () => any) => {
      let url = `/api/call_over/update-call-over-person/${id}/`;
    fetch(url, {
      method: 'post',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ replace: replace })
    }).then(response => {
      if (response.status != 202) {
        message.error("替换失败")
      } else {
        let state = getState();
        dispatch(GetData((state.manage_check as manage_check_store).selectDate, (state.manage_check as manage_check_store).selectClassName));
        message.success("替换成功");
        dispatch(showModal(false))
      }
    }
      )
  }
);
let AddData = (id: number, position: number, worker: number): ReduxThunk.ThunkInterface => (
  (dispatch: Redux.Dispatch, getState: () => any) => {
    let url = `/api/call_over/add-call-over-person/${id}/`;
    fetch(url, {
      credentials: 'include',
      method: 'post',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ position: position, worker: worker })
    }).then(response => {
      if (response.status != 201) {
        message.error("增加失败")
      } else {
        let state = getState();
        dispatch(GetData((state.manage_check as manage_check_store).selectDate, (state.manage_check as manage_check_store).selectClassName));
        message.success("增加成功");
        dispatch(AddModalShow(false))
      }
    }
      )
  }
);
let update_scrapy_data = createAction('UPDATE_SCRAPY_DATA');
let change_scrapy_button_status = createAction('CHANGE_SCRAPY_BUTTON_STATUS');
let AddScrapyData = () =>(
  (dispatch, getState)=> {
    let state = getState();
    let manage_check:manage_check_store = state.manage_check;
    const url = (state.manage_check as manage_check_store).url_value;
    dispatch(change_scrapy_button_status(true));
    fetch('/api/scrapy/get-station-text/', {
      credentials: 'include',
      method: 'post',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        url: url,
        date: manage_check.selectDate,
        shift: manage_check.selectClassName,
        attend_table: manage_check.items.id
      })
    }).then(response=> {
      dispatch(change_scrapy_button_status(false));
      if (response.status != 200) {
        response.json().then(json=>message.error(json['error']))
      } else {
        response.json().then(json=>dispatch(update_scrapy_data(json['data'])));
      }
    })
  }
);
let ChangeReplaceId = createAction('ChangeReplaceId');
let AddModalShow = createAction('AddModalShow');
let change_password_modal = createAction('CHANGE_PASSWORD_MODAL');
export let actions = {
  BeginGetData,
  FinishGetData,
  GetData,
  ChangeDatePicker,
  ChangeSelect,
  DeleteData,
  ReplaceData,
  showModal,
  ChangeReplaceId,
  AddModalShow,
  AddData,
  ChangeUrlValue,
  AddScrapyData,
  change_scrapy_button_status,
  change_password_modal,
};
export default handleActions({
    CHANGE_SCRAPY_BUTTON_STATUS: (state, action)=> {
      return Object.assign({}, state, {url_button_disabled: action.payload})
    },
    CHANGE_PASSWORD_MODAL: (state, action)=> {
      return Object.assign({}, state, {change_password_modal: action.payload})
    },
  BeginGetData: (state, action) => {
    return Object.assign({}, state, { fetching: true })
  },
    ChangeUrlValue: (state, action) => {
      let disabled:boolean;
      disabled = action.payload.length <= 0;
      return Object.assign({}, state, {url_value: action.payload, url_button_disabled: disabled})
    },
  FinishGetData: (state, action) => {
    if (action.payload.sucess) {
      let list = [];
      for (let i of action.payload.data.attend.person) {
        list.push(i.id)
      }
      return Object.assign({}, state, {
        fetching: false, person_list: list, items: action.payload.data.attend,
        replace: action.payload.data.replace
      })
    } else {
      return Object.assign({}, state, { fetching: false })
    }
  },
  ChangeDatePicker: (state, action) => {
    return Object.assign({}, state, { selectDate: action.payload })
  },
  ChangeSelect: (state, action) => {
    return Object.assign({}, state, { selectClassName: action.payload })
  },
  showModal: (state, action) => {
    return Object.assign({}, state, { showModal: action.payload['visiable'], modalSelect: action.payload['id'] })
  },
  AddModalShow: (state, action) => {
    return Object.assign({}, state, { addModalShow: action.payload })
  },
  ChangeReplaceId: (state, action) => {
    return Object.assign({}, state, { replaceId: action.payload })
  },
},
  {
    selectDate: new Date(),
    selectClassName: 1,
    items: {
      scrapy: [],
    },
    fetching: false,
    showModal: false,
    modalSelect: undefined,
    replaceId: undefined,
    url_value: '',
    addModalShow: false,
    replace: [],
    url_button_disabled: true,
    change_password_modal: false
  })
export interface manage_check_store {
  selectDate: Date,
  selectClassName: number,
  showModal: boolean,
  modalSelect: string,
  replaceId: number,
  addModalShow: boolean,
  person_list: number[],
  replace: any[],
  url_value:string,
  change_password_modal: boolean,
  items: {
    id: number,
    date: any,
    day_number: string,
    lock: boolean,
    department: string,
    scrapy:{index:number,title:string,content:string}[],
    person: {
      id: number,
      worker: string,
      position: string,
      study: boolean,
      checked: void | Date
    }[]
  },
  fetching:boolean,
  url_button_disabled:boolean
}
