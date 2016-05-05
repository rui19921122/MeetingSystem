///<reference path="../../../typings/browser.d.ts"/>

/**
 *
 * Created by HanRui on 2016/4/15.
 */

import {createAction, handleActions} from "redux-actions";
import {message} from 'antd'
import {push} from 'react-router-redux'
let BeginGetData = createAction('BeginGetData');
let FinishGetData = createAction('FinishGetData');
let ChangeDatePicker = createAction('ChangeDatePicker')
let ChangeSelect = createAction('ChangeSelect')
let showModal = createAction('showModal')
let GetData = (date?: Date, classNumber?: number): ReduxThunk.ThunkInterface => (
    (dispatch: Redux.Dispatch, getState: () => any) => {
        let state = getState()
        let url = '/api/call_over/get-call-over-person/?';
        url = url + 'date=' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
        url = url + '&day-number=' + classNumber
        fetch(url).then(response => {
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
)
let DeleteData = (id: number): ReduxThunk.ThunkInterface => (
    (dispatch: Redux.Dispatch, getState: () => any) => {
        let url = `/api/call_over/update-call-over-person/${id}`
        fetch(url, { method: 'delete' }).then(response => {
            if (response.status != 202) {
                message.error("删除失败")
            } else {
                let state = getState()
                dispatch(GetData((state.manage_check as manage_check_store).selectDate, (state.manage_check as manage_check_store).selectClassName))
            }
        }
        )
    }
)
let ReplaceData = (id: number, replace: number): ReduxThunk.ThunkInterface => (
    (dispatch: Redux.Dispatch, getState: () => any) => {
        let url = `/api/call_over/update-call-over-person/${id}`
        fetch(url, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ replace: replace })
        }).then(response => {
            if (response.status != 202) {
                message.error("替换失败")
            } else {
                let state = getState()
                dispatch(GetData((state.manage_check as manage_check_store).selectDate, (state.manage_check as manage_check_store).selectClassName))
                message.success("替换成功")
                dispatch(showModal(false))
            }
        }
            )
    }
)
let AddData = (id: number, position: number, worker: number): ReduxThunk.ThunkInterface => (
    (dispatch: Redux.Dispatch, getState: () => any) => {
        let url = `/api/call_over/add-call-over-person/${id}`
        fetch(url, {
            method: 'post',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ position: position, worker: worker })
        }).then(response => {
            if (response.status != 201) {
                message.error("增加失败")
            } else {
                let state = getState()
                dispatch(GetData((state.manage_check as manage_check_store).selectDate, (state.manage_check as manage_check_store).selectClassName))
                message.success("增加成功")
                dispatch(AddModalShow(false))
            }
        }
            )
    }
)
let ChangeReplaceId = createAction('ChangeReplaceId')
let AddModalShow = createAction('AddModalShow')
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
    AddData
};
export default handleActions({
    BeginGetData: (state, action) => {
        return Object.assign({}, state, { fetching: true })
    },
    FinishGetData: (state, action) => {
        if (action.payload.sucess) {
            let list = [];
            for (let i of action.payload.data.person) {
                list.push(i.id)
            }
            return Object.assign({}, state, { fetching: false,person_list:list, items: action.payload.data })
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
        items: {},
        fetching: false,
        showModal: false,
        modalSelect: undefined,
        replaceId: undefined,
        addModalShow: false
    })
export interface manage_check_store {
    selectDate: Date,
    selectClassName: number,
    showModal: boolean,
    modalSelect: string,
    replaceId: number,
    addModalShow: boolean,
    person_list: number[],
    items: {
        id: number,
        date: any,
        day_number: string,
        lock: boolean,
        department: string,
        person: {
            id: number,
            worker: string,
            position: string,
            study: boolean,
            checked: void | Date
        }[]
    },
    fetching: boolean
}
