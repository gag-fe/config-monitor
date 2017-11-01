export const START_RULE = 'START_RULE';
export const END_RULE = 'END_RULE';
export const GET_RULE_LIST = 'GET_RULE_LIST';
export const SEACH_PARAMS_RULE_PAGEINDEX = 'SEACH_PARAMS_RULE_PAGEINDEX';
export const SEACH_PARAMS_RULE = 'SEACH_PARAMS_RULE';
export const ADD_VISIBLE_RULE = 'ADD_VISIBLE_RULE';
export const EIDIT_VISIBLE_RULE = 'EIDIT_VISIBLE_RULE';
export const TARGET_VISIBLE_RULE = 'TARGET_VISIBLE_RULE';
export const RECEIVER_VISIBLE_RULE = 'RECEIVER_VISIBLE_RULE';
export const GET_ALL_TARGETS_DATA = 'GET_ALL_TARGETS_DATA';
export const UPDATE_MONITOR_TARGETS_DATA = 'UPDATE_MONITOR_TARGETS_DATA';
export const SYN_MONITOR_TARGETS_DATA = 'SYN_MONITOR_TARGETS_DATA';
export const ADD_USER_MAIL_MONITOR_TARGETS = 'ADD_USER_MAIL_MONITOR_TARGETS';
export const ADD_VISIBLE_MAILL_BUTTON = 'ADD_VISIBLE_MAILL_BUTTON';
export const GET_TYPE_LIST_MONITOR_TYPE = 'GET_TYPE_LIST_MONITOR_TYPE';
export const ADD_RULE_MONNITOR_RULE = 'ADD_RULE_MONNITOR_RULE';
export const UPDATE_MONITOR_TARGETS_TYPE = 'UPDATE_MONITOR_TARGETS_TYPE';
export const UPDATA_TYPE_LIST_MONITOR_TYPE = 'UPDATA_TYPE_LIST_MONITOR_TYPE';
export const REST_MONITOR_RULE_DATA = 'REST_MONITOR_RULE_DATA';
export const EIDT_UPDATA_ROWS_DATA = 'EIDT_UPDATA_ROWS_DATA';
export const EDIT_RECEIVER_VISIBLE_RULE = 'EDIT_RECEIVER_VISIBLE_RULE';
export const EDIT_TARGET_VISIBLE_RULE = 'EDIT_TARGET_VISIBLE_RULE';
export const EIDT_MONITOR_TARGETS_ARRAY = 'EIDT_MONITOR_TARGETS_ARRAY';
export const CURRENT_MONITOR_RULE = 'CURRENT_MONITOR_RULE';
export const EDIT_USER_MAIL_MONITOR_TARGETS = 'EDIT_USER_MAIL_MONITOR_TARGETS';
export const UPDATA_EDIT_TYPE_LIST_MONITOR_TYPE = 'UPDATA_EDIT_TYPE_LIST_MONITOR_TYPE';
export const DELE_MONITOR_TARGE_TYPE = 'DELE_MONITOR_TARGE_TYPE';
export const DELE_MONITOR_TARGETS = 'DELE_MONITOR_TARGE_TYPE';


import Utils from '../utils/index';
import Moment from 'moment';
const format = 'YYYY-MM-DD';
const Ajax = Utils.ajax;
const CommonUtils = Utils.common;
const API = {
  typeList: APP_CONFIG.api.URLFIX_DATA +'/monitor/typeList.json',
  //更新报警策略
  updateRule: APP_CONFIG.api.URLFIX_DATA +'/monitor/updateRule.json',
  //新增报警策略获取
  getRule: APP_CONFIG.api.URLFIX_DATA +'/monitor/getRule.json',
  //新增报警策略暂存(下一步)
  editRule:  APP_CONFIG.api.URLFIX_DATA +'/monitor/editRule.json',
  //新增报警策略提交
  addRule:  APP_CONFIG.api.URLFIX_DATA +'/monitor/addRule.json',
  //报警策略列表
  getRule:  APP_CONFIG.api.URLFIX_DATA +'/monitor/ruleList.json',
  //机构分组
  getOrganization:  APP_CONFIG.api.URLFIX_DATA +'/monitor/getOrganization.json',
  getAllTargets:  APP_CONFIG.api.URLFIX_DATA +'/monitor/getAllTargets.json',
  //商户分组
  getAllShopEntityGroup:  APP_CONFIG.api.URLFIX_DATA +'/monitor/getAllShopEntityGroup.json',
  //删除报警策略
  deleteRule:  APP_CONFIG.api.URLFIX_DATA +'/monitor/deleteRule.json',
};



function fetchStart(state) {
  return {
    type: START_RULE,
    ...state
  }
}

function fetchEnd(state) {
  return {
    type: END_RULE,
    ...state
  }
}

function fetchGetRuleList(state) {
  return {
    type: GET_RULE_LIST,
    ...state
  }
}

//更新 SeachParams
export function setRuleSeachParams (params) {
  return (dispatch, getState) => {
    let state = getState().rule;
    let seachParams = Object.assign({}, state.seachParams, params);
    let setState = Object.assign({}, state, {seachParams: seachParams, type:SEACH_PARAMS_RULE});
    dispatch(setState, {'type': SEACH_PARAMS_RULE});
  };
};
//更新pageIndex
export function setRuleSeachParamsPageIndex(pageIndex){
  return (dispatch, getState) => {
    let state = getState().rule;
    let seachParams = Object.assign({}, state.seachParams, {pageIndex: pageIndex});
    let setState = Object.assign({}, state, {seachParams: seachParams, type: SEACH_PARAMS_RULE_PAGEINDEX});
    dispatch(setState, {'type': SEACH_PARAMS_RULE_PAGEINDEX});
  };
}

//更新浮层展示
export function setAddVisible(stateParams){
  return (dispatch, getState) => {
    let state = getState().rule;
    let setState = Object.assign({}, state, {addVisible: stateParams, type: ADD_VISIBLE_RULE});
    dispatch(setState, {'type': ADD_VISIBLE_RULE});
  };
}

export function setEditVisible(stateParams){
  return (dispatch, getState) => {
    let state = getState().rule;
    let setState = Object.assign({}, state, {editVisible: stateParams, type: EIDIT_VISIBLE_RULE});
    dispatch(setState, {'type': EIDIT_VISIBLE_RULE});
  };
}

export function setAadTargetVisible(stateParams){
  return (dispatch, getState) => {
    let state = getState().rule;
    let setState = Object.assign({}, state, {targetVisible: stateParams, type: TARGET_VISIBLE_RULE});
    dispatch(setState, {'type': TARGET_VISIBLE_RULE});
  };
}

export function receiverVisibleState(stateParams){
  return (dispatch, getState) => {
    let state = getState().rule;
    let setState = Object.assign({}, state, {receiverVisible: stateParams, type: RECEIVER_VISIBLE_RULE});
    dispatch(setState, {'type': RECEIVER_VISIBLE_RULE});
  };
}

//获取报警类型
export function getRuleList () {

  return (dispatch, getState) => {

    let state = getState().rule;
    let date = {
        startDate: state.seachParams.startDate ? Moment(state.seachParams.startDate).format(format) : '',
        endDate: state.seachParams.endDate ? Moment(state.seachParams.endDate).format(format) : ''
    };
    let postData = Object.assign({}, state.seachParams, date);
    //dispatch(fetchStart(state, {type: START_RULE, loading: true}));
    dispatch(function(){
      Ajax({
        url: API.getRule,
        data: Object.assign({}, postData, {action: 'typeList'}),
        type: 'json',
        method: 'post'
      }).then(resp => {
        if (resp.status == 'S') {
          let  seachParams = Object.assign({}, state.seachParams, {pageSize: resp.data.pageSize, pageIndex:resp.data.pageIndex, total:resp.data.total, pageCount:resp.data.pageCount});
          let setState = Object.assign({}, state, {'rows': resp.data.rows, 'seachParams': seachParams, type: GET_RULE_LIST});
          //dispatch(fetchGetRuleList(setState, {type: GET_RULE_LIST}));
          //dispatch(fetchEnd(setState, {type: END_RULE}));
          dispatch(setState, {type: GET_RULE_LIST});
        }
      }).catch(err => {
        console.log(err,'catch');
      });
    });
  }
};

//获取 机构和商户分组数据
export function getAllTargetsData(){
  return (dispatch, getState) => {
    let state = getState().rule;
    dispatch(function(){
      Ajax({
        url: API.getAllTargets,
        data: {action: 'getAllTargets'},
        type: 'json',
        method: 'post'
      }).then(resp => {
        if (resp.status == 'S') {
          let setState = Object.assign({}, state, {'organizations': resp.data.organizations, 'shopGroups': resp.data.shopGroups, type: GET_ALL_TARGETS_DATA});
          dispatch(setState, {type: GET_ALL_TARGETS_DATA});
        }
      }).catch(err => {
        console.log(err,'catch');
      });
    });
  }
};


//删除报警策略
export function deleteMonitorRule(id){
  return (dispatch, getState) => {
    let state = getState().rule;
    let date = {
      startDate: state.seachParams.startDate ? Moment(state.seachParams.startDate).format(format) : '',
      endDate: state.seachParams.endDate ? Moment(state.seachParams.endDate).format(format) : ''
    };

    let postData = Object.assign({}, state.seachParams, date);
    dispatch(function(){
      Ajax({
        url: API.deleteRule,
        data: {action: 'delete', id:id },
        type: 'json',
        method: 'post'
      }).then(resp => {
        if (resp.status == 'S') {

          //dispatch(fetchStart(state, {type: START_RULE, loading: true}));
          dispatch(function(){
            Ajax({
              url: API.getRule,
              data: Object.assign({}, postData, {action: 'typeList'}),
              type: 'json',
              method: 'post'
            }).then(resp => {
              if (resp.status == 'S') {
                let  seachParams = Object.assign({}, state.seachParams, {pageSize: resp.data.pageSize, pageIndex:resp.data.pageIndex, total:resp.data.total, pageCount:resp.data.pageCount});
                let setState = Object.assign({}, state, {'rows': resp.data.rows, 'seachParams': seachParams, type: GET_RULE_LIST});
                //dispatch(fetchGetRuleList(setState, {type: GET_RULE_LIST}));
                //dispatch(fetchEnd(setState, {type: END_RULE}));
                dispatch(setState, {type: GET_RULE_LIST});
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

//更新 添加 monitorTargets
export function updateMonitorTargets(obj, type){
  return (dispatch, getState) => {
    let state = getState().rule;
    let newMonitorTargets = [];
    if(type == 'add'){
      //monitorTargets = Object.create(state.monitorTargets);

      if(state.monitorTargets && state.monitorTargets.length > 0){
        state.monitorTargets.map( item => {
          newMonitorTargets.push(item);
        });
      }
      newMonitorTargets.push(obj);
    }else if (type == 'reset') {
      newMonitorTargets = [];
    }else{
      newMonitorTargets.push(obj);
    }

    let setState = Object.assign({}, state, {'monitorTargets': newMonitorTargets, type: UPDATE_MONITOR_TARGETS_DATA});
    dispatch(setState, {type: UPDATE_MONITOR_TARGETS_DATA});
  }
};

//添加 删除monitorTargets
export function deleMonitorTargets(data){
  return (dispatch, getState) => {
    let state = getState().rule;
    let monitorTargets = state.monitorTargets;
    let newMonitorTargets = [];

    if(!monitorTargets || monitorTargets.length == 0 || !data){
      return false;
    }

    monitorTargets.map((item) => {
      if(item.id != data.id){
        newMonitorTargets.push(item);
      }
    });


    let setState = Object.assign({}, state, {'monitorTargets': newMonitorTargets, 'type': DELE_MONITOR_TARGETS});
    dispatch(setState, {type: DELE_MONITOR_TARGETS});
  };
};


export function updateMonitorTargetsType(str){
  return (dispatch, getState) => {
    let state = getState().rule;
    let setState = Object.assign({}, state, {monitorTargetType: str, type: UPDATE_MONITOR_TARGETS_TYPE});
    dispatch(setState, {type: UPDATE_MONITOR_TARGETS_TYPE});
  }
};

//更新同步 monitorTargetsList
export function synMonitorTargets(obj, type){
  return (dispatch, getState) => {
    let state = getState().rule;
    let monitorTargets = state.monitorTargets;
    let setState = Object.assign({}, state, {monitorTargetsList: monitorTargets, type: SYN_MONITOR_TARGETS_DATA});
    dispatch(setState, {type: SYN_MONITOR_TARGETS_DATA});
  }
};

// 添加发送邮件 addUserMail
export function addUserMailMonitorTargets(obj, type){
  return (dispatch, getState) => {
    let state = getState().rule;
    let receiversList = state.receiversList;

    //receiversList:{
      //realtimeReceiverEmails:'',//实时收件人列表，逗号分隔
      //realtimeReceiverMobiles:'',//实时手机号列表，逗号分隔
      //receiverList:'',//定时收件人列表，逗号分隔
      //sendTime:'',//报警时间
      //sendTimeString: ''
    //}

    let setState = Object.assign({}, state, {receiversList: obj, type: ADD_USER_MAIL_MONITOR_TARGETS});
    dispatch(setState, {type: ADD_USER_MAIL_MONITOR_TARGETS});
  }
};



// 编辑发送邮件 editUserMail
export function editUserMailMonitorTargets(obj, type){
  return (dispatch, getState) => {
    let state = getState().rule;
    let editorParams = Object.assign({}, state.editor, obj);

    let setState = Object.assign({}, state, {editor: editorParams, type: EDIT_USER_MAIL_MONITOR_TARGETS});
    dispatch(setState, {type: EDIT_USER_MAIL_MONITOR_TARGETS});
  };
};

// 添加发送邮件 addUserMail 按钮状态
export function addUserMailButtonState(stateParams){
  return (dispatch, getState) => {
    let state = getState().rule;
    let setState = Object.assign({}, state, {addVisibleAddMailButton: stateParams, type: ADD_VISIBLE_MAILL_BUTTON});
    dispatch(setState, {'type': ADD_VISIBLE_MAILL_BUTTON, addVisibleAddMailButton: stateParams});
  };
};

//获取报警类型
export function getTypeListMonitorType () {
  return (dispatch, getState) => {
    let state = getState().rule;

    dispatch(function(){
      Ajax({
        url: API.typeList,
        data: {action: 'typeList'},
        type: 'json',
        method: 'post'
      }).then(resp => {
        if (resp.status == 'S') {
          let postData = [];
          resp.data.rows.map(item => {
            let temp = Object.assign({},item);
            temp['key'] = temp.id;
            postData.push(temp);
          });
          let setState = Object.assign({}, state, {ruleLists: postData, type: GET_TYPE_LIST_MONITOR_TYPE});
          dispatch(setState, {type: GET_TYPE_LIST_MONITOR_TYPE});
        }
      }).catch(err => {
        console.log(err,'catch');
      });
    });
  }
};

//更新选中的报警类型
export function updataTypeListMonitorType (arr) {
  return (dispatch, getState) => {
    let state = getState().rule;
    let setState = Object.assign({}, state, {selectedRowKeys: arr, type: UPDATA_TYPE_LIST_MONITOR_TYPE});
    dispatch(setState, {type: UPDATA_TYPE_LIST_MONITOR_TYPE});
  }
};

//更新编辑选中的报警类型
export function updataEditTypeListMonitorType (arr) {
  return (dispatch, getState) => {
    let state = getState().rule;
    let editParam = Object.assign({}, state.editor, {ruleList: arr});
    let setState = Object.assign({}, state, {editor: editParam, type: UPDATA_EDIT_TYPE_LIST_MONITOR_TYPE});
    dispatch(setState, {type: UPDATA_EDIT_TYPE_LIST_MONITOR_TYPE});
  }
};

//新增报警策略提交
export function monitorTypeAddRule () {
  return (dispatch, getState) => {
    let state = getState().rule;
    let monitorTargetObj = state.monitorTargets;
    let selectedRowKeys = state.selectedRowKeys;
    let monitorTargetIds = [];
    let stateParams = false;

    monitorTargetObj.map(item => {
      monitorTargetIds.push(item.id);
    });

    let postData = {
        monitorTargetIds: monitorTargetIds.join(','),
        monitorTargetType: state.monitorTargetType,
        realtimeReceiverEmails: state.receiversList.realtimeReceiverEmails,
        realtimeReceiverMobiles: state.receiversList.realtimeReceiverMobiles,
        receiverList: state.receiversList.receiverList,
        ruleList: selectedRowKeys.join(','),
        sendTime: state.receiversList.sendTimeString
    };

    let resetDate = {
      receiversList:{
        realtimeReceiverEmails:'',//实时收件人列表，逗号分隔
        realtimeReceiverMobiles:'',//实时手机号列表，逗号分隔
        receiverList:'',//定时收件人列表，逗号分隔
        sendTime:'',//报警时间
        sendTimeString: ''
      },
      selectedRowKeys: [],
      monitorTargetType: 'O',
      monitorTargets: [],
      monitorTargetsList: [],
      current: 0
    };

    dispatch(function(){
      Ajax({
        url: API.addRule,
        data: Object.assign({}, postData, {action: 'addRule'}),
        type: 'json',
        method: 'post'
      }).then(resp => {

        if (resp.status == 'S') {
          let setState = Object.assign({}, state, {addVisible: false, type: ADD_VISIBLE_RULE});
          dispatch(setState, {'type': ADD_VISIBLE_RULE, addVisible: false});


          let date = {
            startDate: state.seachParams.startDate ? Moment(state.seachParams.startDate).format(format) : '',
            endDate: state.seachParams.endDate ? Moment(state.seachParams.endDate).format(format) : ''
          };
          let postDataList = Object.assign({}, state.seachParams, date);

          Ajax({
            url: API.getRule,
            data: Object.assign({}, postDataList, {action: 'typeList'}),
            type: 'json',
            method: 'post'
          }).then(resp => {
            if (resp.status == 'S') {
              let  seachParams = Object.assign({}, state.seachParams, {pageSize: resp.data.pageSize, pageIndex:resp.data.pageIndex, total:resp.data.total, pageCount:resp.data.pageCount});
              let setState = Object.assign({}, state, resetDate, {'rows': resp.data.rows, 'seachParams': seachParams, monitorTarget:[], addVisible: false, type: GET_RULE_LIST});
              dispatch(setState, {type: GET_RULE_LIST});
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
};

//重置数据
export function resetMonitorRuleData () {
  return (dispatch, getState) => {
    let state = getState().rule;
    let resetDate = {
        receiversList:{
          realtimeReceiverEmails:'',//实时收件人列表，逗号分隔
          realtimeReceiverMobiles:'',//实时手机号列表，逗号分隔
          receiverList:'',//定时收件人列表，逗号分隔
          sendTime:'',//报警时间
          sendTimeString: ''
        },
        selectedRowKeys: [],
        monitorTargetType: 'O',
        monitorTargets: [],
        monitorTargetsList: []
    };
    let setState = Object.assign({}, state, resetDate, {type: REST_MONITOR_RULE_DATA});
    dispatch(setState, {type: REST_MONITOR_RULE_DATA});
  }
};

//修改当前的Step
export function currentMonitorRule (num){
  return (dispatch, getState) => {
    let state = getState().rule;
    let setState = Object.assign({}, state, {current: num, type: CURRENT_MONITOR_RULE});
    dispatch(setState, {type: CURRENT_MONITOR_RULE});
  };
};

/*  =================================== 编辑 ========================================================== */
//更新当前编辑的报警策略
export function updataEditRowsData (editData) {
  return (dispatch, getState) => {
    let state = getState().rule;
    let setState = Object.assign({}, state, {editor: editData, type: EIDT_UPDATA_ROWS_DATA});
    dispatch(setState, {type: EIDT_UPDATA_ROWS_DATA});
  };
};

//receiverVisibleEidtState
export function receiverVisibleEidtState(stateParams){
  return (dispatch, getState) => {
    let state = getState().rule;
    let setState = Object.assign({}, state, {receiverVisibleEdit: stateParams, type: EDIT_RECEIVER_VISIBLE_RULE});
    dispatch(setState, {receiverVisibleEdit: stateParams, 'type': EDIT_RECEIVER_VISIBLE_RULE});
  };
}
//setAadTargetVisibleEdit
export function setAadTargetVisibleEdit(stateParams){
  return (dispatch, getState) => {
    let state = getState().rule;
    let setState = Object.assign({}, state, {targetVisibleEdit: stateParams, type: EDIT_TARGET_VISIBLE_RULE});
    dispatch(setState, {'type': EDIT_TARGET_VISIBLE_RULE});
  };
}

//更新 添加 monitorTargets
export function editMonitorTargetArray(obj){
  return (dispatch, getState) => {
    let state = getState().rule;
    let monitorTargetArray = [];
    let monitorTargetIds = [];
    let monitorTargets = [];
    if(state.editor.monitorTargetArray && state.editor.monitorTargetArray.length > 0){
      state.editor.monitorTargetArray.map(item => {
        monitorTargetArray.push(item);
        monitorTargetIds.push(item.id);
        monitorTargets.push(item.name);
      });
    }

    if(obj.id && obj.id != ''){
        monitorTargetArray.push(obj);
        monitorTargetIds.push(obj.id);
        monitorTargets.push(obj.name);
    }

    let tempEdit = Object.assign({}, state.editor, {monitorTargetArray: monitorTargetArray, monitorTargetIds: monitorTargetIds, monitorTargets: monitorTargets});
    let setState = Object.assign({}, state, {editor: tempEdit, type: EIDT_MONITOR_TARGETS_ARRAY});
    dispatch(setState, {type: EIDT_MONITOR_TARGETS_ARRAY});
  };
};

// 编辑 更新报警策略
export function updateRuleMonitorRuleData (){
  return (dispatch, getState) => {
    let state = getState().rule;
    let editorData = state.editor;
    let stateParams = false;
    if(editorData.ruleList.length == 0){
      //window.alert('请配置报警类型！');
      CommonUtils.modal('warning', '警告', '请配置报警类型！');
      return false;
    }

    /*

    if(editorData.receiverList.length == 0 && editorData.realtimeReceiverEmails.length == 0 && editorData.realtimeReceiverMobiles.length == 0){
      window.alert('请配报警发送信息！');
      return false;
    }
    */

    if(editorData.receiverList.length != 0 && editorData.sendTime == ''){
      //window.alert('请配置报警发送时间！');
      CommonUtils.modal('warning', '警告', '请配置报警发送时间！');
      return false;
    }



    let postData = {
      id: editorData.id,
      monitorTargetIds: editorData.monitorTargetIds ? editorData.monitorTargetIds.join(',') : '',
      monitorTargetType: editorData.monitorTargetType || '',
      monitorTargets: editorData.monitorTargets ? editorData.monitorTargets.join(',') : '',
      realtimeReceiverEmails: editorData.realtimeReceiverEmails ? editorData.realtimeReceiverEmails.join(',') : '',
      realtimeReceiverMobiles: editorData.realtimeReceiverMobiles ? editorData.realtimeReceiverMobiles.join(','): '',
      receiverList: editorData.receiverList ? editorData.receiverList.join(','):'',
      ruleList: editorData.ruleList ? editorData.ruleList.join(','): '',
      sendTime: editorData.sendTimeString
    };

    dispatch(function(){
      Ajax({
        url: API.updateRule,
        data: Object.assign({}, postData, {action: 'updateRule'}),
        type: 'json',
        method: 'post'
      }).then(resp => {
        if (resp.status == 'S') {
          let setState = Object.assign({}, state, {editVisible: false, type: EIDIT_VISIBLE_RULE});
          dispatch(setState, {'type': EIDIT_VISIBLE_RULE, editVisible: false});

          let date = {
            startDate: state.seachParams.startDate ? Moment(state.seachParams.startDate).format(format) : '',
            endDate: state.seachParams.endDate ? Moment(state.seachParams.endDate).format(format) : ''
          };
          let postDataList = Object.assign({}, state.seachParams, date);

          Ajax({
            url: API.getRule,
            data: Object.assign({}, postDataList, {action: 'typeList'}),
            type: 'json',
            method: 'post'
          }).then(resp => {
            if (resp.status == 'S') {
              let  seachParams = Object.assign({}, state.seachParams, {pageSize: resp.data.pageSize, pageIndex:resp.data.pageIndex, total:resp.data.total, pageCount:resp.data.pageCount});
              let setState = Object.assign({}, state, {'rows': resp.data.rows, 'seachParams': seachParams, editVisible: false, current:0, type: GET_RULE_LIST});
              dispatch(setState, {type: GET_RULE_LIST});
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
};

//删除编辑发送对象
export function deleMonitorTargetType(data) {
  return (dispatch, getState) => {
    let state = getState().rule;
    let monitorTargetArray = state.editor.monitorTargetArray;
    let newMonitorTargetArray = [];
    let monitorTargetIds = [];
    let monitorTargets = [];
    if(!data || !data.name || !monitorTargetArray || monitorTargetArray.length == 0){
      return false;
    }

    monitorTargetArray.map((item) => {
      if(item.name != data.name){
        newMonitorTargetArray.push(item);
        monitorTargets.push(item.name);
        monitorTargetIds.push(item.id);
      }
    });

    let editData = Object.assign({}, state.editor, {'monitorTargetArray': newMonitorTargetArray, 'monitorTargets': monitorTargets, 'monitorTargetIds': monitorTargetIds});
    let setState = Object.assign({}, state, {'editor': editData, 'type': DELE_MONITOR_TARGE_TYPE});

    dispatch(setState, {'type': DELE_MONITOR_TARGE_TYPE});
   };
};
