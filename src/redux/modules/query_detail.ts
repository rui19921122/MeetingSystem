/**
 * Created by Administrator on 2016/8/20.
 */

import {createAction, handleActions} from 'redux-actions';
import {Dispatch} from 'redux';
import {message} from 'antd';
const FetchingStatus = createAction('FetchingStatus');
const UpdateData = createAction('UpdateData');
const ChangeFontSize = createAction('ChangeFontSize');
const GetInitialData = (id) =>(
  (dispatch: Redux.Dispatch, state: ()=>any)=> {
    const url = `/api/query/query-detail/${id}/`;
    dispatch((FetchingStatus(true)));
    fetch(url, {
      credentials: 'include',
    }).then(response=> {
      dispatch(FetchingStatus(false));
      if (response.status == 200) {
        response.json().then(json=> {
          dispatch(UpdateData(json))
        })
      } else {
        response.json().then(json=>message.error(JSON.stringify(json)))
      }
    })
  }
);
export const actions = {
  GetInitialData,
  FetchingStatus,
  ChangeFontSize
};

export default handleActions({
  FetchingStatus: (state, action)=> {
    return Object.assign({}, state, {'fetching': action.payload})
  },
  ChangeFontSize: (state, action)=> {
    return Object.assign({}, state, {'font_size': action.payload})
  },
  UpdateData: (state, action)=> {
    return Object.assign({}, state, {
      'audios': action.payload['audios'],
      'detail': action.payload['detail'],
      'photos': action.payload['photos'],
    })
  },
}, {
  fetching: false,
  photos: [],
  audios: undefined,
  detail: undefined,
  font_size: 2,
})

export interface  CallOverDetail {
  host_person: string,
  department: string,
  begin_time: any,
  end_time: any,
  date: Date,
  note: string,
  attend_table: {
    person: {id: number,study: boolean,checked: string|void,raw_string: void,worker: string, position: string}[],
    id: number,
    department: string,
    date: string,
    day_number: string,
    lock: boolean,
    scrapy: {id: number,title: string,content: string,number: number}[]
  },
  class_number: number,
  day_number: number,

}
export interface PhotoSerInterface {
  id: number,
  image: string,
  date: string,
  parent: number
}
export interface AudioSerInterface {
  audio: string,
  date: string
}
export interface QueryDetailInterface {
  photos: PhotoSerInterface[],
  audios: AudioSerInterface,
  detail: CallOverDetail,
  fetching: boolean,
  font_size: number
}
