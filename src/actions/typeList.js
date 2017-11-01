export const START = 'START';
export const END = 'END';
export const GET_TYPE_LIST = 'GET_TYPE_LIST';
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

function fetchGetTypeList(state) {
  return {
    type: GET_TYPE_LIST,
    ...state
  }
}

//获取报警类型
export function getTypeList () {
  return (dispatch, getState) => {
    let state = getState().typeList;
    dispatch(fetchStart(state, {type: START, loading: true}));
    dispatch(function(){
      Ajax({
        url: API.typeList,
        data: {action: 'typeList'},
        type: 'json',
        method: 'post'
      }).then(resp => {
        if (resp.status == 'S') {
          let setState = Object.assign({}, state, resp.data);
          dispatch(fetchGetTypeList(setState, {type: GET_TYPE_LIST}));
          dispatch(fetchEnd(setState, {type: END}));
        }
      }).catch(err => {
        console.log(err,'catch');
      });
    });
  }
};
