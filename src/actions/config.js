export const START_CONFIG = 'START_CONFIG';
export const END_CONFIG = 'END_CONFIG';
export const GET_CONFIG_LIST = 'GET_CONFIG_LIST';
export const SET_CONFIG_VISIBLE_TRUE= 'SET_CONFIG_VISIBLE_TRUE';
export const SET_CONFIG_VISIBLE_FALSE= 'SET_CONFIG_VISIBLE_FALSE';
export const SET_RULE_CONFIG_VISIBLE_TRUE = 'SET_RULE_CONFIG_VISIBLE_TRUE';
export const SET_RULE_CONFIG_VISIBLE_FALSE = 'SET_RULE_CONFIG_VISIBLE_FALSE';
export const GET_RULE_CONFIG_PARAMS = 'GET_RULE_CONFIG_PARAMS';
export const EDITOR_CONFIG = 'EDITOR_CONFIG';
export const SEACH_PARAMS_CONFIG_PAGEINDEX = 'SEACH_PARAMS_CONFIG_PAGEINDEX';
export const SEACH_PARAMS_CONFIG = 'SEACH_PARAMS_CONFIG';
export const SHOP_ENTITY_ID_CONFIG = 'SHOP_ENTITY_ID_CONFIG';
export const SET_CONFIG_DEFAULT_RULE_PARAMS = 'SET_CONFIG_DEFAULT_RULE_PARAMS';
export const SET_CONFIG_DEF_VISIBLE_TRUE = 'SET_CONFIG_DEF_VISIBLE_TRUE';
export const SET_CONFIG_DEF_VISIBLE_FALSE = 'SET_CONFIG_DEF_VISIBLE_FALSE';
export const SET_CONFIG_MONITORING = 'SET_CONFIG_MONITORING';
export const SET_CONFIG_MONITORING_DEF = 'SET_CONFIG_MONITORING_DEF';
export const SET_CONFIG_RULEIDS_DEF = 'SET_CONFIG_RULEIDS_DEF';
export const SET_CONFIG_VISIBLE_PARAM = 'SET_CONFIG_VISIBLE_PARAM';
export const SET_CONFIG_DEFAULT_VISIBLE_PARAM = 'SET_CONFIG_DEFAULT_VISIBLE_PARAM';
export const UPDATE_DEFAULT_RULE_PARAMS_EDIT = 'UPDATE_DEFAULT_RULE_PARAMS_EDIT';
export const UPDATE_RULE_PARAMS_EDIT = 'UPDATE_RULE_PARAMS_EDIT';
export const SET_DEFAULT_RULE_PARAMS = 'SET_DEFAULT_RULE_PARAMS';
export const UPDATE_DEFAULT_RULE_PARAMS_EDIT_CHANGE = 'UPDATE_DEFAULT_RULE_PARAMS_EDIT_CHANGE';
export const SET_BATCH_CONFIG_MONITORING = 'SET_BATCH_CONFIG_MONITORING';
export const SET_BATCH_CONFIG_MONITORING_BUTTON = 'SET_BATCH_CONFIG_MONITORING_BUTTON';


import Utils from '../utils/index';
const CommonUtils = Utils.common;
import Moment from 'moment';
const format = 'YYYY-MM-DD';
const Ajax = Utils.ajax;

const API = {
  typeList: APP_CONFIG.api.URLFIX_DATA +'/monitor/typeList.json',
  ruleList: APP_CONFIG.api.URLFIX_DATA +'/monitor/ruleList.json',
  recordList: APP_CONFIG.api.URLFIX_DATA +'/monitor/recordList.json',
  typeMap: APP_CONFIG.api.URLFIX_DATA +'/monitor/typeMap.json',
  delRuleId: APP_CONFIG.api.URLFIX_DATA +'/monitor/deleteRule.json',
  updataRule: APP_CONFIG.api.URLFIX_DATA +'/monitor/updateRule.json',
  getRule: APP_CONFIG.api.URLFIX_DATA +'/monitor/getRule.json',
  getShopRuleList: APP_CONFIG.api.URLFIX_DATA +'/monitor/shopRuleList.json',
  setShopRule: APP_CONFIG.api.URLFIX_DATA +'/monitor/setShopRule.json',
  defaultRuleList: APP_CONFIG.api.URLFIX_DATA +'/monitor/defaultRuleList.json',
  setShopAuditSettings: APP_CONFIG.api.URLFIX_DATA + '/monitor/setShopAuditSettings.json',
};

function fetchStart(state) {
  return {
    type: START_CONFIG,
    ...state
  }
}

function fetchEnd(state) {
  return {
    type: END_CONFIG,
    ...state
  }
}

function fetchGetConfigList(state) {
  return {
    type: GET_CONFIG_LIST,
    ...state
  }
}

// 报警设置弹窗
export function setConfigVisibleTrue() {
  return (dispatch, getState) => {
    let state = getState().config;
    let setState = Object.assign({}, state, {type: SET_CONFIG_VISIBLE_TRUE, visible: true});
    dispatch(setState,{type: SET_CONFIG_VISIBLE_TRUE, visible: true})
  }
};

export function setConfigVisibleFalse(stateParam) {
  return (dispatch, getState) => {
    let state = getState().config;
    let setState = Object.assign({}, state, {type: SET_CONFIG_VISIBLE_FALSE, visible: false});
    dispatch(setState, {type: SET_CONFIG_VISIBLE_FALSE, visible: false});
  }
};

// "规则设置"弹窗显示
export function setRuleConfigVisibleTrue() {
  return (dispatch, getState) => {
    let state = getState().config;
    let setState = Object.assign({}, state, { type: SET_RULE_CONFIG_VISIBLE_TRUE, ruleConfigVisible: true });
    dispatch(setState, { type: SET_RULE_CONFIG_VISIBLE_TRUE, ruleConfigVisible: true });
  }
};

// "规则设置"弹窗隐藏
export function setRuleConfigVisibleFalse() {
  return (dispatch, getState) => {
    let state = getState().config;
    let setState = Object.assign({}, state, { type: SET_RULE_CONFIG_VISIBLE_FALSE, ruleConfigVisible: false });
    dispatch(setState, { type: SET_RULE_CONFIG_VISIBLE_FALSE, ruleConfigVisible: false });
  }
};

// 获取"规则设置"弹窗中的内容
export function getRuleConfigParams(data) {
  if (!data || data.serialContinuity == null) {
    return false;
  }
  let serialContinuity = data.serialContinuity;
  var postData = Object.assign({}, data, { serialContinuity: serialContinuity });

  return (dispatch, getState) => {
    let state = getState().config;
    let setState = Object.assign({}, state, { ruleConfig: postData, type: GET_RULE_CONFIG_PARAMS });
    dispatch(setState, { type: GET_RULE_CONFIG_PARAMS });
  };
};

// 修改"规则设置"弹窗中的内容
export function setRuleConfigParams(stateParam) {
  return (dispatch, getState) => {
    let state = getState().config;
    let postData = Object.assign({}, { serialContinuity: stateParam, shopEntityId: state.ruleConfig.shopEntityId });

    let date = {
      updateAtFrom: state.seachParams.updateAtFrom ? Moment(state.seachParams.updateAtFrom).format(format) : '',
      updateAtTo: state.seachParams.updateAtTo ? Moment(state.seachParams.updateAtTo).format(format) : ''
    };
    let postDatalist = Object.assign({}, state.seachParams, date);

    dispatch(function(){
      Ajax({
        url: API.setShopAuditSettings,
        data: Object.assign({}, postData),
        type: 'json',
        method: 'post'
      }).then(resp => {
        if (resp.status == 'S') {
          dispatch(function(){
            Ajax({
              url: API.getShopRuleList,
              data: Object.assign({}, postDatalist),
              type: 'json',
              method: 'post'
            }).then(resp => {
              if (resp.status == 'S') {
                if(!resp.data || resp.data.rows.length == 0){
                  return false;
                }

                resp.data.rows.map((item,index) => {
                  resp.data.rows[index]['key'] = item.shopEntityId;
                  if(resp.data.rows[index]['ruleParams']){
                    resp.data.rows[index]['ruleParams'].map((item2,idx) => {
                      resp.data.rows[index]['ruleParams'][idx]['key'] = item2.ruleId;
                    });
                  }
                });

                let seachParams = Object.assign({}, state.seachParams, {pageSize:resp.data.pageSize, pageIndex:resp.data.pageIndex, total:resp.data.total, pageCount:resp.data.pageCount});
                let setState = Object.assign({}, state, {'rows':resp.data.rows, 'seachParams': seachParams, 'shopEntityId': [], 'ruleIds': [], visible:false, batchButtonDisabled: false, type: GET_CONFIG_LIST});

                dispatch(setState, {type: GET_CONFIG_LIST});
              }
            }).catch(err => {
              console.log(err,'catch');
            });
          });
        }
      }).catch(err => {
        console.log(err,'catch');
      });
    });
  }
};

//设置 ruleparams 的参数
export function setConfigVisibleParams(stateParam) {
  return (dispatch, getState) => {
    let state = getState().config;
    let setState = Object.assign({}, state, {type: SET_CONFIG_VISIBLE_PARAM, visibleParams: stateParam});
    dispatch(setState, {type: SET_CONFIG_VISIBLE_PARAM, visibleParams: stateParam});
  };
};
export function setConfigDefaultVisibleParams(stateParam) {
  return (dispatch, getState) => {
    let state = getState().config;
    let setState = Object.assign({}, state, {type: SET_CONFIG_DEFAULT_VISIBLE_PARAM, defaultVisibleParams: stateParam});
    dispatch(setState, {type: SET_CONFIG_DEFAULT_VISIBLE_PARAM, defaultVisibleParams: stateParam});
  };
};
//更新 SeachParams
export function setConfigSeachParams (params) {
  return (dispatch, getState) => {
    let state = getState().config;
    let seachParams = Object.assign({}, state.seachParams, params);
    let setState = Object.assign({}, state, {seachParams: seachParams, type:'SEACH_PARAMS_CONFIG'});
    dispatch(setState, {'type': SEACH_PARAMS_CONFIG});
  };
};

export function setConfigSeachParamsPageIndex(pageIndex){
  return (dispatch, getState) => {
    let state = getState().config;
    let seachParams = Object.assign({}, state.seachParams, {pageIndex: pageIndex});
    let setState = Object.assign({}, state, {seachParams: seachParams, type: SEACH_PARAMS_CONFIG_PAGEINDEX});
    dispatch(setState, {'type': SEACH_PARAMS_CONFIG_PAGEINDEX});
  };
};

//修改报警设置当前项
export function editConfigParams (data){
  if(!data || !data.ruleParams ||  data.ruleParams.length == 0){
    return false;
  }

  let ruleIds = [];
  let newRuleParams = [];
  data.ruleParams.map((item, idx) => {

    if(item.param){
      newRuleParams.push(Object.assign({}, item, {key: item.ruleId, param:JSON.parse(item.param)}));
    }else{
      newRuleParams.push(Object.assign({}, item, {key: item.ruleId, param:item.param}));
    }

      if(item.selected){
        ruleIds.push(item.ruleId);
      }
  });

  var postData = Object.assign({}, data,{'ruleIds': ruleIds, 'ruleParams': newRuleParams});

  return (dispatch, getState) => {
    let state = getState().config;
    let setState = Object.assign({}, state, {'editor': postData, 'shopEntityId': [], 'type': 'EDITOR_CONFIG'});
    console.log(setState,'setState');
    dispatch(setState, {'type': 'EDITOR_CONFIG'});
  };
};

//获取报警记录
export function getConfigList () {

  //format:'',
  //ruleStatus:'all',
  //shopId: '',
  //shopName: '',
  //format:'',
  //updateAtTo: '',
  //updateAtFrom: '',
  //updateBy:'',
  //storey:'',
  //shopEntitiyName: ''

  return (dispatch, getState) => {
    let state = getState().config;
    let date = {
      updateAtFrom: state.seachParams.updateAtFrom ? Moment(state.seachParams.updateAtFrom).format(format) : '',
      updateAtTo: state.seachParams.updateAtTo ? Moment(state.seachParams.updateAtTo).format(format) : ''
    };
    let postData = Object.assign({}, state.seachParams, date);

    dispatch(function(){
      Ajax({
        url: API.getShopRuleList,
        data: Object.assign({}, postData),
        type: 'json',
        method: 'post'
      }).then(resp => {
        if (resp.status == 'S') {

          if(!resp.data || resp.data.rows.length == 0){
            resp.data.rows = [];
          }else {
            resp.data.rows.map((item,index) => {
              resp.data.rows[index]['key'] = item.shopEntityId;
              if(resp.data.rows[index]['ruleParams']){
                resp.data.rows[index]['ruleParams'].map((item2,idx) => {
                  resp.data.rows[index]['ruleParams'][idx]['key'] = item2.ruleId;
                });
              }
            });
          }


          let seachParams = Object.assign({}, state.seachParams, {pageSize:resp.data.pageSize, pageIndex:resp.data.pageIndex, total:resp.data.total, pageCount:resp.data.pageCount});
          let setState = Object.assign({}, state, {'rows':resp.data.rows, 'seachParams': seachParams, visible: false, 'shopEntityId': [], 'ruleIds': [], batchButtonDisabled: false, 'type': GET_CONFIG_LIST});

          dispatch(setState, {type: GET_CONFIG_LIST});
        }
      }).catch(err => {
        console.log(err,'catch');
      });
    });
  }
};

//编辑发送报警设置
export function setConfigList () {
    return (dispatch, getState) => {
      let state = getState().config;
      let postData = {
        ruleParams: JSON.stringify(state.editor.ruleParams),
        shopEntityId: state.editor.shopEntityId
      };

      let date = {
        updateAtFrom: state.seachParams.updateAtFrom ? Moment(state.seachParams.updateAtFrom).format(format) : '',
        updateAtTo: state.seachParams.updateAtTo ? Moment(state.seachParams.updateAtTo).format(format) : ''
      };

      let postDatalist = Object.assign({}, state.seachParams, date);

      Ajax({
        url: API.setShopRule,
        data: postData,
        type: 'json',
        method: 'post'
      }).then(resp => {
        if (resp.status == 'S') {

          dispatch(function(){

                Ajax({
                  url: API.getShopRuleList,
                  data: Object.assign({}, postDatalist),
                  type: 'json',
                  method: 'post'
                }).then(resp => {
                  if (resp.status == 'S') {

                    if(!resp.data || resp.data.rows.length == 0){
                      return false;
                    }

                    resp.data.rows.map((item,index) => {
                      resp.data.rows[index]['key'] = item.shopEntityId;
                      if(resp.data.rows[index]['ruleParams']){
                        resp.data.rows[index]['ruleParams'].map((item2,idx) => {
                          resp.data.rows[index]['ruleParams'][idx]['key'] = item2.ruleId;
                        });
                      }
                    });

                    let seachParams = Object.assign({}, state.seachParams, {pageSize:resp.data.pageSize, pageIndex:resp.data.pageIndex, total:resp.data.total, pageCount:resp.data.pageCount});
                    let setState = Object.assign({}, state, {'rows':resp.data.rows, 'seachParams': seachParams, 'shopEntityId': [], 'ruleIds': [], visible:false, batchButtonDisabled: false, type: GET_CONFIG_LIST});

                    dispatch(setState, {type: GET_CONFIG_LIST});
                  }
                }).catch(err => {
                  console.log(err,'catch');
                });
          });
        }
      }).catch(err => {
        console.log(err,'catch');
      });
    }
};

//批量设置 ShopEntityId
export function setShopEntityId (params) {
  if(!params){
    return false;
  }
  return (dispatch, getState) => {
    let state = getState().config;
    let setState = Object.assign({}, state, {'shopEntityId': params, 'type': SHOP_ENTITY_ID_CONFIG});
    dispatch(setState, {'type': SHOP_ENTITY_ID_CONFIG})
  };
};

//获取报警类型
export function getDefaultTypeList () {
  return (dispatch, getState) => {
    let stateConfig = getState().config;
    dispatch(function(){
      Ajax({
        url: API.defaultRuleList,
        data: {action: 'defaultRuleList'},
        type: 'json',
        method: 'post'
      }).then(resp => {

        if (resp.status == 'S') {
          //debugger
          if(!resp.data.ruleParams || resp.data.ruleParams.length == 0){
            return false;
          }

          resp.data.ruleParams.map((item,idx) => {
            resp.data.ruleParams[idx] = Object.assign({}, item, {key: item.ruleId, param: JSON.parse(item.param)})
          });

          let setStateConfig = Object.assign({}, stateConfig, {defaultRuleParams: resp.data.ruleParams, 'type': 'SET_CONFIG_DEFAULT_RULE_PARAMS'});
          dispatch(setStateConfig, {'type': 'SET_CONFIG_DEFAULT_RULE_PARAMS'});
        }
      }).catch(err => {
        console.log(err,'catch');
      });
    });
  }
};

//更新批量设置 商户监测 monitoring
export function setConfigDafMonitoring (state) {
  return (dispatch, getState) => {
    let stateConfig = getState().config;
    let setState = Object.assign({}, stateConfig, {'defaultMonitoring': state, type: SET_CONFIG_MONITORING_DEF});
    dispatch(setState, {type: SET_CONFIG_MONITORING_DEF});
  };
};

//更新批量设置 商户监测 defaultRuleIds
export function setConfigDafRuleIds (params) {
  return (dispatch, getState) => {
    let stateConfig = getState().config;
    let setState = Object.assign({}, stateConfig, {'defaultRuleIds': params.toString(), type: SET_CONFIG_RULEIDS_DEF});
    dispatch(setState, {type: SET_CONFIG_RULEIDS_DEF});
  };
};

//更新列表 商户监测 monitoring
export function setConfigMonitoring (stateParams) {
  return (dispatch, getState) => {
    let stateConfig = getState().config;
    let editorData = Object.assign({}, stateConfig.editor, {'monitoring': stateParams});
    let setState = Object.assign({}, stateConfig, {editor: editorData, type: SET_CONFIG_MONITORING});
    dispatch(setState, {type: SET_CONFIG_MONITORING});
  };
};

//更新批量设置 商户监测 editor RuleIds
export function setConfigRuleIds (params) {
  if(!params || !(params instanceof Array)){
    return false;
  }
  return (dispatch, getState) => {
    let state = getState().config;
    let ruleParams = state.editor.ruleParams || [];
    let ruleParamsObj = {};
    let newRuleParams = [];

    ruleParams.map(item => {
      params.map(list => {
        if(list == item.ruleId){
          ruleParamsObj[item.ruleId] = item;
        }
      });
    });

    ruleParams.map(item => {
      if(ruleParamsObj[item.ruleId]){
        newRuleParams.push(Object.assign({}, item, {selected: true}));
      }else {
        newRuleParams.push(Object.assign({}, item, {selected: false}));
      }
    });

    let newEditorData = Object.assign({}, state.editor, {'ruleIds': params, ruleParams: newRuleParams});
    let setState = Object.assign({}, state, {editor: newEditorData, type: SET_CONFIG_MONITORING});
    dispatch(setState, {type: SET_CONFIG_MONITORING});
  };
};

//ruleParamsEdit:{},
//defaultRuleParamsEdit:{},
export function updateRuleParamsEdit (data) {
  return (dispatch, getState) => {
    let state = getState().config;
    let setState = Object.assign({}, state, {'ruleParamsEdit': data, type: UPDATE_RULE_PARAMS_EDIT});
    dispatch(setState, {type: UPDATE_RULE_PARAMS_EDIT});
  };
};


export function updateRuleParamsEditChenge (data) {
  return (dispatch, getState) => {
    let state = getState().config;
    let index = state.ruleParamsEdit.ruleId;
    let ruleParams = state.editor.ruleParams;
    let ruleParamsEditNew = {};
    let newRuleParams = [];

    ruleParams.map((item, idx) => {
      if( index &&  item.ruleId == index){
        ruleParamsEditNew = Object.assign({}, state.ruleParamsEdit, {param: data});
        newRuleParams.push(Object.assign({}, state.ruleParamsEdit, {param: data}));
      }else {
        newRuleParams.push(Object.assign({}, item));
      }
    });

    let editData = Object.assign({}, state.editor, {ruleParams: newRuleParams});
    let setState = Object.assign({}, state, {'ruleParamsEdit': ruleParamsEditNew, editor: editData, type: UPDATE_RULE_PARAMS_EDIT});
    dispatch(setState, {type: UPDATE_RULE_PARAMS_EDIT});
  };
};

/* ==================== defaultRuleParams ===============*/
// 设置 批量设置弹层
export function setConfigDefaultVisibleTrue() {
  return (dispatch, getState) => {
    let state = getState().config;
    let setState = Object.assign({}, state, {type: SET_CONFIG_DEF_VISIBLE_TRUE, defaultVisible: true});
    dispatch(setState,{type: SET_CONFIG_DEF_VISIBLE_TRUE, defaultVisible: true})
  }
}

export function setConfigDefaultVisibleFalse() {
  return (dispatch, getState) => {
    let state = getState().config;
    let setState = Object.assign({}, state, {type: SET_CONFIG_DEF_VISIBLE_FALSE, defaultVisible: false});
    dispatch(setState,{type: SET_CONFIG_DEF_VISIBLE_FALSE, defaultVisible: false});
  };
}
//批量设置规则参数修改弹层
export function setDefaultRuleParams(stateParam) {
  return (dispatch, getState) => {
    let state = getState().config;
    let setState = Object.assign({}, state, {defaultVisibleParams: stateParam, type: SET_DEFAULT_RULE_PARAMS});
    dispatch(setState, {type: SET_DEFAULT_RULE_PARAMS});
  };
};

//编辑单个规则更新到主体规则列表
export function updateDefaultRuleParamsEdit (data) {
  return (dispatch, getState) => {
    let state = getState().config;
    let defaultRuleParams = [];
    let defaultRuleParamsIndex =  data.ruleId;
    if(state.defaultRuleParams && state.defaultRuleParams.length > 0){
      state.defaultRuleParams.map((item, idx) => {
        if(defaultRuleParamsIndex == item.ruleId == defaultRuleParamsIndex){
          defaultRuleParams.push(data);
        }else {
          defaultRuleParams.push(item);
        }
      });
    }

    let setState = Object.assign({}, state, {'defaultRuleParams': defaultRuleParams, ruleParamsEdit: data, defaultRuleParamsIndex:defaultRuleParamsIndex, type: UPDATE_DEFAULT_RULE_PARAMS_EDIT});
    dispatch(setState, {type: UPDATE_DEFAULT_RULE_PARAMS_EDIT});
  };
};


//DefaultRuleParamsEditChenge
export function updateDefaultRuleParamsEditChenge (data) {
  return (dispatch, getState) => {
    let state = getState().config;
    let defaultRuleParamsIndex = state.defaultRuleParamsIndex;
    let defaultRuleParams = state.defaultRuleParams;
    let newDefaultRuleParams = [];
    defaultRuleParams.map((item, idx) => {
      if(defaultRuleParamsIndex &&  item.ruleId == defaultRuleParamsIndex){
        newDefaultRuleParams.push(Object.assign({}, state.ruleParamsEdit, {param: data}));
      }else{
        newDefaultRuleParams.push(item);
      }
    });

    let ruleParamsEdit = Object.assign({}, state.ruleParamsEdit, {param: data});
    let setState = Object.assign({}, state, {'defaultRuleParams': newDefaultRuleParams, type: UPDATE_DEFAULT_RULE_PARAMS_EDIT_CHANGE});
    dispatch(setState, {type: UPDATE_DEFAULT_RULE_PARAMS_EDIT_CHANGE});
  };
};


//批量发送报警设置
export function setBatchConfigList () {
  return (dispatch, getState) => {
    let state = getState().config;
    let postData = {
      ruleParams: JSON.stringify(state.defaultRuleParams),
      shopEntityId: state.shopEntityId.toString()
    };
    let date = {
      updateAtFrom: state.seachParams.updateAtFrom ? Moment(state.seachParams.updateAtFrom).format(format) : '',
      updateAtTo: state.seachParams.updateAtTo ? Moment(state.seachParams.updateAtTo).format(format) : ''
    };
    let postDatalist = Object.assign({}, state.seachParams, date);

    Ajax({
      url: API.setShopRule,
      data: postData,
      type: 'json',
      method: 'post'
    }).then(resp => {
      if (resp.status == 'S') {
        dispatch(function(){
          Ajax({
            url: API.ruleList,
            data: postData,
            type: 'json',
            method: 'post'
          }).then(resp => {
            if (resp.status == 'S') {
              Ajax({
                url: API.getShopRuleList,
                data: Object.assign({}, postDatalist),
                type: 'json',
                method: 'post'
              }).then(resp => {
                if (resp.status == 'S') {

                  if(!resp.data || resp.data.rows.length == 0){
                    return false;
                  }

                  resp.data.rows.map((item,index) => {
                    resp.data.rows[index]['key'] = item.shopEntityId;
                    if(resp.data.rows[index]['ruleParams']){
                      resp.data.rows[index]['ruleParams'].map((item2,idx) => {
                        resp.data.rows[index]['ruleParams'][idx]['key'] = item2.ruleId;
                      });
                    }
                  });

                  let seachParams = Object.assign({}, state.seachParams, {pageSize:resp.data.pageSize, pageIndex:resp.data.pageIndex, total:resp.data.total, pageCount:resp.data.pageCount});
                  let setState = Object.assign({}, state, {'rows':resp.data.rows, 'seachParams': seachParams, visibleParams: false, defaultVisible: false, type: GET_CONFIG_LIST});

                  dispatch(setState, {type: GET_CONFIG_LIST});
                }
              }).catch(err => {
                console.log(err,'catch');
              });

            }
          }).catch(err => {
            console.log(err,'catch');
          });
        });
      }
    }).catch(err => {
      console.log(err,'catch');
    });
  }
};

//更新批量设置 商户监测 RuleIds
export function setBatchConfigRuleIds (params) {
  return (dispatch, getState) => {
    //debugger;
    let state = getState().config;
    let defaultRuleParams = state.defaultRuleParams;
    let tempNewDefaultRuleParams = {};
    let newDefaultRuleParams = [];
    let defaultRuleParamsObj = {};
    let arrRuleIds = [];

    defaultRuleParams.map((item) => {
        defaultRuleParamsObj[item.ruleId] = item;
        arrRuleIds.push(item.ruleId);
    });

    if(params && params.length != 0){
      params.map((item, idx) => {
        if(defaultRuleParamsObj[item]){
          tempNewDefaultRuleParams[item] = Object.assign({}, defaultRuleParamsObj[item]);
        }
      });

      if(arrRuleIds && arrRuleIds.length != 0){
        arrRuleIds.map((item, idx) => {
          let temp = {};
          if(tempNewDefaultRuleParams[item]){
            temp = Object.assign({}, defaultRuleParamsObj[item], {'selected': true});
          }else{
            temp = Object.assign({}, defaultRuleParamsObj[item], {'selected': false});
          }
          newDefaultRuleParams.push(temp);
        });
      }

    }else{
      newDefaultRuleParams = defaultRuleParams;
    }



    let setState = Object.assign({}, state, {ruleIds: params, defaultRuleParams: newDefaultRuleParams, type: SET_BATCH_CONFIG_MONITORING});

    dispatch(setState, {type: SET_BATCH_CONFIG_MONITORING});
  };
};

//设置批量按钮是否可用
export function setBatchButtonDisabled () {
  return (dispatch, getState) => {
    let state = getState().config;
    let batchButtonDisabled = false;
    if(state.shopEntityId.length > 0){
      batchButtonDisabled = true;
    }else {
      batchButtonDisabled = false;
    }
    let setState = Object.assign({}, state, {batchButtonDisabled: batchButtonDisabled, type: SET_BATCH_CONFIG_MONITORING_BUTTON});
    dispatch(setState, {type: SET_BATCH_CONFIG_MONITORING_BUTTON});
  };
};
