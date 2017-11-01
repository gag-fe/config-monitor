export const START = 'START';
export const END = 'END';
export const GET_LOG_LIST = 'GET_LOG_LIST';
export const OLG_RESET_SEARCH_PARAMS = 'OLG_RESET_SEARCH_PARAMS';
import Utils from '../utils/index';
import Moment from 'moment';
const format = 'YYYY-MM-DD';
const Ajax = Utils.ajax;
const CommonUtils = Utils.common;
const API = {
  typeList: APP_CONFIG.api.URLFIX_DATA +'/monitor/typeList.json',
  ruleList: APP_CONFIG.api.URLFIX_DATA +'/monitor/ruleList.json',
  recordList: APP_CONFIG.api.URLFIX_DATA +'/monitor/recordList.json',
  typeMap: APP_CONFIG.api.URLFIX_DATA +'/monitor/typeMap.json',
  delRuleId:  APP_CONFIG.api.URLFIX_DATA +'/monitor/deleteRule.json',
  updataRule:  APP_CONFIG.api.URLFIX_DATA +'/monitor/updateRule.json',
  getRule:  APP_CONFIG.api.URLFIX_DATA +'/monitor/getRule.json'
};

function fetchStart(state) {
  return {
    type: START,
    ...state
  }
}

function fetchEnd(state) {
  return {
    type: END,
    ...state
  }
}

function fetchGetLogList(state) {
  return {
    type: GET_LOG_LIST,
    ...state
  }
}

//获取报警记录
export function getLogList () {
  return (dispatch, getState) => {
    let state = getState().log;
    let seachParams = state.seachParams;

    let date = {
      startDate: seachParams.startDate ? Moment(seachParams.startDate).format(format) : '',
      endDate: seachParams.endDate ? Moment(seachParams.endDate).format(format) : ''
    };

    let postData = Object.assign({}, seachParams, date);

    dispatch(function(){
      Ajax({
        url: API.recordList,
        data: postData,
        type: 'json',
        method: 'post'
      }).then(resp => {
        if (resp.status == 'S') {
          let newSeachParams = Object.assign({}, state.seachParams, {pageSize:resp.data.pageSize, pageIndex:resp.data.pageIndex, total:resp.data.total, pageCount:resp.data.pageCount});
          let setState = Object.assign({}, state, {'recordList':resp.data.rows, 'seachParams': newSeachParams, 'type': GET_LOG_LIST});
          dispatch(setState, {type: GET_LOG_LIST});
        }
      }).catch(err => {
        console.log(err,'catch');
      });
    });
  }
};

export function updateSearchParams (params){
  return (dispatch, getState) => {
    let state = getState().log;
    let seachParams = Object.assign({}, state.seachParams, params);
    let setState = Object.assign({}, state, {'seachParams': seachParams, 'type': 'OLG_RESET_SEARCH_PARAMS'});
    dispatch(setState, {type: 'OLG_RESET_SEARCH_PARAMS'});
  };
};

