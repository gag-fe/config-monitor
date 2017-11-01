import { START_CONFIG, END_CONFIG,
SET_CONFIG_VISIBLE_TRUE,
SET_CONFIG_VISIBLE_FALSE,
SET_RULE_CONFIG_VISIBLE_TRUE,
SET_RULE_CONFIG_VISIBLE_FALSE,
GET_RULE_CONFIG_PARAMS,
EDITOR_CONFIG, SEACH_PARAMS_CONFIG_PAGEINDEX,
SEACH_PARAMS_CONFIG, SET_CONFIG_DEFAULT_RULE_PARAMS,
SET_CONFIG_DEF_VISIBLE_TRUE, SET_CONFIG_DEF_VISIBLE_FALSE,
SET_CONFIG_MONITORING, SET_CONFIG_MONITORING_DEF,
SET_CONFIG_RULEIDS_DEF,
SET_CONFIG_RULEIDS,
UPDATE_RULE_PARAMS_EDIT,
SET_DEFAULT_RULE_PARAMS,
UPDATE_DEFAULT_RULE_PARAMS_EDIT,
  UPDATE_DEFAULT_RULE_PARAMS_EDIT_CHANGE,
  SET_BATCH_CONFIG_MONITORING_BUTTON} from '../actions/config.js';


import Utils from '../utils/index';
const Common = Utils.common;
var initState = {
  loading: false,
  visible: false,
  visibleParams: false,
  batchButtonDisabled: false,//批量按钮是否可用
  defaultVisible: false,
  defaultVisibleParams: false,
  defaultRuleParamsIndex: 0,
  rows: [],
  ruleParamsEdit:{},
  defaultRuleParamsEdit:{},
  editor: {
    ruleParams: []
  },

  editorAll:{
      ruleParams: []
  },
  seachParams: {
    pageSize: 20,
    pageIndex: 1,
    total: 0,
    format: '',
    ruleStatus: 'all',
    shopEntityName: '',
    shopId:'',
    shopName: '',
    storey: '',
    updateAtFrom: '',
    updateAtTo:'',
    updateBy: ''
  },
  shopEntityId: [],//批量设置监控的商户ID
  ruleIds: [],//批量设置监控的商户ID
  defaultRuleIds: [],
  defaultRuleParams: [],
  defaultMonitoring: false,
  ruleConfigVisible: false, // "规则设置"弹窗是否可见
  ruleConfig: {// "规则设置"
    serialContinuity: false, // 商户流水号是否稽核
  },
};

function ConfigList(state = initState, action){
  if(!state || Common.isEmptyObject(state) || state == ''){
    state = initState;
  }
  if(action.type){
    switch(action.type){
      case 'START_CONFIG':
        return Object.assign({}, state, action, {loading: true});
        break;
      case 'END_CONFIG':
        return Object.assign({}, state, action, {loading: false});
        break;
      case 'GET_CONFIG_LIST':
        return Object.assign({}, state, action, {loading: false, visible: false, visibleParams: false, defaultVisible: false, defaultVisibleParams: false, ruleConfigVisible: false });
        break;
      case 'SET_CONFIG_VISIBLE_TRUE':
        return Object.assign({}, state, action, {loading: false, visible: true});
        break;
      case 'SET_CONFIG_VISIBLE_FALSE':
        return Object.assign({}, state, action, {loading: false, visible: false});
        break;
      case 'SET_RULE_CONFIG_VISIBLE_TRUE': // 设置"规则设置"弹出层显示
        return Object.assign({}, state, action, { loading: false, ruleConfigVisible: true });
        break;
      case 'SET_RULE_CONFIG_VISIBLE_FALSE': // 设置"规则设置"弹出层隐藏
        return Object.assign({}, state, action, { loading: false, ruleConfigVisible: false });
        break;
      case 'GET_RULE_CONFIG_PARAMS': // 获取"规则设置"弹窗中的内容
        return Object.assign({}, state, action);
        break;
      case 'EDITOR_CONFIG': //更新
        return Object.assign({}, state, action, {loading: false, visible: false});
        break;
      case 'SEACH_PARAMS_CONFIG_PAGEINDEX'://更新 pageindex
        return Object.assign({}, state, action);
        break;
      case 'SEACH_PARAMS_CONFIG'://更新 SeachParams
        return Object.assign({}, state, action);
        break;
      case 'SHOP_ENTITY_ID_CONFIG'://更新 ShopEntityId
        return Object.assign({}, state, action);
        break;
      case 'SET_CONFIG_DEFAULT_RULE_PARAMS': //更新 批量规则设置列表
        return Object.assign({}, state, action, {loading: false, defaultVisible: true});
        break;
      case 'SET_CONFIG_DEF_VISIBLE_TRUE': //设置批量设置弹层
        return Object.assign({}, state, action, {loading: false, defaultVisible: true});
        break;
      case 'SET_CONFIG_DEF_VISIBLE_FALSE': //设置批量设置弹层
        return Object.assign({}, state, action, {loading: false, defaultVisible: false});
        break;
      case 'SET_CONFIG_MONITORING': //设置 monitoring
        return Object.assign({}, state, action);
        break;
      case 'SET_CONFIG_MONITORING_DEF': //设置 monitoring
        return Object.assign({}, state, action);
        break;
      case 'SET_CONFIG_RULEIDS_DEF': //设置 defaultRuleIds
        return Object.assign({}, state, action);
        break;
      case 'SET_CONFIG_RULEIDS': //设置 eidtor RuleIds
        return Object.assign({}, state, action);
        break;
      case 'SET_CONFIG_VISIBLE_PARAM': //设置 eidtor RuleIds
        return Object.assign({}, state, action);
        break;
      case 'SET_CONFIG_DEFAULT_VISIBLE_PARAM': //设置 eidtor RuleIds
        return Object.assign({}, state, action);
        break;
      case 'UPDATE_DEFAULT_RULE_PARAMS_EDIT': //设置 eidtor RuleIds
        return Object.assign({}, state, action);
        break;
      case 'UPDATE_RULE_PARAMS_EDIT': //设置 eidtor RuleIds
        return Object.assign({}, state, action);
        break;
      case 'SET_DEFAULT_RULE_PARAMS': //设置 eidtor RuleIds
        return Object.assign({}, state, action);
        break;
      case 'UPDATE_DEFAULT_RULE_PARAMS_EDIT_CHANGE': //设置 eidtor RuleIds
        return Object.assign({}, state, action);
        break;
      case 'SET_BATCH_CONFIG_MONITORING': //设置 eidtor RuleIds
        return Object.assign({}, state, action);
        break;
      case 'SET_BATCH_CONFIG_MONITORING_BUTTON': //设置 eidtor RuleIds
        return Object.assign({}, state, action);
        break;
      default:
        return state;
    }
  }
}

export default ConfigList;
