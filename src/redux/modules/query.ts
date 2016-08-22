/**
 * Created by Administrator on 2016/8/20.
 */

import {createAction, handleActions} from 'redux-actions';
import {Dispatch} from 'redux';
import {message} from 'antd';
export interface  CallOverListDetail {
  host_person: string,
  department: string,
  begin_time: any,
  end_time: any,
  date: Date,
  note: string,
  attend_table: any,
  class_number: number,
  day_number: number
}
export interface QueryDataListInterface extends JSON {
  call_over_list: CallOverListDetail[],
  department_can_query: {id: number,name: string,is_superuser: boolean}[]
}
const UpdateListData = createAction("UpdateListData");
const UpdateDatePicker = createAction("UpdateDatePicker");
const parse_data = (value: Date, type: 'start'|'end') => {
  if (value) {
    return type + '=' + value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate() + '&'
  } else {
    return ''
  }
};

const GetQueryData = (): ReduxThunk.ThunkInterface => (
  (dispatch: Redux.Dispatch, state: ()=>any)=> {
    let _state: QueryInterface = state().query_list;
    if (_state.start && !_state.end) {
      message.error("当指定开始时间时，必须同时指定结束时间");
      return
    }
    if (_state.end && !_state.start) {
      message.error("当指定结束时间时，必须同时指定开始时间");
      return
    }
    if (_state.end < _state.start) {
      message.error("结束时间不能小于开始时间");
      return
    }
    const url = `/api/query/query-call-over/?${parse_data(_state.start, 'start')}${parse_data(_state.end, 'end')}department=${_state.current_department}`;
    fetch(url, {
      credentials: 'include',
      method: 'get',
    }).then(response=> {
      if (response.status == 200) {
        response.json().then((json)=> {
          dispatch(UpdateListData(json))
        })
      } else {
        response.json().then(json=>message.error(JSON.stringify(json)))
      }
    });
    return
  }
);
const ChangeCurrentDepartment = createAction("ChangeCurrentDepartment");

export const actions = {
  GetQueryData,
  ChangeCurrentDepartment,
  UpdateListData,
  UpdateDatePicker
};
export default handleActions({
  UpdateListData: (state, action)=> {
    let obj = Object.assign({}, state, {
      department_can_select: action.payload['department_can_query'],
      fetching: false,
      data: action.payload['call_over_list'],
    });
    if (state.current_department) {
      return obj
    } else {
      let current = action.payload['department_can_query'][0]['id'];
      return Object.assign({}, obj, {current_department: current})
    }
  },
  ChangeCurrentDepartment: (state, action)=> {
    return Object.assign({}, state, {current_department: action.payload})
  },
  UpdateDatePicker: (state, action)=> {
    if (action.payload.type == 'start') {
      return Object.assign({}, state, {start: action.payload.value})
    } else if (action.payload.type == 'end') {
      return Object.assign({}, state, {end: action.payload.value})
    }
  },

}, {
  fetching: false,
  department_can_select: [],
  current_department: undefined,
  data: undefined,
  start: new Date(),
  end: new Date()
})
export interface QueryInterface {
  fetching: boolean,
  department_can_select: {id: number, name: string}[],
  current_department: number,
  data: CallOverListDetail[],
  start: Date,
  end: Date,
}
