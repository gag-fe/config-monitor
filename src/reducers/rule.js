import {GET_RULE_LIST,
START_RULE,
END_RULE,
SEACH_PARAMS_RULE_PAGEINDEX,
SEACH_PARAMS_RULE,
ADD_VISIBLE_RULE,
EIDIT_VISIBLE_RULE,
TARGET_VISIBLE_RULE,
RECEIVER_VISIBLE_RULE,
GET_ALL_TARGETS_DATA,
UPDATE_MONITOR_TARGETS_DATA,
SYN_MONITOR_TARGETS_DATA,
ADD_USER_MAIL_MONITOR_TARGETS,
ADD_VISIBLE_MAILL_BUTTON,
GET_TYPE_LIST_MONITOR_TYPE,
ADD_RULE_MONNITOR_RULE,
UPDATE_MONITOR_TARGETS_TYPE,
UPDATA_TYPE_LIST_MONITOR_TYPE,
REST_MONITOR_RULE_DATA,
EDIT_RECEIVER_VISIBLE_RULE,
EDIT_TARGET_VISIBLE_RULE,
EIDT_MONITOR_TARGETS_ARRAY,
CURRENT_MONITOR_RULE,
EDIT_USER_MAIL_MONITOR_TARGETS,
UPDATA_EDIT_TYPE_LIST_MONITOR_TYPE,
  DELE_MONITOR_TARGE_TYPE,
  DELE_MONITOR_TARGETS} from '../actions/rule.js';

var initState = {
  loading: false,
  addVisible: false,
  editVisible: false,
  targetVisible: false,
  receiverVisible: false,
  targetVisibleEdit: false,
  receiverVisibleEdit: false,
  addVisibleAddMailButton: false, //addVisibleAddMailButton
  editor: {},
  add: {},
  rows: [],
  seachParams:{
    pageSize: 20,
    pageIndex: 1,
    total: 0,
    createBy: '',//设置账号
    endDate:'',
    startDate:'',
    monitorTargets:'',//监控对象
    receivers: '',//发送对象
    triggerType: ''//报警方式
  },
  monitorTargetsList: [],//报警对象列表
  monitorTargets: [],//add报警对象列表
  monitorTargetType: 'O',//监控对象类型
  receivers: [],//发送对象列表
  ruleLists: [], //报警类型列表
  organizations: [],// 机构
  shopGroups: [],//商户分组
  receiversList:{
    realtimeReceiverEmails:'',//实时收件人列表，逗号分隔
    realtimeReceiverMobiles:'',//实时手机号列表，逗号分隔
    receiverList:'',//定时收件人列表，逗号分隔
    sendTime:'',//报警时间
    sendTimeString: ''
  },
  selectedRowKeys: [], //报警类型默认选中
  current: 0 //当前step
};

function RuleList(state = initState, action){
  if(action.type){
    switch(action.type){
      case 'START_RULE':
        return Object.assign({}, state, action, {loading: true});
        break;
      case 'END_RULE':
        return Object.assign({}, state, action, {loading: false});
        break;
      case 'GET_RULE_LIST':
        return Object.assign({}, state, action, {loading: false});
        break;
      case 'SEACH_PARAMS_RULE_PAGEINDEX':
        return Object.assign({}, state, action);
        break;
      case 'SEACH_PARAMS_RULE':
        return Object.assign({}, state, action);
        break;
      case 'ADD_VISIBLE_RULE':
        return Object.assign({}, state, action);
        break;
      case 'EIDIT_VISIBLE_RULE':
        return Object.assign({}, state, action);
        break;
      case 'TARGET_VISIBLE_RULE':
        return Object.assign({}, state, action);
        break;
      case 'RECEIVER_VISIBLE_RULE':
        return Object.assign({}, state, action);
        break;
      case 'GET_ALL_TARGETS_DATA':
        return Object.assign({}, state, action);
        break;
      case 'UPDATE_MONITOR_TARGETS_DATA':
        return Object.assign({}, state, action);
        break;
      case 'SYN_MONITOR_TARGETS_DATA':
        return Object.assign({}, state, action);
        break;
      case 'ADD_USER_MAIL_MONITOR_TARGETS':
        return Object.assign({}, state, action);
        break;
      case 'ADD_VISIBLE_MAILL_BUTTON':
        return Object.assign({}, state, action);
        break;
      case 'GET_TYPE_LIST_MONITOR_TYPE':
        return Object.assign({}, state, action);
        break;
      case 'ADD_RULE_MONNITOR_RULE':
        return Object.assign({}, state, action);
        break;
      case 'UPDATE_MONITOR_TARGETS_TYPE':
        return Object.assign({}, state, action);
        break;
      case 'UPDATA_TYPE_LIST_MONITOR_TYPE':
        return Object.assign({}, state, action);
        break;
      case 'REST_MONITOR_RULE_DATA':
        return Object.assign({}, state, action);
        break;
      case 'EIDT_UPDATA_ROWS_DATA':
        return Object.assign({}, state, action);
        break;
      case 'EDIT_RECEIVER_VISIBLE_RULE':
        return Object.assign({}, state, action);
        break;
      case 'EDIT_TARGET_VISIBLE_RULE':
        return Object.assign({}, state, action);
        break;
      case 'EIDT_MONITOR_TARGETS_ARRAY':
        return Object.assign({}, state, action);
        break;
      case 'CURRENT_MONITOR_RULE':
        return Object.assign({}, state, action);
        break;
      case 'EDIT_USER_MAIL_MONITOR_TARGETS':
        return Object.assign({}, state, action);
        break;
      case 'UPDATA_EDIT_TYPE_LIST_MONITOR_TYPE':
        return Object.assign({}, state, action);
        break;
      case 'DELE_MONITOR_TARGE_TYPE':
        return Object.assign({}, state, action);
        break;
      case 'DELE_MONITOR_TARGETS':
        return Object.assign({}, state, action);
        break;
      default:
        return state;
    }
  }
}

export default RuleList;
