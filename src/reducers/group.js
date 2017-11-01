import {
  GET_GROUP_LIST, START_GROUP, END_GROUP,
  SET_GROUP_VISIBLE_TRUE, SET_GROUP_VISIBLE_FALSE,
  EDITOR_GROUP, SET_GROUP_SHOPENTITY_VISIBLE_FALSE,
  SET_GROUP_SHOPENTITY_VISIBLE_TRUE, TOP_SEACH_PARAMS,
  TOP_SEACH_PARAMS_ADD, TOP_SEACH_PARAMS_PAGEINDEX,
  TOP_SEACH_PARAMS_ADD_PAGEINDEX,
  SEACH_PARAMS,
  SEACH_PARAMS_PAGEINDEX,
  SET_GROUP_ADD_VISIBLE_FALSE,
  SET_GROUP_ADD_VISIBLE_TRUE,
  UPDATE_ORG_INFO_TOP_SEACH_PARAMS_ADD,
  UPDATE_ORG_INFO_TOP_SEACH_PARAMS,
  UPDATE_ORG_INFO_SEACH_PARAMS,
  UPDATE_ORG_INFO_ALL_SEACH_PARAMS,
  UPDATE_PARAMS_ADD,
  UPDATE_EDIT_GROUP_NAME,
  UPDATE_EDITOR_GROUP_SHOP_LIST,
  DELETE_ROWS_SHOP,
  DELET_EDIT_GROUP_SHOP_LIST,
EDIT_UPDATE_SHOP_ENTITY_ID_LIST} from '../actions/group.js';

var initState = {
  loading: false,
  visible: false,
  visibleAddGroup: false,
  visibleShopEntity: false,
  actionEditButtonState: false,
  actionAddButtonState: false,
  rows: [],
  rowsShop: [],
  editor: {
    groupShopsList: [],
    shopEntityIdList: [],
    shopEntityIdListLock: []
  },
  add: {
    groupName:'',
    shopEntityIdList: [],
    shopId: '',
    shopName: ''
  },
  topSeachParams: {
    rowsShopObj: {},//缓存所有的商户数据
    shopEntityName: '',
    shopId: '',
    enabled: false,
    storey: '',
    format: '',
    pageSize: 20,
    pageIndex: 1,
    total: 0,
  },
  topSeachParamsAdd: {
    shopEntityName: '',
    shopId: '',
    enabled: false,
    storey: '',
    format: '',
    pageSize: 20,
    pageIndex: 1,
    total: 0,
  },
  seachParams: {
    shopEntityName: '',
    shopId: '',
    groupName: '',
    updateAtFrom: '',
    updateAtTo: '',
    updateBy: '',
    pageSize: 20,
    pageIndex: 1,
    total: 0,
  },
  rowsShopObj: {}//缓存所有的商户数据
};

function GroupList(state = initState, action) {
  if (action.type) {
    switch (action.type) {
      case 'START_GROUP':
        return Object.assign({}, state, action);
        break;
      case 'END_GROUP':
        return Object.assign({}, state, action);
        break;
      case 'GET_GROUP_LIST':
        return Object.assign({}, state, action);
        break;
      case 'SET_GROUP_VISIBLE_TRUE':
        return Object.assign({}, state, action, {loading: false, visible: true});
        break;
      case 'SET_GROUP_VISIBLE_FALSE':
        return Object.assign({}, state, action, {loading: false, visible: false});
        break;
      case 'SET_GROUP_SHOPENTITY_VISIBLE_FALSE':
        return Object.assign({}, state, action, {loading: false, visibleShopEntity: false});
        break;
      case 'SET_GROUP_SHOPENTITY_VISIBLE_TRUE':
        return Object.assign({}, state, action, {loading: false, visibleShopEntity: true});
        break;
      case 'EDITOR_GROUP': //更新
        return Object.assign({}, state, action, {loading: false, visible: false});
        break;
      case 'SEACH_PARAMS_PAGEINDEX': //更新 检索翻页
        return Object.assign({}, state, action);
        break;
      case 'SEACH_PARAMS': //更新 检索参数
        return Object.assign({}, state, action);
        break;
      case 'TOP_SEACH_PARAMS_PAGEINDEX': //更新 编辑检索翻页
        return Object.assign({}, state, action);
        break;
      case 'TOP_SEACH_PARAMS': //更新 编辑检索参数
        return Object.assign({}, state, action);
        break;
      case 'TOP_SEACH_PARAMS_ADD_PAGEINDEX': //更新 添加检索翻页
        return Object.assign({}, state, action);
        break;
      case 'TOP_SEACH_PARAMS_ADD': //更新 添加检索参数
        return Object.assign({}, state, action);
        break;
      case 'SET_GROUP_ADD_VISIBLE_FALSE':
        return Object.assign({}, state, action);
        break;
      case 'SET_GROUP_ADD_VISIBLE_TRUE':
        return Object.assign({}, state, action);
        break;
      case 'UPDATE_ORG_INFO_TOP_SEACH_PARAMS_ADD':
        return Object.assign({}, state, action);
        break;
      case 'UPDATE_ORG_INFO_TOP_SEACH_PARAMS':
        return Object.assign({}, state, action);
        break;
      case 'UPDATE_ORG_INFO_SEACH_PARAMS':
        return Object.assign({}, state, action);
        break;
      case 'UPDATE_ORG_INFO_ALL_SEACH_PARAMS':
        return Object.assign({}, state, action);
        break;
      case 'UPDATE_PARAMS_ADD':
        return Object.assign({}, state, action);
        break;
      case 'UPDATE_EDIT_GROUP_NAME':
        return Object.assign({}, state, action);
        break;
      case 'UPDATE_EDITOR_GROUP_SHOP_LIST':
        return Object.assign({}, state, action);
        break;
      case 'DELETE_ROWS_SHOP':
        return Object.assign({}, state, action);
        break;
      case 'DELET_EDIT_GROUP_SHOP_LIST': //设置 eidtor RuleIds
        return Object.assign({}, state, action);
        break;
        case 'EDIT_UPDATE_SHOP_ENTITY_ID_LIST': //设置 eidtor RuleIds
          return Object.assign({}, state, action);
          break;
      default:
        return state;
    }
  }
}

export default GroupList;
